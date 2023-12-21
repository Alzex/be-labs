import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { FindRecordArgs } from './args/find-record.args';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserMeta } from '../auth/decorators/user-meta.decorator';
import { UserMetadata } from '../auth/types/user-metadata.type';

@Controller('record')
@UseGuards(AuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  createRecord(@Body() dto: CreateRecordDto, @UserMeta() meta: UserMetadata) {
    return this.recordService.createFromDto(dto, meta);
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
