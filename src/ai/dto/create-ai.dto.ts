import { IsString } from 'class-validator';

export class CreateAiDto {
  @IsString()
  text: string;
}
