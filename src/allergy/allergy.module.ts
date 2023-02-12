import { Module } from '@nestjs/common';
import { AllergyService } from './allergy.service';
import { AllergyController } from './allergy.controller';
import { Allergy } from './entities/allergy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AllergyController],
  providers: [AllergyService],
  imports: [TypeOrmModule.forFeature([Allergy])],
})
export class AllergyModule {}
