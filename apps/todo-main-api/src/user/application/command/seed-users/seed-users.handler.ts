import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-tokens';
import { UserRepository } from '../../../domain/user.repository.interface';
import { UserFactory } from '../../../domain/user.factory';
import { SeedUsersCommand } from './seed-users.command';

@CommandHandler(SeedUsersCommand)
export class SeedUsersHandler implements ICommandHandler<SeedUsersCommand> {
  constructor(
    private readonly userFactory: UserFactory,
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ numOfUsers }: SeedUsersCommand): Promise<void> {
    console.log('executing seedUsersCommand');
    for (let i = 0; i < numOfUsers; i++) {
      const user = this.userFactory.create({ name: `user-${i}` });
      await this.userRepository.createUser(user);
      user.commit();
    }
  }
}
