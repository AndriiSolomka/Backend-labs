import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(name: string): User {
    const user: User = {
      id: randomUUID(),
      name,
    };
    return this.userRepository.create(user);
  }

  getUserById(id: string): User {
    const user = this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  getAllUsers(): User[] {
    return this.userRepository.findAll();
  }

  deleteUser(id: string): void {
    const user = this.getUserById(id);
    this.userRepository.delete(user.id);
  }
}
