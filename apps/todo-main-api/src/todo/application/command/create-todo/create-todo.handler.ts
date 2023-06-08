import { CreateTodoDto } from '../../../interface/dto/create-todo.dto';

export class CreateTodoCommand {
  constructor(public readonly createTodoRequest: CreateTodoDto) {}
}
