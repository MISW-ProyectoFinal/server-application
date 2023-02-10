import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjuryPhoto } from './entities/injury_photo.entity';
import { InjuryPhotoService } from './injury_photo.service';

@Module({
  providers: [InjuryPhotoService],
  imports: [TypeOrmModule.forFeature([InjuryPhoto])],
})
export class InjuryPhotoModule {}
