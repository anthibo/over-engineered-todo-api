import { ICommand } from '@nestjs/cqrs';

export class CreateHistoryCommand implements ICommand {
  constructor(public readonly description: string) {}
}
