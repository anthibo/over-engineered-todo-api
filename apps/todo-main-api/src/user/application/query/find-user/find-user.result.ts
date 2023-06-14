import { IQueryResult } from '@nestjs/cqrs';
import { User } from '../../../domain/User';

export class FindUserResult implements IQueryResult {
  constructor(readonly user: Readonly<User>) {}
}
