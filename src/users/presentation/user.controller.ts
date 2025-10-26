import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { CreateUserDto, UserResponseDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() { name }: CreateUserDto): UserResponseDto {
    return this.userService.createUser(name);
  }

  @Get(':user_id')
  getUserById(@Param('user_id') userId: string): UserResponseDto {
    return this.userService.getUserById(userId);
  }

  @Get()
  getAllUsers(): UserResponseDto[] {
    return this.userService.getAllUsers();
  }

  @Delete(':user_id')
  deleteUser(@Param('user_id') userId: string): void {
    return this.userService.deleteUser(userId);
  }
}
