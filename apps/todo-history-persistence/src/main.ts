import { NestFactory } from '@nestjs/core';
import { TodoHistoryPersistenceModule } from './todo-history-persistence.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoHistoryPersistenceModule);
  await app.listen(3000);
}
bootstrap();
