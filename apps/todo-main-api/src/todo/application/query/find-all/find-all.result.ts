import { IQueryResult } from '@nestjs/cqrs';
import { Todo } from '../../../domain/Todo';

export class FindAllResult implements IQueryResult {
  constructor(readonly todos: Readonly<Todo>[]) {}
}
