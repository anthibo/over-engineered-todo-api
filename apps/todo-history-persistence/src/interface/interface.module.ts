import { Module } from '@nestjs/common';
import { ApplicationLayerModule } from '../application/application.module';
import { TodoHistoryController } from './todo-history.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [ApplicationLayerModule, CqrsModule],
  controllers: [TodoHistoryController],
  providers: [],
  exports: [],
})
export class InterfaceLayerModule {}
