import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './interface/dto/create-todo.dto';
import { UpdateTodoStatus } from './interface/dto/update-todo.dto';

@Injectable()
export class TodoService {
  createTodo(createTodoInput: CreateTodoDto) {
    return 'This action adds a new todo';
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: string) {
    return `This action returns a #${id} todo`;
  }

  update(id: string, updateTodoInput: UpdateTodoStatus) {
    return `This action updates a #${id} todo`;
  }

  delete(id: string) {
    return `This action removes a #${id} todo`;
  }
}
