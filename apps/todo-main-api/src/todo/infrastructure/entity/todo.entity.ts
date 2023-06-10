import { Table, Column, Model } from 'sequelize-typescript';
import { TodoStatus } from '../../domain/Todo';

@Table({ tableName: 'todo' })
export class TodoEntity extends Model {
  @Column({ primaryKey: true, unique: true })
  id: string;

  @Column
  title: string;

  @Column({
    defaultValue: TodoStatus.IN_PROGRESS,
    values: [TodoStatus.DONE, TodoStatus.IN_PROGRESS],
  })
  status: string;

  // TODO: Add user's relation here
  @Column
  user: number;
}
