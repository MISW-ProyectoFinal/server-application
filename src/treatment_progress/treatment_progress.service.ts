import { Injectable } from '@nestjs/common';
import { CreateTreatmentProgressDto } from './dto/create-treatment_progress.dto';
import { UpdateTreatmentProgressDto } from './dto/update-treatment_progress.dto';

@Injectable()
export class TreatmentProgressService {
  create(createTreatmentProgressDto: CreateTreatmentProgressDto) {
    return 'This action adds a new treatmentProgress';
  }

  findAll() {
    return `This action returns all treatmentProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} treatmentProgress`;
  }

  update(id: number, updateTreatmentProgressDto: UpdateTreatmentProgressDto) {
    return `This action updates a #${id} treatmentProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} treatmentProgress`;
  }
}
