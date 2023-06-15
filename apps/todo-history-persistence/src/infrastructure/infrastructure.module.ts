import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { TodoHistoryEntity } from './entity/todo-history.entity';
// import { InjectionToken } from '../application/injection-tokens';
import { TodoHistoryRepositoryImpl } from './repository/todo-history.repository';
import { TodoHistoryDataMapper } from './mapper/todo-history.data.mapper';
import { DomainLayerModule } from '../domain/domain.module';

enum InjectionToken {
  TODO_HISTORY_REPOSITORY = 'TODO_HISTORY_REPOSITORY',
  TODO_DATA_MAPPER = 'TODO_DATA_MAPPER',
}

export const InfrastructureLayerProviders: Provider[] = [
  {
    provide: InjectionToken.TODO_HISTORY_REPOSITORY,
    useClass: TodoHistoryRepositoryImpl,
  },
  TodoHistoryDataMapper,
];

@Module({
  imports: [
    DomainLayerModule,
    DatabaseModule,
    DatabaseModule.forFeature([TodoHistoryEntity]),
  ],
  providers: [...InfrastructureLayerProviders],
  exports: [...InfrastructureLayerProviders],
})
export class InfrastructureLayerModule {}
