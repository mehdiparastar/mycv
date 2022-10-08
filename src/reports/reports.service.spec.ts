import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';
import { Repository } from 'typeorm';

const reportArray: Report[] = [
  {
    id: 1,
    make: 'toyota',
    model: 'corolla',
    year: 1980,
    mileage: 100000,
    lng: 0,
    lat: 0,
    price: 500000,
  } as Report,
  {
    id: 2,
    make: 'toyota',
    model: 'camry',
    year: 2010,
    mileage: 50000,
    lng: 0,
    lat: 0,
    price: 250000,
  } as Report,
];

const oneReport = {
  id: 1,
  make: 'toyota',
  model: 'corolla',
  year: 1980,
  mileage: 100000,
  lng: 0,
  lat: 0,
  price: 500000,
} as Report;

describe('ReportService', () => {
  let service: ReportsService;
  let repository: Repository<Report>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: {
            find: jest.fn().mockResolvedValue(reportArray),
            findOneBy: jest.fn().mockResolvedValue(oneReport),
            save: jest.fn().mockResolvedValue(oneReport),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    repository = module.get<Repository<Report>>(getRepositoryToken(Report));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
