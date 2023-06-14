import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoCreatedEvent } from '../../domain/event/todo-created.event';
import { TodoDeletedEvent } from '../../domain/event/todo-deleted.event';
import { TodoStatusUpdatedEvent } from '../../domain/event/todo-updated.event';
import { CreateHistoryCommand } from 'apps/todo-main-api/src/todo-history/application/create-history/create-history.command';

@Injectable()
export class TodoSaga {
  private readonly logger = new Logger(TodoSaga.name);
  @Saga()
  todoCreated = (
    events$: Observable<TodoCreatedEvent>,
  ): Observable<CreateHistoryCommand> => {
    return events$.pipe(
      ofType(TodoCreatedEvent),
      map((event) => {
        const description = `New Todo is created with id: ${
          event.todoId
        } for user: ${JSON.stringify(event.user)}`;
        this.logger.debug(description);
        return new CreateHistoryCommand(description);
      }),
    );
  };

  @Saga()
  todoStatusUpdated = (
    events$: Observable<TodoStatusUpdatedEvent>,
  ): Observable<CreateHistoryCommand> => {
    return events$.pipe(
      ofType(TodoStatusUpdatedEvent),
      map((event) => {
        const description = `todo id: ${event.todoId} is updated with status: ${
          event.status
        } for user: ${JSON.stringify(event.user)}`;
        this.logger.debug(description);
        return new CreateHistoryCommand(description);
      }),
    );
  };

  @Saga()
  todoDeleted = (
    events$: Observable<TodoDeletedEvent>,
  ): Observable<CreateHistoryCommand> => {
    return events$.pipe(
      ofType(TodoDeletedEvent),
      map((event) => {
        const description = `todo id: ${event.todoId} is deleted `;
        this.logger.debug(description);
        return new CreateHistoryCommand(description);
      }),
    );
  };
}
