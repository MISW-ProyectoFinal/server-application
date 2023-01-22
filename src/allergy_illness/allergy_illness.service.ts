import { Injectable } from '@nestjs/common';
import { CreateAllergyIllnessDto } from './dto/create-allergy_illness.dto';
import { UpdateAllergyIllnessDto } from './dto/update-allergy_illness.dto';

@Injectable()
export class AllergyIllnessService {
  create(createAllergyIllnessDto: CreateAllergyIllnessDto) {
    return 'This action adds a new allergyIllness';
  }

  findAll() {
    return `This action returns all allergyIllness`;
  }

  findOne(id: number) {
    return `This action returns a #${id} allergyIllness`;
  }

  update(id: number, updateAllergyIllnessDto: UpdateAllergyIllnessDto) {
    return `This action updates a #${id} allergyIllness`;
  }

  remove(id: number) {
    return `This action removes a #${id} allergyIllness`;
  }
}
