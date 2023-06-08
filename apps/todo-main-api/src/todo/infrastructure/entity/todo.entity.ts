import { Table, Column, Model } from 'sequelize-typescript';
import { TodoStatus } from '../../domain/Todo';

@Table({ tableName: 'todo' })
export class TodoEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column({ defaultValue: TodoStatus.IN_PROGRESS })
  status: TodoStatus;

  @Column
  user: number;

  @Column
  createdAt?: Date;
}
