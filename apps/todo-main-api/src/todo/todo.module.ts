import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './interface/todo.resolver';

@Module({
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
