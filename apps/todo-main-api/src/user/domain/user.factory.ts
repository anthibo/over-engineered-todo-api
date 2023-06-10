import { v4 as uuid } from 'uuid';
import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { User, UserImplement, UserProperties } from './User';

type CreateUserOptions = Readonly<{
  name: string;
}>;

export class UserFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateUserOptions): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement({
        ...options,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  reconstitute(properties: UserProperties): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement(properties),
    );
  }
}
