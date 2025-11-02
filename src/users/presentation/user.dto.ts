import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID('4', { message: 'Invalid currency ID format' })
  defaultCurrencyId?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Invalid currency ID format' })
  defaultCurrencyId?: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  defaultCurrencyId?: string | null;
}
