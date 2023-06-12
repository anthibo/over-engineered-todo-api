import { AggregateRoot } from '@nestjs/cqrs';
import { Model as DBEntity } from 'sequelize';

export interface DataMapper<
  DomainModel extends AggregateRoot,
  PersistenceEntity extends DBEntity,
> {
  toDomainModel: (entity: DBEntity) => DomainModel;
  toPersistenceEntity: (domain: DomainModel) => PersistenceEntity;
}
