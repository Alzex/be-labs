import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { RecordModule } from './record/record.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.db),
    UserModule,
    CategoryModule,
    RecordModule,
    CurrencyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
