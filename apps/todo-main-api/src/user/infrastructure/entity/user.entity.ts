import { TodoEntity } from 'apps/todo-main-api/src/todo/infrastructure/entity/todo.entity';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class UserEntity extends Model<UserEntity> {
  @Column({ primaryKey: true, unique: true })
  id: string;

  @Column
  name: string;

  @HasMany(() => TodoEntity)
  tasks: TodoEntity[];
}
