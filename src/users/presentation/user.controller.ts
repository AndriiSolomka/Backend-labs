import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(dto);
  }

  @Get(':user_id')
  async getUserById(
    @Param('user_id') userId: string,
  ): Promise<UserResponseDto> {
    return this.userService.getUserById(userId);
  }

  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }

  @Put(':user_id')
  async updateUser(
    @Param('user_id') userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(userId, dto);
  }

  @Delete(':user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('user_id') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
