import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty({ message: 'Currency code is required' })
  @IsString()
  @Length(3, 3, { message: 'Currency code must be exactly 3 characters' })
  code: string;

  @IsNotEmpty({ message: 'Currency name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Currency symbol is required' })
  @IsString()
  symbol: string;
}

export class UpdateCurrencyDto {
  @IsString()
  @Length(3, 3, { message: 'Currency code must be exactly 3 characters' })
  code?: string;

  @IsString()
  name?: string;

  @IsString()
  symbol?: string;
}
