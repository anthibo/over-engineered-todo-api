import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponseDto {
  @Field()
  message: string;
}
