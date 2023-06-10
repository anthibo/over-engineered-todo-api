import { InjectModel } from '@nestjs/sequelize';
import { TodoRepository } from '../../domain/todo-repository.interface';
import { TodoEntity } from '../entity/todo.entity';
import { Todo, TodoProperties, TodoStatus } from '../../domain/Todo';
import { TodoFactory } from '../../domain/todo.factory';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectModel(TodoEntity)
    private readonly todoDBEntity: typeof TodoEntity,
    private readonly todoFactory: TodoFactory,
  ) {}
  async findAll(): Promise<Todo[]> {
    const todos = await this.todoDBEntity.findAll();
    return todos.map((todo) => this.entityToModel(todo));
  }

  async findById(id: number): Promise<Todo> {
    const todo = await this.todoDBEntity.findByPk(id);
    return todo ? this.entityToModel(todo) : null;
  }
  async save(todo: Todo): Promise<void> {
    const todoEntity = this.modelToEntity(todo);
    await todoEntity.save();
  }

  async deleteById(id: number): Promise<void> {
    const todoEntity = await this.todoDBEntity.findByPk(id);
    await todoEntity.destroy();
  }

  // DATA MAPPERS
  private modelToEntity(model: Todo): TodoEntity {
    const properties = JSON.parse(JSON.stringify(model)) as TodoProperties;
    return Object.assign(new TodoEntity(), {
      ...properties,
      user: properties.userId,
      id: properties.id,
      createdAt: properties.createdAt,
      deletedAt: properties.deletedAt,
    });
  }

  private entityToModel(entity: TodoEntity): Todo {
    return this.todoFactory.reconstitute({
      id: entity.id,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
      userId: entity.user,
      status: entity.status as TodoStatus,
      title: entity.title,
      updatedAt: entity.updatedAt,
    });
  }
}
