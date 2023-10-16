import { Injectable } from '@nestjs/common';
import { LocalCrudService } from '../common/local-crud.service';
import { Record } from './models/record.model';

@Injectable()
export class RecordService extends LocalCrudService<Record> {
  constructor() {
    super(Record);
  }
}
