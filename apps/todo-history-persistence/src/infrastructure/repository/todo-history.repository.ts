import { InjectModel } from '@nestjs/sequelize';
import { TodoHistory } from '../../domain/TodoHistory';
import { TodoHistoryRepository } from '../../domain/todo-history.repository.interface';
import { TodoHistoryEntity } from '../entity/todo-history.entity';
import { TodoHistoryDataMapper } from '../mapper/todo-history.data.mapper';

export class TodoHistoryRepositoryImpl implements TodoHistoryRepository {
  constructor(
    @InjectModel(TodoHistoryEntity)
    private readonly todoHistoryDBEntity: TodoHistoryEntity,
    private readonly todoHistoryDataMapper: TodoHistoryDataMapper,
  ) {}

  async createTodoHistory(history: TodoHistory): Promise<void> {
    const historyEntity =
      this.todoHistoryDataMapper.toPersistenceEntity(history);
    await historyEntity.save();
  }
}
