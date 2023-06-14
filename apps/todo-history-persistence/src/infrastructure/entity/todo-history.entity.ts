import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'todo_history' })
export class TodoHistoryEntity extends Model<TodoHistoryEntity> {
  @Column({ primaryKey: true, unique: true })
  id: string;

  @Column
  description: string;
}
