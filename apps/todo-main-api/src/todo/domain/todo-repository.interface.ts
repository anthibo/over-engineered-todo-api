import { Todo } from './Todo';

export interface TodoRepository {
  findById(id: number): Promise<Todo | null>;
  save(todo: Todo): Promise<void>;
  findAll: () => Promise<Todo[]>;
  deleteById: (id: number) => Promise<void>;
}
