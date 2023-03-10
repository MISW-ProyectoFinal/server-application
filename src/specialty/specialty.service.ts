import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    return await this.specialtyRepository.save(createSpecialtyDto);
  }

  async findAll() {
    return await this.specialtyRepository.find();
  }
}
