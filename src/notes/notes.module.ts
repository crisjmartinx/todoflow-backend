import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Note} from './entities';
import { Tag } from 'src/tags/entities/tag.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [TypeOrmModule.forFeature([Note, Tag, User]), AuthModule],
  exports: [NotesService, TypeOrmModule],
})
export class NotesModule {}
