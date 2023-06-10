import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MessageResponseDto } from '../../todo/interface/dto/message-response.dto';
import { SeedUsersCommand } from '../application/command/seed-users/seed-users.command';
import { SeedUsersDto } from './dto/seed-users.dto';

@Resolver()
export class UserResolver {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Mutation(() => MessageResponseDto)
  async seedUsers(
    @Args('seedUsersInput') { numberOfUsers }: SeedUsersDto,
  ): Promise<MessageResponseDto> {
    const command = new SeedUsersCommand(numberOfUsers);
    await this.commandBus.execute(command);
    return { message: 'seed succeeded' };
  }
}
