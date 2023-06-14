import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateTodoHistoryDto, TODO_HISTORY_PROTO_SERVICE } from '@app/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoHistoryCommand } from '../application/command/create-todo-history/create-todo-history.command';

@Controller()
export class TodoHistoryController {
  private readonly logger = new Logger(TodoHistoryController.name);
  constructor(private readonly commandBus: CommandBus) {}
  @GrpcMethod(TODO_HISTORY_PROTO_SERVICE, 'CreateTodoHistory')
  async create(@Payload() createTodoHistoryDto: CreateTodoHistoryDto) {
    this.logger.debug(
      `history-persistence service received new update: ${JSON.stringify(
        createTodoHistoryDto,
      )}`,
    );
    const command = new CreateTodoHistoryCommand(createTodoHistoryDto);
    return await this.commandBus.execute(command);
  }
}
