import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
})
export class TagsModule {}
