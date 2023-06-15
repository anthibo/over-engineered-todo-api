import { Module } from '@nestjs/common';

import { TODO_HISTORY_PROTO_PACKAGE, TODO_MAIN_API_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ApplicationLayerModule } from './application/application.module';
import { InfrastructureLayerModule } from './infrastructure/infrastructure.module';
import { InterfaceLayerModule } from './interface/interface.module';
import { DomainLayerModule } from './domain/domain.module';

@Module({
  imports: [
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
    DomainLayerModule,
    ApplicationLayerModule,
    InfrastructureLayerModule,
    InterfaceLayerModule,
  ],
})
export class TodoHistoryPersistenceModule {}
