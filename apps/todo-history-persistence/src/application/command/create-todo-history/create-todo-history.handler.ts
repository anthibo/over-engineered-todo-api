import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoHistoryFactory } from '../../../domain/todo-history.factory';
import { CreateTodoHistoryCommand } from './create-todo-history.command';
import { TodoHistoryRepository } from '../../../domain/todo-history.repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { InjectionToken } from '../../injection-tokens';

@CommandHandler(CreateTodoHistoryCommand)
export class CreateTodoHistoryHandler
  implements ICommandHandler<CreateTodoHistoryCommand>
{
  private readonly logger = new Logger(CreateTodoHistoryHandler.name);
  constructor(
    private readonly todoHistoryFactory: TodoHistoryFactory,
    @Inject(InjectionToken.TODO_HISTORY_REPOSITORY)
    private readonly todoRepository: TodoHistoryRepository,
  ) {}

  async execute({
    createTodoHistoryRequest: { description },
  }: CreateTodoHistoryCommand): Promise<void> {
    this.logger.debug(`handling CreateTodoHistoryCommand`);
    const todoHistory = this.todoHistoryFactory.create({
      description,
    });
    await this.todoRepository.createTodoHistory(todoHistory);
    todoHistory.commit();
  }
}
