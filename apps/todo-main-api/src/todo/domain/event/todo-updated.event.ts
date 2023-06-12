import { IEvent } from '@nestjs/cqrs';
import { TodoStatus } from '../Todo';
import { User } from 'apps/todo-main-api/src/user/domain/User';

export class TodoStatusUpdatedEvent implements IEvent {
  constructor(
    readonly todoId: string,
    readonly status: TodoStatus,
    readonly user: User,
    readonly updatedAt: Date,
  ) {}
}
