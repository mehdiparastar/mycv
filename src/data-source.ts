import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database:
    process.env.NODE_ENV === 'development'
      ? 'devDB.sqlite'
      : process.env.NODE_ENV === 'test'
      ? 'testDB.sqlite'
      : 'unknown.sqlite',
  entities: [User, Report],
  synchronize: false,
  migrations: ['dist/migration/*.js'],
  migrationsRun: process.env.NODE_ENV === 'test' ? true : false,
  // migrations: ['src/migration/*.ts'],
  // cli: {
  //   migrationsDir: 'migrations',
  // },
});
