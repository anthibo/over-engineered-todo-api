import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field({ description: 'Todo id' })
  id: string;

  @Field({ description: 'Todo title' })
  name: string;
}
