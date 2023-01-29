import { Injectable } from '@nestjs/common';
import { CreateTreatmentProgressPhotoDto } from './dto/create-treatment_progress_photo.dto';
import { UpdateTreatmentProgressPhotoDto } from './dto/update-treatment_progress_photo.dto';

@Injectable()
export class TreatmentProgressPhotoService {
  create(createTreatmentProgressPhotoDto: CreateTreatmentProgressPhotoDto) {
    return 'This action adds a new treatmentProgressPhoto';
  }

  findAll() {
    return `This action returns all treatmentProgressPhoto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} treatmentProgressPhoto`;
  }

  update(
    id: number,
    updateTreatmentProgressPhotoDto: UpdateTreatmentProgressPhotoDto,
  ) {
    return `This action updates a #${id} treatmentProgressPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} treatmentProgressPhoto`;
  }
}
