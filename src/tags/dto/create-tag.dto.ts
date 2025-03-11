import { IsArray, IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(9)
  color: string;

  @IsArray()
  items: string[];
}
