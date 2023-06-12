import { Module, Provider } from '@nestjs/common';
import { TodoResolver } from './interface/todo.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoEntity } from './infrastructure/entity/todo.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateTodoStatusHandler } from './application/command/update-todo-status/update-todo-status.handler';
import { CreateTodoHandler } from './application/command/create-todo/create-todo.handler';
import { DeleteTodoHandler } from './application/command/delete-todo/delete.todo.handler';
import { TodoRepositoryImpl } from './infrastructure/repository/todo.repository';
import { InjectionToken } from './application/injection-tokens';
import { TodoFactory } from './domain/todo.factory';
import { TodoSaga } from './application/saga/todo.saga';
import { FindAllHandler } from './application/query/find-all/find-all.handler';
import { TodoDataMapper } from './infrastructure/mappers/todo.data.mapper';
import { UserModule } from '../user/user.module';

const ApplicationLayerProviders = [
  // command handlers
  UpdateTodoStatusHandler,
  CreateTodoHandler,
  DeleteTodoHandler,
  // query handlers
  FindAllHandler,
  // sagas
  TodoSaga,
];

const InfrastructureLayerProviders: Provider[] = [
  {
    provide: InjectionToken.TODO_REPOSITORY,
    useClass: TodoRepositoryImpl,
  },
  TodoDataMapper,
];

const InterfaceLayerProviders: Provider[] = [TodoResolver];

const DomainLayerProviders = [TodoFactory];

@Module({
  imports: [UserModule, CqrsModule, SequelizeModule.forFeature([TodoEntity])],
  providers: [
    ...InterfaceLayerProviders,
    ...ApplicationLayerProviders,
    ...InfrastructureLayerProviders,
    ...DomainLayerProviders,
  ],
})
export class TodoModule {}
