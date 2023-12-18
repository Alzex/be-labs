import { Injectable, NotFoundException } from '@nestjs/common';
import { Currency } from './entities/currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyDto } from './dto/currency.dto';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { BasicCrudService } from '../common/basic-crud.service';

@Injectable()
export class CurrencyService extends BasicCrudService<Currency> {
  constructor(
    @InjectRepository(Currency)
    protected readonly currencyRepository: Repository<Currency>,
  ) {
    super(currencyRepository);
  }
  async findOneByIdOrFail(id: number): Promise<CurrencyDto> {
    const result = await this.findOne({
      id,
    });

    if (!result) {
      throw new NotFoundException('currency not found');
    }

    return CurrencyDto.fromEntity(result);
  }

  async findAll(): Promise<CurrencyDto[]> {
    const currencies = await super.findAll();

    return currencies.map((currency) => CurrencyDto.fromEntity(currency));
  }

  async createOne(data: CreateCurrencyDto): Promise<CurrencyDto> {
    const currency = await super.createOne(data);

    return CurrencyDto.fromEntity(currency);
  }

  async deleteOneById(id: number): Promise<CurrencyDto> {
    const currency = await this.deleteOne({
      id,
    });

    return CurrencyDto.fromEntity(currency);
  }
}
