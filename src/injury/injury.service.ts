import { Injectable } from '@nestjs/common';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';

@Injectable()
export class InjuryService {
  create(createInjuryDto: CreateInjuryDto) {
    return 'This action adds a new injury';
  }

  findAll() {
    return `This action returns all injury`;
  }

  findOne(id: number) {
    return `This action returns a #${id} injury`;
  }

  update(id: number, updateInjuryDto: UpdateInjuryDto) {
    return `This action updates a #${id} injury`;
  }

  remove(id: number) {
    return `This action removes a #${id} injury`;
  }
}
