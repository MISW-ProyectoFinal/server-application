import { Injectable } from '@nestjs/common';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { from, lastValueFrom, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import {
  BusinessLogicException,
  BusinessError,
} from 'src/shared/errors/business-errors';

const saltRounds = 10;
@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(doctorCreated: Doctor): Promise<Doctor> {
    doctorCreated.password = await lastValueFrom(
      this.hashPassword(doctorCreated.password),
    );

    return await this.doctorRepository.save(doctorCreated);
  }

  private hashPassword(password: string): Observable<string> {
    return from<Promise<string>>(bcrypt.hash(password, saltRounds));
  }

  findAll() {
    return `This action returns all doctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} ${updateDoctorDto.name} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
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
