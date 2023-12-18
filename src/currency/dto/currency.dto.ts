import { Currency } from '../entities/currency.entity';

export class CurrencyDto {
  id: number;
  name: string;

  static fromEntity(entity: Currency): CurrencyDto {
    const dto = new CurrencyDto();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
