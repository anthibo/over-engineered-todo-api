import { Module, Provider } from '@nestjs/common';

import { TodoHistoryGrpcClient } from './infrastructre/todo-history.grpc.client';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  HISTORY_PERSISTENCE_SERVICE,
  TODO_HISTORY_PROTO_PACKAGE,
} from '@app/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { CreateHistoryHandler } from './application/create-history/create-history.handler';

const ApplicationLayerProviders = [
  // command handlers
  CreateHistoryHandler,
  // sagas
];
const InfrastructureLayerProviders: Provider[] = [TodoHistoryGrpcClient];

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: HISTORY_PERSISTENCE_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: TODO_HISTORY_PROTO_PACKAGE,
            protoPath: join(
              __dirname,
              './todo-history/interface/proto/todo-history/todo-history.proto',
            ),
            url: `${configService.get(
              'HISTORY_PERSISTENCE_HOST',
            )}:${configService.get('HISTORY_PERSISTENCE_PORT')}`,
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
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [...InfrastructureLayerProviders, ...ApplicationLayerProviders],
  exports: [...InfrastructureLayerProviders],
})
export class TodoHistoryModule {}
