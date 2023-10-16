import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [UserModule, CategoryModule, RecordModule],
  controllers: [AppController],
})
export class AppModule {}
