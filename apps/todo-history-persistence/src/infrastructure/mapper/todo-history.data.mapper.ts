import { Injectable } from '@nestjs/common';
import { TodoHistoryEntity } from '../entity/todo-history.entity';
import { TodoHistoryFactory } from '../../domain/todo-history.factory';
import { TodoHistory, TodoHistoryProperties } from '../../domain/TodoHistory';
import { IDataMapper } from '@app/common';

@Injectable()
export class TodoHistoryDataMapper
  implements IDataMapper<TodoHistory, TodoHistoryEntity>
{
  constructor(private readonly todoHistoryFactory: TodoHistoryFactory) {}
  toPersistenceEntity(todoHistory: TodoHistory): TodoHistoryEntity {
    const properties = JSON.parse(
      JSON.stringify(todoHistory),
    ) as TodoHistoryProperties;
    return Object.assign(new TodoHistoryEntity(), {
      ...properties,
    });
  }

  toDomainModel(userEntity: TodoHistoryEntity): TodoHistory {
    return this.todoHistoryFactory.reconstitute({
      id: userEntity.id,
      description: userEntity.description,
      createdAt: userEntity.createdAt,
      deletedAt: userEntity.deletedAt,
      updatedAt: userEntity.updatedAt,
    });
  }
}
