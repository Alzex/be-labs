import { BadRequestException, Injectable } from '@nestjs/common';
import { LocalCrudService } from '../common/local-crud.service';
import { Record } from './models/record.model';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class RecordService extends LocalCrudService<Record> {
  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {
    super(Record);
  }

  createOne(data: CreateRecordDto): Record {
    // Check if the user and category exist
    this.userService.findOneByIdOrFail(data.userId);
    this.categoryService.findOneByIdOrFail(data.categoryId);

    data.createdAt = new Date();

    return super.createOne(data);
  }
}
