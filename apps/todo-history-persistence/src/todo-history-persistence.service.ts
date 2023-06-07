import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoHistoryPersistenceService {
  getHello(): string {
    return 'Hello World!';
  }
}
