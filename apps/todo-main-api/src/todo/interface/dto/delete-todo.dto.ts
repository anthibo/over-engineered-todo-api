import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeleteTodoDto {
  @Field(() => Int, { description: 'Todo id that is desired to be deleted' })
  todoId: number;
}
