import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { Specialty } from './entities/specialty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
  imports: [TypeOrmModule.forFeature([Specialty])],
})
export class SpecialtyModule {}
