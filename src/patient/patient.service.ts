import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { from, lastValueFrom, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

const saltRounds = 10;
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: Patient): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { email: createPatientDto.email },
    });
    if (!patient) {
      createPatientDto.password = await lastValueFrom(
        this.hashPassword(createPatientDto.password),
      );

      return await this.patientRepository.save(createPatientDto);
    } else {
      throw new BusinessLogicException(
        'email registered',
        BusinessError.PRECONDITION_FAILED,
      );
    }
  }

  private hashPassword(password: string): Observable<string> {
    return from<Promise<string>>(bcrypt.hash(password, saltRounds));
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  async update(id: string, updatePatientDto: Patient): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id: id },
    });
    if (!patient) {
      throw new BusinessLogicException(
        'Paciente no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    if (updatePatientDto.password !== undefined) {
      updatePatientDto.password = await lastValueFrom(
        this.hashPassword(updatePatientDto.password),
      );
    }

    return await this.patientRepository.save({
      ...patient,
      ...updatePatientDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }

  async findByEmail(email: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { email: email },
    });
    if (!patient) {
      throw new BusinessLogicException(
        'El paciente que esta buscando no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return patient;
  }
}
