import { Module, Provider } from '@nestjs/common';
import { TodoHistoryController } from './interface/todo-history.controller';
import { TodoHistoryFactory } from './domain/todo-history.factory';
import { TodoHistoryDataMapper } from './infrastructure/mapper/todo-history.data.mapper';
import { InjectionToken } from './application/injection-tokens';
import { TodoHistoryRepositoryImpl } from './infrastructure/repository/todo-history.repository';
import { CreateTodoHistoryCommand } from './application/command/create-todo-history/create-todo-history.command';
import { TodoHistoryEntity } from './infrastructure/entity/todo-history.entity';
import { CqrsModule } from '@nestjs/cqrs';
import {
  DatabaseModule,
  TODO_HISTORY_PROTO_PACKAGE,
  TODO_MAIN_API_SERVICE,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CreateTodoHistoryHandler } from './application/command/create-todo-history/create-todo-history';

const ApplicationLayerProviders = [
  // command handlers
  CreateTodoHistoryHandler,
  // sagas
];

export const InfrastructureLayerProviders: Provider[] = [
  {
    provide: InjectionToken.TODO_HISTORY_REPOSITORY,
    useClass: TodoHistoryRepositoryImpl,
  },
  TodoHistoryDataMapper,
];

const InterfaceLayerProviders: Provider[] = [];

const DomainLayerProviders = [TodoHistoryFactory];

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([TodoHistoryEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),

        TODO_API_HOST: Joi.string().required(),
        TODO_API_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: TODO_MAIN_API_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: TODO_HISTORY_PROTO_PACKAGE,
            protoPath: join(
              __dirname,
              './interface/proto/todo-history/todo-history.proto',
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
    CqrsModule,
  ],
  controllers: [TodoHistoryController],
  providers: [
    ...ApplicationLayerProviders,
    ...InfrastructureLayerProviders,
    ...InterfaceLayerProviders,
    ...DomainLayerProviders,
  ],
})
export class TodoHistoryPersistenceModule {}
