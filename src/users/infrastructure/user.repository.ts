import { Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UserRepository {
  private users: Map<string, User> = new Map();

  create(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  findById(id: string): User | null {
    return this.users.get(id) || null;
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }
}
