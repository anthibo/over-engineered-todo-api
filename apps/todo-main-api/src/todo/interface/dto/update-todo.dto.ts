import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoStatus } from '../../domain/Todo';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';

registerEnumType(TodoStatus, {
  name: 'TodoStatus',
});

@InputType()
export class UpdateTodoStatus {
  @IsNotEmpty()
  @IsString()
  @Field()
  todoId: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(() => TodoStatus)
  status: TodoStatus;
}
