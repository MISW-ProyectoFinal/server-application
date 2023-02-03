import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorSpecialtyDto } from './dto/create-doctor_specialty.dto';
import { UpdateDoctorSpecialtyDto } from './dto/update-doctor_specialty.dto';
import { DoctorSpecialty } from './entities/doctor_specialty.entity';

@Injectable()
export class DoctorSpecialtyService {
  constructor(
    @InjectRepository(DoctorSpecialty)
    private readonly doctorSpecialtyRepository: Repository<DoctorSpecialty>,
  ) {}

  async create(
    createDoctorSpecialtyDto: DoctorSpecialty,
  ): Promise<DoctorSpecialty> {
    return await this.doctorSpecialtyRepository.save(createDoctorSpecialtyDto);
  }

  findAll() {
    return `This action returns all specialtyDoctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialtyDoctor`;
  }

  update(id: number, updateDoctorSpecialtyDto: UpdateDoctorSpecialtyDto) {
    return `This action updates a #${id} specialtyDoctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialtyDoctor`;
  }
}
