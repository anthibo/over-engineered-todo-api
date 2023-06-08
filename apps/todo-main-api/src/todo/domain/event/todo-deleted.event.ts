import { IEvent } from '@nestjs/cqrs';

export class TodoDeletedEvent implements IEvent {
  constructor(
    readonly todoId: string,
    readonly userId: string,
    readonly deletedAt: Date,
  ) {}
}
