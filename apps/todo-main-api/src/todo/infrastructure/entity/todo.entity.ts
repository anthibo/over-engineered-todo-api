import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { TodoStatus } from '../../domain/Todo';
import { UserEntity } from 'apps/todo-main-api/src/user/infrastructure/entity/user.entity';

@Table({ tableName: 'todo' })
export class TodoEntity extends Model<TodoEntity> {
  @Column({ primaryKey: true, unique: true })
  id: string;

  @Column
  title: string;

  @Column({
    defaultValue: TodoStatus.IN_PROGRESS,
    values: [TodoStatus.DONE, TodoStatus.IN_PROGRESS],
  })
  status: string;

  @ForeignKey(() => UserEntity)
  @Column
  userId: string;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
