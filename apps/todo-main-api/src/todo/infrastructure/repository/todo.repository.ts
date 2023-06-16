import { InjectModel } from '@nestjs/sequelize';
import { TodoRepository } from '../../domain/todo-repository.interface';
import { TodoEntity } from '../entity/todo.entity';
import { Todo, TodoStatus } from '../../domain/Todo';
import { TodoDataMapper } from '../mappers/todo.data.mapper';
import { UserEntity } from 'apps/todo-main-api/src/user/infrastructure/entity/user.entity';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectModel(TodoEntity)
    private readonly todoDBEntity: typeof TodoEntity,
    private readonly todoDataMapper: TodoDataMapper,
  ) {}
  async findAll(): Promise<Todo[]> {
    const todoEntities = await this.todoDBEntity.findAll({
      include: [UserEntity],
      order: [['createdAt', 'DESC']],
    });
    return todoEntities.map((todoEntity) =>
      this.todoDataMapper.toDomainModel(todoEntity),
    );
  }

  async findById(id: string): Promise<Todo> {
    const todoEntity = await this.todoDBEntity.findByPk(id, {
      include: [UserEntity],
    });
    return todoEntity ? this.todoDataMapper.toDomainModel(todoEntity) : null;
  }

  async update(id: string, updatedStatus: TodoStatus): Promise<void> {
    const todoEntity = await this.todoDBEntity.findByPk(id);
    todoEntity.status = updatedStatus;
    await todoEntity.save();
  }

  async save(todo: Todo): Promise<Todo> {
    const todoEntity = await this.todoDataMapper
      .toPersistenceEntity(todo)
      .save();
    const todoDomainModel = this.todoDataMapper.toDomainModel(todoEntity);
    return todoDomainModel;
  }

  async deleteById(id: string): Promise<void> {
    const todoEntity = await this.todoDBEntity.findByPk(id);
    await todoEntity.destroy();
  }
}
