import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;

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
  email: string;
  defaultCurrencyId?: string | null;
}
