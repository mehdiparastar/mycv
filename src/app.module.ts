import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { APP_PIPE } from '@nestjs/core/constants';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm/data-source/DataSource';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    // TypeOrmModule.forRootAsync({
    //   name: 'default',
    //   useFactory: async (config: ConfigService) => {
    //     const db_name = config.get<string>('DB_NAME');
    //     return {
    //       type: 'sqlite',
    //       database: db_name,
    //       synchronize: true,
    //       entities: [User, Report],
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot(),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
