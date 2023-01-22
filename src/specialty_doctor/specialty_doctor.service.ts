import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDoctorDto } from './dto/create-specialty_doctor.dto';
import { UpdateSpecialtyDoctorDto } from './dto/update-specialty_doctor.dto';

@Injectable()
export class SpecialtyDoctorService {
  create(createSpecialtyDoctorDto: CreateSpecialtyDoctorDto) {
    return 'This action adds a new specialtyDoctor';
  }

  findAll() {
    return `This action returns all specialtyDoctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialtyDoctor`;
  }

  update(id: number, updateSpecialtyDoctorDto: UpdateSpecialtyDoctorDto) {
    return `This action updates a #${id} specialtyDoctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialtyDoctor`;
  }
}
