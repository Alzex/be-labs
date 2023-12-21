import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as envConfig } from 'dotenv';
import * as process from 'process';

envConfig();

export const config = {
  db: {
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',
    synchronize: true,
    extra: {
      ssl: {
        enabled: process.env.NODE_ENV === 'prod',
      },
    },
  } as TypeOrmModuleOptions,

  jwtSecret: process.env.JWT_SECRET,
};
