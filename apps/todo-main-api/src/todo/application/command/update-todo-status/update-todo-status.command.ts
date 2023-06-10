import { ICommand } from '@nestjs/cqrs';
import { UpdateTodoStatus } from '../../../interface/dto/update-todo-status.dto';

export class UpdateTodoStatusCommand implements ICommand {
  constructor(public readonly updateTodoStatusRequest: UpdateTodoStatus) {}
}
