import { Record } from './entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordDto } from './dto/record.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindRecordArgs } from './args/find-record.args';
import { UserService } from '../user/user.service';
import { BasicCrudService } from '../common/basic-crud.service';

@Injectable()
export class RecordService extends BasicCrudService<Record> {
  constructor(
    @InjectRepository(Record)
    protected readonly recordRepository: Repository<Record>,
    private readonly userService: UserService,
  ) {
    super(recordRepository);
  }
  async findOneByIdOrFail(id: number): Promise<RecordDto> {
    const result = await this.findOne(
      {
        id,
      },
      {
        user: true,
        category: true,
      },
    );

    if (!result) {
      throw new NotFoundException('Record not found');
    }

    return RecordDto.fromEntity(result);
  }

  async createFromDto(data: CreateRecordDto): Promise<RecordDto> {
    const record = this.recordRepository.create(data);

    const user = await this.userService.findOne(
      {
        id: data.userId,
      },
      {
        defaultCurrency: true,
      },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!data.currencyId) {
      record.currencyId = user.defaultCurrency.id;

      if (!record.currencyId) {
        throw new BadRequestException(
          'currencyId is required or set default currency',
        );
      }
    }

    await this.createOne(record);

    return RecordDto.fromEntity(record);
  }

  async findManyArgs(args: FindRecordArgs): Promise<RecordDto[]> {
    const records = await this.findMany(args, {
      user: true,
      category: true,
    });

    return records.map((record) => RecordDto.fromEntity(record));
  }

  async deleteOneById(id: number): Promise<RecordDto> {
    const record = await this.deleteOne({
      id,
    });

    return RecordDto.fromEntity(record);
  }
}
