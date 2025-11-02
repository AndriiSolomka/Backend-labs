import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../infrastructure/user.repository';
import { CreateUserDto, UpdateUserDto } from '../presentation/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    await this.getUserById(id);
    return this.userRepository.update(id, dto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }
}
