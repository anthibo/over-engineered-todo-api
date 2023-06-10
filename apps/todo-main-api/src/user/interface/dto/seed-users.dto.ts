import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SeedUsersDto {
  @Field(() => Int)
  numberOfUsers: number;
}
