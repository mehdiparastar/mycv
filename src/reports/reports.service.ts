import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('report not found');
    }
    return this.repo.findOneBy({ id });
  }

  async update(id: number, attrs: Partial<Report>) {
    const report = await this.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }
    Object.assign(report, attrs);
    return this.repo.save(report);
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }
    return this.repo.remove(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report: Report = await this.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }
}
