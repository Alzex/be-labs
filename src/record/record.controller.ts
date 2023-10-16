import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { Record } from './models/record.model';
import { CreateRecordDto } from './dto/create-record.dto';
import { FindRecordArgs } from './args/find-record.args';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  createRecord(@Body() dto: CreateRecordDto): Record {
    return this.recordService.createOne(dto);
  }

  @Get(':id')
  getRecord(@Param('id') id: number): Record {
    return this.recordService.findOneByIdOrFail(id);
  }

  @Get()
  getRecords(@Query() args: FindRecordArgs): Record[] {
    return this.recordService.findMany(args);
  }

  @Delete(':id')
  deleteRecord(@Param('id') id: number): Record {
    return this.recordService.deleteOneById(id);
  }
}
