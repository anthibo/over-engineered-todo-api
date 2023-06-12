import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from '../../domain/user.repository.interface';
import { User } from '../../domain/User';
import { UserEntity } from '../entity/user.entity';
import { UserDataMapper } from '../mappers/user.data.mapper';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(UserEntity)
    private readonly userDBEntity: typeof UserEntity,
    private readonly userDataMapper: UserDataMapper,
  ) {}
  async findUserById(id: string) {
    const userEntity = await this.userDBEntity.findByPk(id);
    return userEntity ? this.userDataMapper.toDomainModel(userEntity) : null;
  }

  async findUsers() {
    const userEntities = await this.userDBEntity.findAll();
    return userEntities.map((userEntity) =>
      this.userDataMapper.toDomainModel(userEntity),
    );
  }

  async createUser(user: User) {
    const userEntity = this.userDataMapper.toPersistenceEntity(user);
    userEntity.save();
  }
}
