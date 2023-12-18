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
import { CreateRecordDto } from './dto/create-record.dto';
import { FindRecordArgs } from './args/find-record.args';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  createRecord(@Body() dto: CreateRecordDto) {
    return this.recordService.createFromDto(dto);
  }

  @Get(':id')
  getRecord(@Param('id') id: number) {
    return this.recordService.findOneByIdOrFail(id);
  }

  @Get()
  getRecords(@Query() args: FindRecordArgs) {
    return this.recordService.findManyArgs(args);
  }

  @Delete(':id')
  deleteRecord(@Param('id') id: number) {
    return this.recordService.deleteOneById(id);
  }
}
