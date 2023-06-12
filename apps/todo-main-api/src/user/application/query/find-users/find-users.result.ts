import { IQueryResult } from '@nestjs/cqrs';
import { User } from '../../../domain/User';

export class FindUsersResult implements IQueryResult {
  constructor(readonly users: Readonly<User[]>) {}
}
