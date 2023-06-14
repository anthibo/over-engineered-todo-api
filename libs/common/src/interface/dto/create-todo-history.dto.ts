import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoHistoryDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
