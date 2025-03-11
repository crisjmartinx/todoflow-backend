import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate as isUUID } from 'uuid';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteResponseDto } from './dto/note-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Note } from './entities/note.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class NotesService {
  private readonly logger = new Logger('NotesService');

  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,

    @InjectRepository(Tag)
    private readonly noteTagRepository: Repository<Tag>,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    createNoteDto: CreateNoteDto,
    user: User,
  ): Promise<NoteResponseDto> {
    const { tag, ...noteData } = createNoteDto;

    let tagFound: Tag | null = null;
    let selectedTagItem: string | null = null;

    try {
      if (tag?.length) {
        selectedTagItem = tag[0];

        tagFound = await this.noteTagRepository
          .createQueryBuilder('tag')
          .where(':tagItem = ANY(tag.items)', { tagItem: selectedTagItem })
          .getOne();

        if (!tagFound) {
          throw new NotFoundException(
            `No se encontró un tag con el item "${selectedTagItem}".`,
          );
        }
      }

      const note = this.notesRepository.create({
        ...noteData,
        user,
        tag: tagFound || null,
        tagItem: selectedTagItem,
      });

      await this.notesRepository.save(note);
      return NoteResponseDto.fromEntity(note);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto, user: User) {
    const { limit = 10, offset = 0, order = 'DESC', search } = paginationDto;

    const where: any = {};

    if (search) {
      where.title = ILike(`%${search}%`);
    }

    const [notes, total] = await this.notesRepository.findAndCount({
      where: { user, ...where },
      take: limit,
      skip: offset,
      relations: { tag: true },
      order: { createdAt: order },
    });

    return { notes, total };
  }

  async findOne(term: string, user: User) {
    let note: Note;

    if (isUUID(term)) {
      note = await this.notesRepository.findOne({
        where: { id: term, user: { id: user.id } },
        relations: ['tag'],
      });
    } else {
      const query = this.notesRepository.createQueryBuilder('note');
      note = await query
        .where('note.title ILIKE :title', {
          title: `%${term}%`,
        })
        .andWhere('note.userId = :userId', { userId: user.id })
        .leftJoinAndSelect('note.tag', 'tag')
        .getOne();
    }

    if (!note) {
      throw new NotFoundException(`Note with term ${term} not found`);
    }

    const noteResponse = plainToInstance(NoteResponseDto, note);

    return noteResponse;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user: User) {
    const { tag, ...toUpdate } = updateNoteDto;

    // const note = await this.notesRepository.preload({ id, ...toUpdate });

    const note = await this.notesRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ['tag'],
    });

    if (!note) throw new NotFoundException(`Note with id ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let tagFound: Tag | null = null;
      let selectedTagItem: string | null = null;

      if (tag !== undefined) {
        if (tag.length) {
          selectedTagItem = tag[0];

          tagFound = await this.noteTagRepository
            .createQueryBuilder('tag')
            .where(':tagItem = ANY(tag.items)', { tagItem: selectedTagItem })
            .getOne();

          if (!tagFound) {
            throw new NotFoundException(
              `No se encontró un tag con el item "${selectedTagItem}".`,
            );
          }
        }

        note.tag = tagFound || null;
        note.tagItem = selectedTagItem;
      }

      Object.assign(note, toUpdate);
      await queryRunner.manager.save(note);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id, user);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      if (error instanceof NotFoundException) {
        throw error;
      }

      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    const note = await this.notesRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!note) throw new NotFoundException(`Note with id ${id} not found`);

    const deleteResult = await this.notesRepository.delete({ id });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllNotes() {
    const query = this.notesRepository.createQueryBuilder('note');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
