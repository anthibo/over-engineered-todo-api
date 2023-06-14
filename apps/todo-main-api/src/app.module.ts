import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@app/common';
import { TodoHistoryModule } from './todo-history/todo-history.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),

        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),

        HISTORY_PERSISTENCE_HOST: Joi.string().required(),
        HISTORY_PERSISTENCE_PORT: Joi.number().required(),
      }),
    }),
    TodoModule,
    UserModule,
    TodoHistoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
