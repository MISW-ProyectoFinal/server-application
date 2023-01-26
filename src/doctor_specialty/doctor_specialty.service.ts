import { Injectable } from '@nestjs/common';
import { CreateDoctorSpecialtyDto } from './dto/create-doctor_specialty.dto';
import { UpdateDoctorSpecialtyDto } from './dto/update-doctor_specialty.dto';

@Injectable()
export class DoctorSpecialtyService {
  create(createDoctorSpecialtyDto: CreateDoctorSpecialtyDto) {
    return 'This action adds a new specialtyDoctor';
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
