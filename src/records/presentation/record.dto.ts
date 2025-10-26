export class CreateRecordDto {
  userId: string;
  categoryId: string;
  amount: number;
}

export class RecordResponseDto {
  id: string;
  userId: string;
  categoryId: string;
  createdAt: Date;
  amount: number;
}
