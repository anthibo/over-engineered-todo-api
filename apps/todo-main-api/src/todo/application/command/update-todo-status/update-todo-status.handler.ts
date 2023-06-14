import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoStatusCommand } from './update-todo-status.command';
import { TodoRepository } from '../../../domain/todo-repository.interface';
import { ErrorMessage } from '../../../domain/error-messages';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-tokens';

@CommandHandler(UpdateTodoStatusCommand)
export class UpdateTodoStatusHandler
  implements ICommandHandler<UpdateTodoStatusCommand>
{
  constructor(
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute({
    updateTodoStatusRequest: { status, todoId },
  }: UpdateTodoStatusCommand): Promise<void> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new NotFoundException(ErrorMessage.TASK_IS_NOT_FOUND);
    }
    todo.updateStatus(status);
    await this.todoRepository.update(todoId, status);
    todo.commit();
  }
}
