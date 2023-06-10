import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TodoDto {
  @Field(() => Int, { description: 'Todo id' })
  id: number;

  @Field({ description: 'Todo title' })
  title: string;

  //TODO: add user object type;
  @Field(() => Int, { description: 'The user id that is assigned to the task' })
  user: number;

  @Field({ description: 'The task creation date' })
  createdAt: Date;

  @Field({ description: 'The task creation date' })
  updatedAt: Date;
}
