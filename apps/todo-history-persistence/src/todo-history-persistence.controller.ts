import { Controller, Get } from '@nestjs/common';
import { TodoHistoryPersistenceService } from './todo-history-persistence.service';

@Controller()
export class TodoHistoryPersistenceController {
  constructor(private readonly todoHistoryPersistenceService: TodoHistoryPersistenceService) {}

  @Get()
  getHello(): string {
    return this.todoHistoryPersistenceService.getHello();
  }
}
