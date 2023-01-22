import { Injectable } from '@nestjs/common';
import { CreateSymptomInjuryDto } from './dto/create-symptom_injury.dto';
import { UpdateSymptomInjuryDto } from './dto/update-symptom_injury.dto';

@Injectable()
export class SymptomInjuryService {
  create(createSymptomInjuryDto: CreateSymptomInjuryDto) {
    return 'This action adds a new symptomInjury';
  }

  findAll() {
    return `This action returns all symptomInjury`;
  }

  findOne(id: number) {
    return `This action returns a #${id} symptomInjury`;
  }

  update(id: number, updateSymptomInjuryDto: UpdateSymptomInjuryDto) {
    return `This action updates a #${id} symptomInjury`;
  }

  remove(id: number) {
    return `This action removes a #${id} symptomInjury`;
  }
}
