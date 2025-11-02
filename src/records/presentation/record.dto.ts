import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty({ message: 'User ID is required' })
  @IsUUID('4', { message: 'Invalid user ID format' })
  userId: string;

  @IsNotEmpty({ message: 'Category ID is required' })
  @IsUUID('4', { message: 'Invalid category ID format' })
  categoryId: string;

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber()
  @IsPositive({ message: 'Amount must be positive' })
  amount: number;

  @IsOptional()
  @IsUUID('4', { message: 'Invalid currency ID format' })
  currencyId?: string;
}

export class UpdateRecordDto {
  @IsOptional()
  @IsUUID('4', { message: 'Invalid category ID format' })
  categoryId?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Amount must be positive' })
  amount?: number;

  @IsOptional()
  @IsUUID('4', { message: 'Invalid currency ID format' })
  currencyId?: string;
}

export class RecordResponseDto {
  id: string;
  userId: string;
  categoryId: string;
  currencyId?: string;
  createdAt: Date;
  amount: number;
}
