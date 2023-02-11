import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { Allergy } from './entities/allergy.entity';

@Injectable()
export class AllergyService {

  constructor(
    @InjectRepository(Allergy)
    private readonly allergyRepository: Repository<Allergy>,
  ) {}

  create(createAllergyDto: CreateAllergyDto) {
    return 'This action adds a new allergy';
  }

  async findAll() {
    return await this.allergyRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} allergy`;
  }

  update(id: number, updateAllergyDto: UpdateAllergyDto) {
    return `This action updates a #${id} allergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} allergy`;
  }
}
