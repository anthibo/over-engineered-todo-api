import { AggregateRoot } from '@nestjs/cqrs';

import { TodoStatusUpdatedEvent } from './event/todo-updated.event';
import { TodoDeletedEvent } from './event/todo-deleted.event';
import { TodoCreatedEvent } from './event/todo-created.event';
import { User } from '../../user/domain/User';

export type TodoEssentialProperties = Readonly<
  Required<{
    id: string;
    title: string;
    user: User;
    status: TodoStatus;
  }>
>;

export type TodoOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type TodoProperties = TodoEssentialProperties &
  Required<TodoOptionalProperties>;

export interface Todo extends AggregateRoot {
  updateStatus: (status: TodoStatus) => void;
  updateDeletedAt: () => void;
  commit: () => void;
}

export enum TodoStatus {
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export class TodoImplement extends AggregateRoot implements Todo {
  private readonly id: string;
  private readonly title: string;
  private readonly user: User;
  private status: TodoStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: TodoProperties) {
    super();
    Object.assign(this, properties);
    this.apply(new TodoCreatedEvent(this.id, this.user, this.createdAt));
  }

  updateStatus(status: TodoStatus) {
    this.status = status;
    this.updatedAt = new Date();
    this.apply(
      new TodoStatusUpdatedEvent(
        this.id,
        this.status,
        this.user,
        this.updatedAt,
      ),
    );
  }

  updateDeletedAt() {
    this.deletedAt = new Date();
    this.apply(new TodoDeletedEvent(this.id, this.user, this.deletedAt));
  }
}
