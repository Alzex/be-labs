import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import process from 'process';

config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: true,
  // extra: {
  //   ssl: {
  //     enabled: process.env.NODE_ENV === 'prod',
  //   }
  // }
});
