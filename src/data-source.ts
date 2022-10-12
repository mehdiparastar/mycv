import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  development: {
    type: 'sqlite',
    database: 'devDB.sqlite',
    entities: [User, Report],
    synchronize: false,
    migrations: ['dist/migration/*.js'],
  } as DataSourceOptions,
  test: {
    type: 'sqlite',
    database: 'testDB.sqlite',
    entities: [User, Report],
    synchronize: false,
    migrations: ['dist/migration/*.js'],
    migrationsRun: true,
  } as DataSourceOptions,
  production: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrationsRun: true,
    entities: [User, Report],
    ssl: {
      rejectUnauthorized: false,
    },
  } as DataSourceOptions,
};

export const AppDataSource = new DataSource(
  dbConfig[`${process.env.NODE_ENV}`],
);
