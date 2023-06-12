import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../../injection-tokens';
import { UserRepository } from '../../../domain/user.repository.interface';
import { FindUserQuery } from './find-user.query';
import { FindUserResult } from './find-user.result';
import { ErrorMessage } from '../../../domain/error-messages';

@QueryHandler(FindUserQuery)
export class FindUserHandler
  implements IQueryHandler<FindUserQuery, FindUserResult>
{
  private readonly logger = new Logger(FindUserHandler.name);
  @Inject(InjectionToken.USER_REPOSITORY)
  readonly userRepository: UserRepository;

  async execute({ userId }: FindUserQuery): Promise<FindUserResult> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_IS_NOT_FOUND);
    }
    this.logger.debug(
      `result for userId: ${userId} -> ${JSON.stringify(user)}`,
    );
    return { user };
  }
}
