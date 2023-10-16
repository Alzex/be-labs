import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [UserModule, CategoryModule],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
