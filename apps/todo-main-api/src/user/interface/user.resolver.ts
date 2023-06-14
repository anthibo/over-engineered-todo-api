import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SeedUsersCommand } from '../application/command/seed-users/seed-users.command';
import { SeedUsersDto } from './dto/seed-users.dto';
import { FindUsersQuery } from '../application/query/find-users/find-users.query';
import { UserDto } from './dto/user.dto';
import { FindUsersResult } from '../application/query/find-users/find-users.result';
import { MessageResponseDto } from '@app/common';

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

  @Query(() => [UserDto], { name: 'users' })
  async findUsers(): Promise<UserDto[]> {
    const query = new FindUsersQuery();
    const { users } = await this.queryBus.execute<
      FindUsersQuery,
      FindUsersResult
    >(query);
    return users as unknown as UserDto[];
  }
}
