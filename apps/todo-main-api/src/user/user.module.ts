import { Module, Provider } from '@nestjs/common';
import { UserResolver } from './interface/user.resolver';
import { UserEntity } from './infrastructure/entity/user.entity';
import { InjectionToken } from './application/injection-tokens';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository';
import { UserFactory } from './domain/user.factory';
import { CqrsModule } from '@nestjs/cqrs';
import { SeedUsersHandler } from './application/command/seed-users/seed-users.handler';
import { FindUsersHandler } from './application/query/find-users/find-users.handler';
import { UserDataMapper } from './infrastructure/mappers/user.data.mapper';
import { FindUserHandler } from './application/query/find-user/find-user.handler';
import { DatabaseModule } from '@app/common';

const ApplicationLayerProviders = [
  // command handlers
  SeedUsersHandler,
  // query handlers
  FindUserHandler,
  FindUsersHandler,
  // sagas
];

export const InfrastructureLayerProviders: Provider[] = [
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
  UserDataMapper,
];

const InterfaceLayerProviders: Provider[] = [UserResolver];

const DomainLayerProviders = [UserFactory];

@Module({
  imports: [DatabaseModule.forFeature([UserEntity]), CqrsModule],
  providers: [
    ...InterfaceLayerProviders,
    ...ApplicationLayerProviders,
    ...InfrastructureLayerProviders,
    ...DomainLayerProviders,
  ],
  exports: [...InfrastructureLayerProviders],
})
export class UserModule {}
