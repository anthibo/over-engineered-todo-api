import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllQuery } from './find-all.query';
import { FindAllResult } from './find-all.result';
import { InjectionToken } from '../../injection-tokens';
import { TodoRepository } from '../../../domain/todo-repository.interface';

@QueryHandler(FindAllQuery)
export class FindAllHandler
  implements IQueryHandler<FindAllQuery, FindAllResult>
{
  private readonly logger = new Logger(FindAllHandler.name);
  @Inject(InjectionToken.TODO_REPOSITORY)
  readonly todoRepository: TodoRepository;

  async execute(): Promise<FindAllResult> {
    const todos = await this.todoRepository.findAll();
    this.logger.debug(`found ${todos.length} todos`);
    this.logger.debug(`todos: ${JSON.stringify(todos)}`);
    return { todos };
  }
}
