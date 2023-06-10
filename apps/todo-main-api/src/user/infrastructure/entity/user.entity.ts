import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class UserEntity extends Model {
  @Column({ primaryKey: true, unique: true })
  id: string;

  @Column
  name: string;
}
