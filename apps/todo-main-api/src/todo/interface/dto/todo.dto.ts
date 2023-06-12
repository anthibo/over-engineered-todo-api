import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'apps/todo-main-api/src/user/interface/dto/user.dto';

@ObjectType()
export class TodoDto {
  @Field({ description: 'Todo id' })
  id: string;

  @Field({ description: 'Todo title' })
  title: string;

  @Field(() => UserDto, {
    description: 'The user that is assigned to the task',
  })
  user: UserDto;

  @Field({ description: 'The task creation date' })
  createdAt: Date;

  @Field({ description: 'The task creation date' })
  updatedAt: Date;
}
