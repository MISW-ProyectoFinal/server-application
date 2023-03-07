import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { Allergy } from './entities/allergy.entity';

@Injectable()
export class AllergyService {
  constructor(
    @InjectRepository(Allergy)
    private readonly allergyRepository: Repository<Allergy>,
  ) {}

  async create(createAllergyDto: CreateAllergyDto) {
    return await this.allergyRepository.save(createAllergyDto);
  }

  async findAll() {
    return await this.allergyRepository.find();
  }
}
