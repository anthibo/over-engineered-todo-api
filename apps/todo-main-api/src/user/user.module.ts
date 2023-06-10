import { Module, Provider } from '@nestjs/common';
import { UserResolver } from './interface/user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './infrastructure/entity/user.entity';
import { InjectionToken } from './application/injection-tokens';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository';
import { UserFactory } from './domain/user.factory';
import { CqrsModule } from '@nestjs/cqrs';
import { SeedUsersHandler } from './application/command/seed-users/seed-users.handler';

const ApplicationLayerProviders = [
  // command handlers
  SeedUsersHandler,
  // query handlers
  // sagas
];

const InfrastructureLayerProviders: Provider[] = [
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
];

const InterfaceLayerProviders: Provider[] = [UserResolver];

const DomainLayerProviders = [UserFactory];

@Module({
  imports: [SequelizeModule.forFeature([UserEntity]), CqrsModule],
  providers: [
    ...InterfaceLayerProviders,
    ...ApplicationLayerProviders,
    ...InfrastructureLayerProviders,
    ...DomainLayerProviders,
  ],
})
export class UserModule {}
