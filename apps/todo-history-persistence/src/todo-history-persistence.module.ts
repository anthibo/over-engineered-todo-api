import { Module } from '@nestjs/common';
import { TodoHistoryPersistenceController } from './todo-history-persistence.controller';
import { TodoHistoryPersistenceService } from './todo-history-persistence.service';

@Module({
  imports: [],
  controllers: [TodoHistoryPersistenceController],
  providers: [TodoHistoryPersistenceService],
})
export class TodoHistoryPersistenceModule {}
