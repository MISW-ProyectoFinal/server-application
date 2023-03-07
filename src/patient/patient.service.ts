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
import { Doctor } from './../doctor/entities/doctor.entity';

const saltRounds = 10;
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
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

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id: id },
    });

    if (!patient) {
      throw new BusinessLogicException(
        'No se logra encontrar al paciente en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return patient;
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

  async clinicalHistory(patientId: string, doctorId: string): Promise<Patient> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new BusinessLogicException(
        'No tiene autorización de visualizar el historial',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
      relations: [
        'allergies',
        'illnesses',
        'country',
        'city',
        'document_type',
        'injuries',
        'injuries.photos',
        'injuries.automatic_cases',
        'injuries.cases',
        'injuries.cases.treatments',
        'injuries.cases.treatments.treatment_progresses',
        'injuries.cases.treatments.treatment_progresses.treatment_progress_photos',
      ],
    });

    if (!patient) {
      throw new BusinessLogicException(
        'El paciente consultado no se encuentra en el sistema',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (patient.injuries.length == 0) {
        throw new BusinessLogicException(
          'El paciente consultado no puede ser consultado debido a que no ha registrado lesiones',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    return patient;
  }
}
