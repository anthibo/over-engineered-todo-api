import { IEvent } from '@nestjs/cqrs';
import { User } from 'apps/todo-main-api/src/user/domain/User';

export class TodoCreatedEvent implements IEvent {
  constructor(
    readonly todoId: string,
    readonly user: User,
    readonly createdAt: Date,
  ) {}
}
