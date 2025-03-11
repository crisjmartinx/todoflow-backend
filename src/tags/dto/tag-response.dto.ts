import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TagItem {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

@Exclude()
export class TagResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  color: string;

  @Expose()
  items: TagItem[];
}
