import { Record } from './entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordDto } from './dto/record.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindRecordArgs } from './args/find-record.args';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}
  async findOneByIdOrFail(id: number): Promise<RecordDto> {
    const result = await this.recordRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'category'],
    });

    if (!result) {
      throw new NotFoundException('Record not found');
    }

    return RecordDto.fromEntity(result);
  }

  async createOne(data: CreateRecordDto): Promise<RecordDto> {
    const record = this.recordRepository.create(data);

    await this.recordRepository.save(record);

    return RecordDto.fromEntity(record);
  }

  async findMany(args: FindRecordArgs): Promise<RecordDto[]> {
    const records = await this.recordRepository.find({
      where: {
        userId: args.userId,
        categoryId: args.categoryId,
      },
      relations: ['user', 'category'],
    });

    return records.map((record) => RecordDto.fromEntity(record));
  }

  async deleteOneById(id: number): Promise<RecordDto> {
    const record = await this.recordRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'category'],
    });

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    await this.recordRepository.remove(record);

    return RecordDto.fromEntity(record);
  }
}
