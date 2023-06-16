import { Todo, TodoStatus } from './Todo';

export interface TodoRepository {
  findById(id: string): Promise<Todo | null>;
  save(todo: Todo): Promise<Todo>;
  findAll: () => Promise<Todo[]>;
  deleteById: (id: string) => Promise<void>;
  update: (id: string, updatedStatus: TodoStatus) => Promise<void>;
}
