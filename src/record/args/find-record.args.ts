import { IsInt, IsOptional, Min } from 'class-validator';

export class FindRecordArgs {
  @IsOptional()
  @IsInt()
  @Min(1)
  userId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId?: number;
}
