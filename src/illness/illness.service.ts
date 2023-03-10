import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { Illness } from './entities/illness.entity';

@Injectable()
export class IllnessService {
  constructor(
    @InjectRepository(Illness)
    private readonly illnessRepository: Repository<Illness>,
  ) {}

  async create(createIllnessDto: CreateIllnessDto) {
    return await this.illnessRepository.save(createIllnessDto);
  }

  async findAll() {
    return await this.illnessRepository.find();
  }
}
