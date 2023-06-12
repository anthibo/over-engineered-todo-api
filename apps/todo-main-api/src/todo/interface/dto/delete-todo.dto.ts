import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteTodoDto {
  @Field({ description: 'Todo id that is desired to be deleted' })
  todoId: string;
}
