import { Test, TestingModule } from '@nestjs/testing';
import { Report } from './report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;
  let fakeReportsService: Partial<ReportsService>;

  beforeEach(async () => {
    fakeReportsService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          make: 'toyota',
          model: 'corolla',
          year: 1980,
          mileage: 100000,
          lng: 0,
          lat: 0,
          price: 500000,
        } as Report);
      },      
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [{
        provide: ReportsService,
        useValue: fakeReportsService,
      },],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
