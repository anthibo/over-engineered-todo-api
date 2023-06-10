import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { Todo, TodoImplement, TodoProperties, TodoStatus } from './Todo';

type CreateTodoOptions = Readonly<{
  title: string;
  userId: number;
  status: TodoStatus;
}>;

export class TodoFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateTodoOptions): Todo {
    return this.eventPublisher.mergeObjectContext(
      new TodoImplement({
        ...options,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        status: TodoStatus.IN_PROGRESS,
      }),
    );
  }

  reconstitute(properties: TodoProperties): Todo {
    return this.eventPublisher.mergeObjectContext(
      new TodoImplement(properties),
    );
  }
}