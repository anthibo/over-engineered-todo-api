import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TodoDto {
  @Field({ description: 'Todo id' })
  id: number;

  @Field({ description: 'Todo title' })
  title: string;

  //TODO: add user object type;
  @Field({ description: 'The user id that is assigned to the task' })
  user: string;

  @Field({ description: 'The task creation date' })
  createdAt: Date;

  @Field({ description: 'The task creation date' })
  updatedAt: Date;
}
