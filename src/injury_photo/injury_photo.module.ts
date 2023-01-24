import { Module } from '@nestjs/common';
import { InjuryPhotoService } from './injury_photo.service';
import { InjuryPhotoController } from './injury_photo.controller';

@Module({
  controllers: [InjuryPhotoController],
  providers: [InjuryPhotoService]
})
export class InjuryPhotoModule {}
