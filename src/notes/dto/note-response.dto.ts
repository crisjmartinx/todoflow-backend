import {
  Exclude,
  Expose,
  Transform,
  Type,
  plainToInstance,
} from 'class-transformer';
import { TagItem } from 'src/tags/dto/tag-response.dto';

function formatDateToUTC3(date: Date): string {
  if (!date) return '';
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - 3);
  return newDate.toISOString();
}

@Exclude()
export class TagResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  color: string;

  @Exclude()
  items: TagItem[];
}

@Exclude()
export class NoteResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  @Transform(({ value }) => formatDateToUTC3(value), { toPlainOnly: true })
  createdAt: string;

  @Expose()
  @Transform(({ value }) => formatDateToUTC3(value), { toPlainOnly: true })
  updatedAt: string;

  @Expose()
  isPinned: boolean;

  @Expose()
  isArchived: boolean;

  @Expose()
  color: string;

  @Expose()
  @Type(() => TagResponseDto)
  tag?: TagResponseDto;

  @Expose()
  tagItem?: string;

  static fromEntity(note: any): NoteResponseDto {
    return plainToInstance(NoteResponseDto, note);
  }
}
