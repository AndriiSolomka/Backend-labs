import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../infrastructure/user.repository';
import { UpdateUserDto, UserResponseDto } from '../presentation/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.excludePassword(user);
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.excludePassword(user));
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    await this.getUserById(id);
    const user = await this.userRepository.update(id, dto);
    return this.excludePassword(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }

  private excludePassword(user: User): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
