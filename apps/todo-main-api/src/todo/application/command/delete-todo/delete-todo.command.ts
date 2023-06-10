import { ICommand } from '@nestjs/cqrs';
import { DeleteTodoDto } from '../../../interface/dto/delete-todo.dto';

export class DeleteTodoCommand implements ICommand {
  constructor(public readonly deleteTodoRequest: DeleteTodoDto) {}
}
