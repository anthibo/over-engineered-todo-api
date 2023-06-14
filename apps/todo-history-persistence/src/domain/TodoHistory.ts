import { AggregateRoot } from '@nestjs/cqrs';

export type TodoHistoryEssentialProperties = Readonly<
  Required<{
    id: string;
    description: string;
  }>
>;

export type TodoHistoryOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type TodoHistoryProperties = TodoHistoryEssentialProperties &
  Required<TodoHistoryOptionalProperties>;

export interface TodoHistory extends AggregateRoot {
  commit: () => void;
}

export class TodoHistoryImplement extends AggregateRoot implements TodoHistory {
  private readonly id: string;
  private readonly description: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: TodoHistoryProperties) {
    super();
    Object.assign(this, properties);
    // this.apply(new TodoCreatedEvent(this.id, this.user, this.createdAt));
  }
}
