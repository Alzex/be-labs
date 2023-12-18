import { Record } from '../entities/record.entity';

export class RecordDto {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  createdAt: Date;
  currencyId?: number;

  static fromEntity(entity: Record): RecordDto {
    const dto = new RecordDto();
    dto.id = entity.id;
    dto.userId = entity.userId;
    dto.categoryId = entity.categoryId;
    dto.amount = entity.amount;
    dto.createdAt = entity.createdAt;
    dto.currencyId = entity.currencyId;
    return dto;
  }
}
