import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from '../../domain/user.repository.interface';
import { User, UserProperties } from '../../domain/User';
import { UserFactory } from '../../domain/user.factory';
import { UserEntity } from '../entity/user.entity';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(UserEntity)
    private readonly userDBEntity: typeof UserEntity,
    private readonly userFactory: UserFactory,
  ) {}
  async createUser(user: User) {
    const userEntity = this.modelToEntity(user);
    userEntity.save();
  }

  // DATA MAPPERS
  private modelToEntity(model: User): UserEntity {
    const properties = JSON.parse(JSON.stringify(model)) as UserProperties;
    return Object.assign(new UserEntity(), {
      ...properties,
    });
  }

  private entityToModel(entity: UserEntity): User {
    return this.userFactory.reconstitute({
      id: entity.id,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
      updatedAt: entity.updatedAt,
      name: entity.name,
    });
  }
}
