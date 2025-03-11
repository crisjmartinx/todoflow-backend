import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { plainToInstance } from 'class-transformer';
import { TagResponseDto } from './dto/tag-response.dto';

@Injectable()
export class TagsService {
  private readonly logger = new Logger('NotesService');

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createTagDto: CreateTagDto) {
    try {
      const tag = this.tagRepository.create(createTagDto);
      await this.tagRepository.save(tag);
      return tag;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const tags = await this.tagRepository.find();

    const tagResponse = tags.map((tag) => ({
      ...tag,
      items: tag.items.map((item: string, index: number) => ({
        id: index,
        name: item,
      })),
    }));

    return plainToInstance(TagResponseDto, tagResponse);
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllTags() {
    const query = this.tagRepository.createQueryBuilder('tags');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
