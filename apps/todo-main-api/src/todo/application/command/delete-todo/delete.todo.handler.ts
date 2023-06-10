import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoCommand } from './delete-todo.command';
import { TodoRepository } from '../../../domain/todo-repository.interface';
import { ErrorMessage } from '../../../domain/error-messages';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-tokens';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  private readonly logger = new Logger(DeleteTodoHandler.name);
  constructor(
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
  ) {}
  async execute({
    deleteTodoRequest: { todoId },
  }: DeleteTodoCommand): Promise<void> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      this.logger.debug(`todo not found for id: ${todoId}`);
      throw new NotFoundException(ErrorMessage.TASK_IS_NOT_FOUND);
    }
    this.logger.debug(`deleting todoId: ${todoId}`);
    await this.todoRepository.deleteById(todoId);
    todo.commit();
  }
}
