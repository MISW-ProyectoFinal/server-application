import { Injectable } from '@nestjs/common';
import { CreateSpecificationAllergyDto } from './dto/create-specification_allergy.dto';
import { UpdateSpecificationAllergyDto } from './dto/update-specification_allergy.dto';

@Injectable()
export class SpecificationAllergyService {
  create(createSpecificationAllergyDto: CreateSpecificationAllergyDto) {
    return 'This action adds a new specificationAllergy';
  }

  findAll() {
    return `This action returns all specificationAllergy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specificationAllergy`;
  }

  update(
    id: number,
    updateSpecificationAllergyDto: UpdateSpecificationAllergyDto,
  ) {
    return `This action updates a #${id} specificationAllergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} specificationAllergy`;
  }
}
