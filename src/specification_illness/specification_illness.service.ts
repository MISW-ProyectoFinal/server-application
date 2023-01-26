import { Injectable } from '@nestjs/common';
import { CreateSpecificationIllnessDto } from './dto/create-specification_illness.dto';
import { UpdateSpecificationIllnessDto } from './dto/update-specification_illness.dto';

@Injectable()
export class SpecificationIllnessService {
  create(createSpecificationIllnessDto: CreateSpecificationIllnessDto) {
    return 'This action adds a new specificationIllness';
  }

  findAll() {
    return `This action returns all specificationIllness`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specificationIllness`;
  }

  update(
    id: number,
    updateSpecificationIllnessDto: UpdateSpecificationIllnessDto,
  ) {
    return `This action updates a #${id} specificationIllness`;
  }

  remove(id: number) {
    return `This action removes a #${id} specificationIllness`;
  }
}
