import {
  CreateTodoHistoryDto,
  HISTORY_PERSISTENCE_SERVICE,
  TODO_HISTORY_PROTO_SERVICE,
  TodoHistoryGrpcService,
} from '@app/common';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TodoHistoryGrpcClient implements OnModuleInit {
  private readonly logger = new Logger(TodoHistoryGrpcClient.name);
  constructor(
    @Inject(HISTORY_PERSISTENCE_SERVICE)
    private readonly grpcClient: ClientGrpc,
  ) {}

  private historyPersistenceGrpcService: TodoHistoryGrpcService;

  onModuleInit() {
    this.historyPersistenceGrpcService = this.grpcClient.getService(
      TODO_HISTORY_PROTO_SERVICE,
    );
    if (!this.historyPersistenceGrpcService) {
      console.log('Failed to get history-persistence service');
    } else {
      console.log(
        JSON.stringify(this.historyPersistenceGrpcService.createTodoHistory),
      );
      console.log(this.historyPersistenceGrpcService);
    }
  }

  createTodoHistory(createHistoryDto: CreateTodoHistoryDto) {
    this.logger.debug(
      `sending new grpc request to history-persistence service`,
    );
    return this.historyPersistenceGrpcService.createTodoHistory(
      createHistoryDto,
    );
  }
}
