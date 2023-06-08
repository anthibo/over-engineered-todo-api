// import {
//   UnprocessableEntityException,
//   InternalServerErrorException,
// } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

// import { ErrorMessage } from './error-messages';
import { TodoStatusUpdatedEvent } from './event/todo-updated.event';
import { TodoDeletedEvent } from './event/todo-deleted.event';

export type TodoEssentialProperties = Readonly<
  Required<{
    id: string;
    title: string;
    userId: string;
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

export interface Todo {
  compareId: (id: string) => boolean;
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
  private readonly userId: string;
  private status: TodoStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: TodoProperties) {
    super();
    Object.assign(this, properties);
  }

  compareId(id: string): boolean {
    return id === this.id;
  }

  updateStatus(status: TodoStatus) {
    this.status = status;
    this.updatedAt = new Date();
    this.apply(
      new TodoStatusUpdatedEvent(
        this.id,
        this.status,
        this.userId,
        this.updatedAt,
      ),
    );
  }

  updateDeletedAt() {
    this.deletedAt = new Date();
    this.apply(new TodoDeletedEvent(this.id, this.userId, this.deletedAt));
  }
}
