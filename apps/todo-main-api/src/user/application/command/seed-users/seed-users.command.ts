import { ICommand } from '@nestjs/cqrs';

export class SeedUsersCommand implements ICommand {
  constructor(public readonly numOfUsers: number) {}
}
