export class TodoHistoryCreatedEvent {
  constructor(readonly id: string, readonly description: string) {}
}
