import { TodoStatus } from '../../domain/Todo';
import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';

registerEnumType(TodoStatus, {
  name: 'TodoStatus',
});

@InputType()
export class UpdateTodoStatus {
  @Field(() => Int)
  todoId: number;

  @Field(() => TodoStatus)
  status: TodoStatus;
}
