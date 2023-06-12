import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../../injection-tokens';
import { UserRepository } from '../../../domain/user.repository.interface';
import { FindUsersQuery } from './find-users.query';
import { FindUsersResult } from './find-users.result';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler
  implements IQueryHandler<FindUsersQuery, FindUsersResult>
{
  private readonly logger = new Logger(FindUsersHandler.name);
  @Inject(InjectionToken.USER_REPOSITORY)
  readonly userRepository: UserRepository;

  async execute(): Promise<FindUsersResult> {
    const users = await this.userRepository.findUsers();

    return { users };
  }
}
