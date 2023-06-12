import { InjectModel } from '@nestjs/sequelize';
import { TodoRepository } from '../../domain/todo-repository.interface';
import { TodoEntity } from '../entity/todo.entity';
import { Todo } from '../../domain/Todo';
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
    });
    return todoEntities.map((todoEntity) =>
      this.todoDataMapper.toDomainModel(todoEntity),
    );
  }

  async findById(id: number): Promise<Todo> {
    const todoEntity = await this.todoDBEntity.findByPk(id);
    return todoEntity ? this.todoDataMapper.toDomainModel(todoEntity) : null;
  }
  async save(todo: Todo): Promise<void> {
    const todoEntity = this.todoDataMapper.toPersistenceEntity(todo);
    await todoEntity.save();
  }

  async deleteById(id: number): Promise<void> {
    const todoEntity = await this.todoDBEntity.findByPk(id);
    await todoEntity.destroy();
  }
}
