import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CityController],
  providers: [CityService],
  imports: [TypeOrmModule.forFeature([City])],
})
export class CityModule {}
