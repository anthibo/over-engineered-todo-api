import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoDto {
  @Field({ description: 'Task' })
  title: string;

  @Field({ description: 'The user id that is assigned to the task' })
  userId: string;
}
