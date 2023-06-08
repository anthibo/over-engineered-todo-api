import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoFactory } from '../../../domain/todo.factory';
import { CreateTodoCommand } from './create-todo.handler';
import { TodoStatus } from '../../../domain/Todo';

@CommandHandler(CreateTodoCommand)
export class CreateCamperHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private readonly todo: TodoFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createTodoRequest }: CreateTodoCommand): Promise<void> {
    const todo = this.todo.create({
      ...createTodoRequest,
      id: '',
      status: TodoStatus.IN_PROGRESS,
    });
    todo.commit();
  }
}
