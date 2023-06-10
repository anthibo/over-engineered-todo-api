import { IEvent } from '@nestjs/cqrs';

export class TodoCreatedEvent implements IEvent {
  constructor(
    readonly todoId: string,
    readonly userId: string,
    readonly createdAt: Date,
  ) {}
}
