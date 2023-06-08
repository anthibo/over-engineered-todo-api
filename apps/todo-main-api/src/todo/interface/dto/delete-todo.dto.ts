import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteTodoDto {
  @Field({ description: 'Todo id that is desired to be deleted' })
  @IsNotEmpty()
  todoId: string;
}
