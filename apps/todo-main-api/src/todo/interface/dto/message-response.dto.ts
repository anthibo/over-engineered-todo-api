import { Field, ObjectType } from '@nestjs/graphql';

// TODO: Move to common/libs
@ObjectType()
export class MessageResponseDto {
  @Field()
  message: string;
}
