import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import {
  TodoHistoryImplement,
  TodoHistory,
  TodoHistoryProperties,
} from './TodoHistory';

type CreateTodoHistoryOptions = Readonly<{
  description: string;
}>;

export class TodoHistoryFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateTodoHistoryOptions): TodoHistory {
    return this.eventPublisher.mergeObjectContext(
      new TodoHistoryImplement({
        ...options,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  reconstitute(properties: TodoHistoryProperties): TodoHistory {
    return this.eventPublisher.mergeObjectContext(
      new TodoHistoryImplement(properties),
    );
  }
}
