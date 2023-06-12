import { Injectable } from '@nestjs/common';
import { Todo, TodoProperties, TodoStatus } from '../../domain/Todo';
import { TodoEntity } from '../entity/todo.entity';
import { TodoFactory } from '../../domain/todo.factory';
import { DataMapper } from 'libs/common/src/infrastructure/data.mapper.interface';
import { UserDataMapper } from 'apps/todo-main-api/src/user/infrastructure/mappers/user.data.mapper';

@Injectable()
export class TodoDataMapper implements DataMapper<Todo, TodoEntity> {
  constructor(
    private readonly todoFactory: TodoFactory,
    private readonly userDataMapper: UserDataMapper,
  ) {}
  toDomainModel(entity: TodoEntity): Todo {
    return this.todoFactory.reconstitute({
      id: entity.id,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
      user: this.userDataMapper.toDomainModel(entity.user),
      status: entity.status as TodoStatus,
      title: entity.title,
      updatedAt: entity.updatedAt,
    });
  }
  toPersistenceEntity(todo: Todo): TodoEntity {
    const properties = JSON.parse(JSON.stringify(todo)) as TodoProperties;
    return Object.assign(new TodoEntity(), {
      ...properties,
      user: properties.user,
      id: properties.id,
      createdAt: properties.createdAt,
      deletedAt: properties.deletedAt,
    });
  }
}
