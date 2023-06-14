import { TodoStatus } from '../../domain/Todo';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';

registerEnumType(TodoStatus, {
  name: 'TodoStatus',
});

@InputType()
export class UpdateTodoStatusDto {
  @Field()
  todoId: string;

  @Field(() => TodoStatus)
  status: TodoStatus;
}
