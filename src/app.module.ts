import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { RecordModule } from './record/record.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { CurrencyModule } from './currency/currency.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.db),
    JwtModule.register({
      secret: config.jwtSecret,
      global: true,
      signOptions: { expiresIn: '1h' },
    }),

    UserModule,
    CategoryModule,
    RecordModule,
    CurrencyModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
