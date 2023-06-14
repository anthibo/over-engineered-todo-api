import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoCommand } from '../application/command/create-todo/create-todo.command';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { FindAllQuery } from '../application/query/find-all/find-all.query';
import { FindAllResult } from '../application/query/find-all/find-all.result';
import { UpdateTodoStatusCommand } from '../application/command/update-todo-status/update-todo-status.command';
import { DeleteTodoCommand } from '../application/command/delete-todo/delete-todo.command';
import { MessageResponseDto } from '@app/common';

@Resolver(() => TodoDto)
export class TodoResolver {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Query(() => [TodoDto], { name: 'todos' })
  async findTodos(): Promise<TodoDto[]> {
    const query = new FindAllQuery();
    const { todos } = await this.queryBus.execute<FindAllQuery, FindAllResult>(
      query,
    );
    return todos as unknown as TodoDto[];
  }

  @Mutation(() => MessageResponseDto)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoDto,
  ): Promise<MessageResponseDto> {
    const command = new CreateTodoCommand(createTodoInput);
    await this.commandBus.execute(command);
    return { message: 'todo created' };
  }

  @Mutation(() => MessageResponseDto)
  async updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoStatusDto,
  ) {
    const command = new UpdateTodoStatusCommand(updateTodoInput);
    await this.commandBus.execute(command);
    return { message: 'todo updated' };
  }

  @Mutation(() => MessageResponseDto)
  async deleteTodo(@Args('deleteTodoInput') deleteTodoInput: DeleteTodoDto) {
    const command = new DeleteTodoCommand(deleteTodoInput);
    await this.commandBus.execute(command);
    return { message: 'todo deleted' };
  }
}
