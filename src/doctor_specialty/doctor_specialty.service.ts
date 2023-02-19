import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/entities/doctor.entity';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';
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
    const emission_date = new Date(createDoctorSpecialtyDto.emission_date);
    if (new Date().getTime() < emission_date.getTime()) {
      throw new BusinessLogicException(
        'emission_date > today',
        BusinessError.UNPROCESSABLE_ENTITY,
      );
    } else {
      return await this.doctorSpecialtyRepository.save(
        createDoctorSpecialtyDto,
      );
    }
  }

  async findAll(doctor: Doctor): Promise<DoctorSpecialty[]> {
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

  async findOne(id: string): Promise<DoctorSpecialty> {
    const doctorSpecialty = await this.doctorSpecialtyRepository.findOne({
      where: { id },
    });
    if (!doctorSpecialty) {
      throw new BusinessLogicException('not found', BusinessError.NOT_FOUND);
    }

    return doctorSpecialty;
  }

  async update(
    id: string,
    updateDoctorSpecialtyDto: DoctorSpecialty,
  ): Promise<DoctorSpecialty> {
    const doctorSpecialty = await this.doctorSpecialtyRepository.findOne({
      where: { id: id },
    });
    if (!doctorSpecialty) {
      throw new BusinessLogicException(
        'Especialidad no encontrada',
        BusinessError.NOT_FOUND,
      );
    }

    return await this.doctorSpecialtyRepository.save({
      ...doctorSpecialty,
      ...updateDoctorSpecialtyDto,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} specialtyDoctor`;
  // }
}
