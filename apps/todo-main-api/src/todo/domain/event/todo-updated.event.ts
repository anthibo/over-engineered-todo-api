import { IEvent } from '@nestjs/cqrs';
import { TodoStatus } from '../Todo';

export class TodoStatusUpdatedEvent implements IEvent {
  constructor(
    readonly todoId: string,
    readonly status: TodoStatus,
    readonly userId: string,
    readonly updatedAt: Date,
  ) {}
}
