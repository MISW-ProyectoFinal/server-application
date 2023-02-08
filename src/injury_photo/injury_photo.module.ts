import { Module } from '@nestjs/common';
import { InjuryPhotoService } from './injury_photo.service';

@Module({
  providers: [InjuryPhotoService],
})
export class InjuryPhotoModule {}
