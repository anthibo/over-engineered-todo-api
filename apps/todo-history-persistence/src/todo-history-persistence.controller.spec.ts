import { Test, TestingModule } from '@nestjs/testing';
import { TodoHistoryPersistenceController } from './todo-history-persistence.controller';
import { TodoHistoryPersistenceService } from './todo-history-persistence.service';

describe('TodoHistoryPersistenceController', () => {
  let todoHistoryPersistenceController: TodoHistoryPersistenceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoHistoryPersistenceController],
      providers: [TodoHistoryPersistenceService],
    }).compile();

    todoHistoryPersistenceController = app.get<TodoHistoryPersistenceController>(TodoHistoryPersistenceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(todoHistoryPersistenceController.getHello()).toBe('Hello World!');
    });
  });
});
