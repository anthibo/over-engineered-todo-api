import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoHistoryGrpcClient } from '../../infrastructre/todo-history.grpc.client';
import { CreateHistoryCommand } from './create-history.command';
import { Logger } from '@nestjs/common';
import { map } from 'rxjs';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  private readonly logger = new Logger(CreateHistoryHandler.name);
  constructor(
    private readonly todoHistoryGrpcClient: TodoHistoryGrpcClient, // private publisher: EventPublisher,
  ) {}

  async execute({ description }: CreateHistoryCommand): Promise<void> {
    this.logger.debug(`Handling CreateHistoryCommand`);
    this.todoHistoryGrpcClient.createTodoHistory({ description }).pipe(
      map(({ message }) => {
        return message;
      }),
    );
  }
}
