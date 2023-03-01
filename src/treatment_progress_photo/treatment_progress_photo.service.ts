import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentProgress } from './../treatment_progress/entities/treatment_progress.entity';
import { Repository } from 'typeorm';
import { TreatmentProgressPhoto } from './entities/treatment_progress_photo.entity';

@Injectable()
export class TreatmentProgressPhotoService {
  constructor(
    @InjectRepository(TreatmentProgressPhoto)
    private readonly treatmentProgressPhotoRepository: Repository<TreatmentProgressPhoto>,
  ) {}

  async create(
    treatmentProgress: TreatmentProgress,
    createTreatmentProgressPhotoToCreate: TreatmentProgressPhoto,
  ) {
    createTreatmentProgressPhotoToCreate.treatment_progress = treatmentProgress;
    return this.treatmentProgressPhotoRepository.save(
      createTreatmentProgressPhotoToCreate,
    );
  }
}
