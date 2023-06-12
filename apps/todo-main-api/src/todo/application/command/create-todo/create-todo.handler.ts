import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { TodoFactory } from '../../../domain/todo.factory';
import { CreateTodoCommand } from './create-todo.command';
import { TodoStatus } from '../../../domain/Todo';
import { TodoRepository } from '../../../domain/todo-repository.interface';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-tokens';
import { FindUserQuery } from 'apps/todo-main-api/src/user/application/query/find-user/find-user.query';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private readonly todoFactory: TodoFactory,
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ createTodoRequest }: CreateTodoCommand): Promise<void> {
    const findUserQuery = new FindUserQuery(createTodoRequest.userId);
    const user = await this.queryBus.execute(findUserQuery);
    const todo = this.todoFactory.create({
      status: TodoStatus.IN_PROGRESS,
      user,
      ...createTodoRequest,
    });
    await this.todoRepository.save(todo);
    todo.commit();
  }
}
