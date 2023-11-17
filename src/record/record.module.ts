import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';

@Module({
  imports: [UserModule, CategoryModule, TypeOrmModule.forFeature([Record])],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
