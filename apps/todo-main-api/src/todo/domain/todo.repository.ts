import { TodoEntity } from '../infrastructure/entity/todo.entity';

export interface TodoRepository {
  findById(id: string): Promise<TodoEntity | null>;
  save(todo: TodoEntity): Promise<void>;
  findAll: () => Promise<TodoEntity[]>;
}
