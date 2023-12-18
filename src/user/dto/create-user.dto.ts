import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  defaultCurrencyId?: number;
}
