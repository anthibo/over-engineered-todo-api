import { TodoHistory } from './TodoHistory';

export interface TodoHistoryRepository {
  createTodoHistory: (history: TodoHistory) => Promise<void>;
}
