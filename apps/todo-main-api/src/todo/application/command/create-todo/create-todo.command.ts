import { ICommand } from '@nestjs/cqrs';
import { CreateTodoDto } from '../../../interface/dto/create-todo.dto';

export class CreateTodoCommand implements ICommand {
  constructor(public readonly createTodoRequest: CreateTodoDto) {}
}
