import { Injectable } from '@nestjs/common';

import { initialData } from './data/seed-data';
import { NotesService } from 'src/notes/notes.service';
import { TagsService } from '../tags/tags.service';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly noteService: NotesService,

    private readonly tagsService: TagsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    const user = await this.insertUsers();

    if (!user) {
      throw new Error('No se pudo insertar ningún usuario.');
    }

    await this.insertTags();

    await this.insertNotes(user);

    return 'SEED EXECUTED';
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    for (const user of seedUsers) {
      const existingUser = await this.userRepository.findOne({
        where: { email: user.email },
      });

      if (!existingUser) {
        users.push(this.userRepository.create(user));
      }
    }

    if (users.length > 0) {
      await this.userRepository.save(users);
    }

    return users[0] ?? null;
  }

  private async insertTags() {
    const tags = initialData.tags;

    await this.tagsService.deleteAllTags();

    const insertPromises = tags.map((tag) => this.tagsService.create(tag));
    await Promise.all(insertPromises);
  }

  private async insertNotes(user: User) {
    const notes = initialData.notes;

    await this.noteService.deleteAllNotes();

    const insertPromises = notes.map((note) =>
      this.noteService.create(note, user),
    );
    await Promise.all(insertPromises);
  }
}
