import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateReportDto {
  @IsBoolean()
  @IsOptional()
  approved?: boolean;
}
