import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateTodoHistoryHandler } from './command/create-todo-history/create-todo-history.handler';
import { InfrastructureLayerModule } from '../infrastructure/infrastructure.module';
import { DomainLayerModule } from '../domain/domain.module';

const ApplicationLayerProviders = [
  // command handlers
  CreateTodoHistoryHandler,
  // sagas
];

@Module({
  imports: [CqrsModule, InfrastructureLayerModule, DomainLayerModule],
  providers: [...ApplicationLayerProviders],
  exports: [...ApplicationLayerProviders],
})
export class ApplicationLayerModule {}
