import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [UsersModule, CityModule, CountryModule, DoctorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
