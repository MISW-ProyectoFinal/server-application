import { Injectable } from '@nestjs/common';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { from, lastValueFrom, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

const saltRounds = 10;
@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(doctorCreated: Doctor): Promise<Doctor> {
    const doctorRegister = await this.doctorRepository.findOne({
      where: { email: doctorCreated.email },
    });

    if (!doctorRegister) {
      doctorCreated.password = await lastValueFrom(
        this.hashPassword(doctorCreated.password),
      );

      return await this.doctorRepository.save(doctorCreated);
    } else {
      throw new BusinessLogicException(
        'email exist',
        BusinessError.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private hashPassword(password: string): Observable<string> {
    return from<Promise<string>>(bcrypt.hash(password, saltRounds));
  }

  findAll() {
    return `This action returns all doctor`;
  }

  async findOne(id: string) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['country', 'city', 'virt_country', 'virt_city'],
    });
    if (!doctor) {
      throw new BusinessLogicException(
        'El doctor que esta buscando no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return doctor;
  }

  async update(id: string, updateDoctor: Doctor): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: id },
    });

    if (!doctor) {
      throw new BusinessLogicException(
        'Doctor no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    return await this.doctorRepository.save({
      ...doctor,
      ...updateDoctor,
    });
  }

  async findByEmail(email: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { email: email },
    });
    if (!doctor) {
      throw new BusinessLogicException(
        'El doctor que esta buscando no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return doctor;
  }
}
