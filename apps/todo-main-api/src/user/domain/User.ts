import { AggregateRoot } from '@nestjs/cqrs';

export type UserEssentialProperties = Readonly<
  Required<{
    id: string;
    name: string;
  }>
>;

export type UserOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type UserProperties = UserEssentialProperties &
  Required<UserOptionalProperties>;

export interface User extends AggregateRoot {
  commit: () => void;
  getId(): string;
}

export class UserImplement extends AggregateRoot implements User {
  private readonly id: string;
  private readonly name: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
    this.getId = this.getId.bind(this);
  }

  getId(): string {
    return this.id;
  }
}
