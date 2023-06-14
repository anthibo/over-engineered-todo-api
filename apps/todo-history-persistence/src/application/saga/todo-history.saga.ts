import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoHistoryCreatedEvent } from '../../domain/events/todo-history-created.event';

@Injectable()
export class TodoSaga {
  private readonly logger = new Logger(TodoSaga.name);
  @Saga()
  todoHistoryCreated = (
    events$: Observable<TodoHistoryCreatedEvent>,
  ): Observable<void> => {
    return events$.pipe(
      ofType(TodoHistoryCreatedEvent),
      map((event) => {
        // send data to todo-main-api using grpc method for rpc communication
        this.logger.log(`todo-history-created event: ${JSON.stringify(event)}`);
      }),
    );
  };
}
