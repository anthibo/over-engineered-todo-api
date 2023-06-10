import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoCreatedEvent } from '../../domain/event/todo-created.event';
import { TodoDeletedEvent } from '../../domain/event/todo-deleted.event';
import { TodoStatusUpdatedEvent } from '../../domain/event/todo-updated.event';

@Injectable()
export class TodoSaga {
  private readonly logger = new Logger(TodoSaga.name);
  @Saga()
  todoCreated = (events$: Observable<TodoCreatedEvent>): Observable<void> => {
    return events$.pipe(
      ofType(TodoCreatedEvent),
      map((event) => {
        return this.logger.debug(`TodoCreatedSaga for todoId: ${event.todoId}`);
      }),
    );
  };

  @Saga()
  todoStatusUpdated = (
    events$: Observable<TodoStatusUpdatedEvent>,
  ): Observable<void> => {
    return events$.pipe(
      ofType(TodoStatusUpdatedEvent),
      map((event) => {
        return this.logger.debug(
          `TodoStatusUpdatedSaga for todoId: ${event.todoId}`,
        );
      }),
    );
  };

  @Saga()
  todoDeleted = (events$: Observable<TodoDeletedEvent>): Observable<void> => {
    return events$.pipe(
      ofType(TodoDeletedEvent),
      map((event) => {
        return this.logger.debug(`TodoDeletedSage for todoId: ${event.todoId}`);
      }),
    );
  };
}
