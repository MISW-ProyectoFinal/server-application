import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import {
  BusinessLogicException,
  BusinessError,
} from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CreateDoctorSpecialtyDto } from './dto/create-doctor_specialty.dto';
import { UpdateDoctorSpecialtyDto } from './dto/update-doctor_specialty.dto';
import { DoctorSpecialty } from './entities/doctor_specialty.entity';

@Injectable()
export class DoctorSpecialtyService {
  constructor(
    @InjectRepository(DoctorSpecialty)
    private readonly doctorSpecialtyRepository: Repository<DoctorSpecialty>,
    private readonly doctorService: DoctorService,
  ) {}

  async create(
    createDoctorSpecialtyDto: DoctorSpecialty,
  ): Promise<DoctorSpecialty> {
    return await this.doctorSpecialtyRepository.save(createDoctorSpecialtyDto);
  }

  async findAll(idDoctor): Promise<DoctorSpecialty[]> {
    const doctor: Doctor = await this.doctorService.findOne(idDoctor);
    const specialties = await this.doctorSpecialtyRepository.find({
      where: { doctor: doctor },
      relations: ['specialty'],
    });

    if (!specialties) {
      throw new BusinessLogicException(
        'El doctor no tiene especialidades',
        BusinessError.NOT_FOUND,
      );
    }
    return specialties;
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
