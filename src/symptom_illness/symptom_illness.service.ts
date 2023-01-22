import { Injectable } from '@nestjs/common';
import { CreateSymptomIllnessDto } from './dto/create-symptom_illness.dto';
import { UpdateSymptomIllnessDto } from './dto/update-symptom_illness.dto';

@Injectable()
export class SymptomIllnessService {
  create(createSymptomIllnessDto: CreateSymptomIllnessDto) {
    return 'This action adds a new symptomIllness';
  }

  findAll() {
    return `This action returns all symptomIllness`;
  }

  findOne(id: number) {
    return `This action returns a #${id} symptomIllness`;
  }

  update(id: number, updateSymptomIllnessDto: UpdateSymptomIllnessDto) {
    return `This action updates a #${id} symptomIllness`;
  }

  remove(id: number) {
    return `This action removes a #${id} symptomIllness`;
  }
}
