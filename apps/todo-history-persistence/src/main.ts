import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { TodoHistoryPersistenceModule } from './todo-history-persistence.module';
import { join } from 'path';
import { TODO_HISTORY_PROTO_PACKAGE } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TodoHistoryPersistenceModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${port}`,
      package: TODO_HISTORY_PROTO_PACKAGE,
      protoPath: join(
        __dirname,
        './interface/proto/todo-history/todo-history.proto',
      ),
      loader: {
        keepCase: true,
        longs: Number,
        enums: String,
        defaults: true,
        oneofs: true,
        objects: true,
        json: true,
      },
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
