import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { UpdateUserDto, UserResponseDto } from './user.dto';
import { JwtAuthGuard } from '../../auth/infrastructure/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

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
