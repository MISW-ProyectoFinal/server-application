import { Injectable } from '@nestjs/common';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';

@Injectable()
export class IllnessService {
  create(createIllnessDto: CreateIllnessDto) {
    return 'This action adds a new illness';
  }

  findAll() {
    return `This action returns all illness`;
  }

  findOne(id: number) {
    return `This action returns a #${id} illness`;
  }

  update(id: number, updateIllnessDto: UpdateIllnessDto) {
    return `This action updates a #${id} illness`;
  }

  remove(id: number) {
    return `This action removes a #${id} illness`;
  }
}
