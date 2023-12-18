import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyDto } from './dto/currency.dto';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<CurrencyDto> {
    return this.currencyService.findOneByIdOrFail(id);
  }

  @Get()
  getCategories(): Promise<CurrencyDto[]> {
    return this.currencyService.findAll();
  }

  @Post()
  createCategory(@Body() data: CreateCurrencyDto): Promise<CurrencyDto> {
    return this.currencyService.createOne(data);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<CurrencyDto> {
    return this.currencyService.deleteOneById(id);
  }
}
