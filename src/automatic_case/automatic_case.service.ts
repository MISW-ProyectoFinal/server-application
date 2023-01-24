import { Injectable } from '@nestjs/common';
import { CreateAutomaticCaseDto } from './dto/create-automatic_case.dto';
import { UpdateAutomaticCaseDto } from './dto/update-automatic_case.dto';

@Injectable()
export class AutomaticCaseService {
  create(createAutomaticCaseDto: CreateAutomaticCaseDto) {
    return 'This action adds a new automaticCase';
  }

  findAll() {
    return `This action returns all automaticCase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} automaticCase`;
  }

  update(id: number, updateAutomaticCaseDto: UpdateAutomaticCaseDto) {
    return `This action updates a #${id} automaticCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} automaticCase`;
  }
}
