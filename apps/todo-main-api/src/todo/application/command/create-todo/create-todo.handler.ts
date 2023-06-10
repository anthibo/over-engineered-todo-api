import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoFactory } from '../../../domain/todo.factory';
import { CreateTodoCommand } from './create-todo.command';
import { TodoStatus } from '../../../domain/Todo';
import { TodoRepository } from '../../../domain/todo-repository.interface';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-tokens';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private readonly todoFactory: TodoFactory,
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute({ createTodoRequest }: CreateTodoCommand): Promise<void> {
    const todo = this.todoFactory.create({
      status: TodoStatus.IN_PROGRESS,
      ...createTodoRequest,
    });
    await this.todoRepository.save(todo);
    todo.commit();
  }
}
