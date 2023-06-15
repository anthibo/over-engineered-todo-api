import { Injectable, Logger } from '@nestjs/common';
import { TodoHistory } from '../../domain/TodoHistory';
import { TodoHistoryRepository } from '../../domain/todo-history.repository.interface';
import { TodoHistoryDataMapper } from '../mapper/todo-history.data.mapper';

@Injectable()
export class TodoHistoryRepositoryImpl implements TodoHistoryRepository {
  private readonly logger = new Logger(TodoHistoryRepositoryImpl.name);
  constructor(private readonly todoHistoryDataMapper: TodoHistoryDataMapper) {}
  async createTodoHistory(history: TodoHistory): Promise<void> {
    this.logger.debug(`create new history`);
    const historyEntity =
      this.todoHistoryDataMapper.toPersistenceEntity(history);
    await historyEntity.save();
  }
}
