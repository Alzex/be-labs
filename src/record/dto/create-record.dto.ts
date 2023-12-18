import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateRecordDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(1)
  categoryId: number;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  currencyId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  ownerId?: number;
}
