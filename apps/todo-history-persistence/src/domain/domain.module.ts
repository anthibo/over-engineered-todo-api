import { Module } from '@nestjs/common';
import { TodoHistoryFactory } from './todo-history.factory';
import { CqrsModule } from '@nestjs/cqrs';

const DomainLayerProviders = [TodoHistoryFactory];

@Module({
  imports: [CqrsModule],
  providers: [...DomainLayerProviders],
  exports: [...DomainLayerProviders],
})
export class DomainLayerModule {}
