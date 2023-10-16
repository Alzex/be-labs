import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateRecordDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(1)
  categoryId: number;

  @IsNumber()
  amount: number;

  createdAt: Date;
}
