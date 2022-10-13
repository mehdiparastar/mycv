import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  development: {
    type: 'sqlite',
    database: 'devDB.sqlite',
    entities: [User, Report],
    synchronize: false,
    migrations: ['src/migration_dev/*.js'],
  } as DataSourceOptions,
  test: {
    type: 'sqlite',
    database: 'testDB.sqlite',
    entities: [User, Report],
    synchronize: false,
    migrations: ['src/migration_dev/*.js'], // Because the DB type at both the `test` and `dev` environments were equal, we used the same directory for migration.
    migrationsRun: true,
  } as DataSourceOptions,
  production: {
    // ****** -if you want to have production on docker use this configs.
    // ****** -docker command to create postgres on local docker: `docker run --name postgres -d --rm -e POSTGRES_USER=root -e POSTGRES_PASSWORD=mehdi -p 5432:5432 postgres -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key`
    
    // type: 'postgres',
    // host: 'localhost',
    // port: 5432,
    // migrations: ['src/migration_prod/*.js'],
    // migrationsRun: true,
    // entities: [User, Report],
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    // username: 'root',
    // password: 'mehdi',

    // ****** -for deploying on heroku use this configs.
    // ****** -We are going to use the Heroku CLI to deploy our application.
    // ****** -Please follow the instructions here https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up to set up the Heroku CLI on your machine.
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: ['src/migration_prod/*.js'],
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
