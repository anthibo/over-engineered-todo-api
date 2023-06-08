import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from '../todo.service';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoStatus } from './dto/update-todo.dto';

@Resolver(() => TodoDto)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => TodoDto)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoDto) {
    return this.todoService.createTodo(createTodoInput);
  }

  @Query(() => [TodoDto], { name: 'todo' })
  findAll() {
    return this.todoService.findAll();
  }

  @Query(() => TodoDto, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => TodoDto)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoStatus) {
    return this.todoService.update(updateTodoInput.todoId, updateTodoInput);
  }

  @Mutation(() => TodoDto)
  removeTodo(@Args('id', { type: () => Int }) id: string) {
    return this.todoService.delete(id);
  }
}
