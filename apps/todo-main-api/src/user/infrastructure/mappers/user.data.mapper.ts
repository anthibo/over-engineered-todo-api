import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { UserFactory } from '../../domain/user.factory';
import { DataMapper } from 'libs/common/src/infrastructure/data.mapper.interface';
import { User, UserProperties } from '../../domain/User';

@Injectable()
export class UserDataMapper implements DataMapper<User, UserEntity> {
  constructor(private readonly userFactory: UserFactory) {}
  toPersistenceEntity(user: User): UserEntity {
    const properties = JSON.parse(JSON.stringify(user)) as UserProperties;
    return Object.assign(new UserEntity(), {
      ...properties,
    });
  }

  toDomainModel(userEntity: UserEntity): User {
    return this.userFactory.reconstitute({
      id: userEntity.id,
      createdAt: userEntity.createdAt,
      deletedAt: userEntity.deletedAt,
      updatedAt: userEntity.updatedAt,
      name: userEntity.name,
    });
  }
}
