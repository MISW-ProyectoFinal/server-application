import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { Illness } from './entities/illness.entity';

@Injectable()
export class IllnessService {

  constructor(
    @InjectRepository(Illness)
    private readonly illnessRepository: Repository<Illness>,
  ) {}

  create(createIllnessDto: CreateIllnessDto) {
    return 'This action adds a new illness';
  }

  async findAll() {
    return await this.illnessRepository.find();
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
