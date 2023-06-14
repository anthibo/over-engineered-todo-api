import { ICommand } from '@nestjs/cqrs';
import { CreateTodoHistoryDto } from 'libs/common/src/interface/dto/create-todo-history.dto';

export class CreateTodoHistoryCommand implements ICommand {
  constructor(public readonly createTodoHistoryRequest: CreateTodoHistoryDto) {}
}
