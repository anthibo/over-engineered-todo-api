import { User } from './User';

export interface UserRepository {
  createUser: (user: User) => Promise<void>;
  findUserById: (id: string) => Promise<User>;
  findUsers: () => Promise<User[]>;
}
