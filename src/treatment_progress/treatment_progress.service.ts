import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseStatus } from './../case_status/case_status.enum';
import { Doctor } from './../doctor/entities/doctor.entity';
import { Patient } from './../patient/entities/patient.entity';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { Treatment } from './../treatment/entities/treatment.entity';
import { Repository } from 'typeorm';
import { TreatmentProgress } from './entities/treatment_progress.entity';

@Injectable()
export class TreatmentProgressService {
  constructor(
    @InjectRepository(Treatment)
    private readonly treatmentRepository: Repository<Treatment>,

    @InjectRepository(TreatmentProgress)
    private readonly treatmentProgressRepository: Repository<TreatmentProgress>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(
    treatmentProgressToCreate: TreatmentProgress,
    treatmentId: string,
    patientId: string,
  ): Promise<TreatmentProgress> {
    const patient = await this.patientRepository.findOne({
      where: { id: `${patientId}` },
    });

    if (!patient) {
      throw new BusinessLogicException(
        'Paciente no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const treatment = await this.treatmentRepository.findOne({
      where: { id: treatmentId },
      relations: ['injury.patient', 'caso'],
    });

    if (!treatment) {
      throw new BusinessLogicException(
        'Tratamiento no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (
        treatment.injury.patient.id != patient.id ||
        treatment.caso.case_status != CaseStatus.EN_PROCESO
      ) {
        throw new BusinessLogicException(
          'No es posible agregar evolución al tratamiento',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    treatmentProgressToCreate.treatment = treatment;

    return await this.treatmentProgressRepository.save(
      treatmentProgressToCreate,
    );
  }

  async findOne(id: string) {
    const treatmentProgress = await this.treatmentProgressRepository.findOne({
      where: { id: id },
      relations: ['treatment', 'treatment_progress_photos'],
    });

    if (!treatmentProgress) {
      throw new BusinessLogicException(
        'No se encontró la evolución del tratamiento en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return treatmentProgress;
  }

  async findAll(treatmentId: string): Promise<TreatmentProgress[]> {
    const treatment = await this.treatmentRepository.findOne({
      where: { id: `${treatmentId}` },
    });

    if (!treatment) {
      throw new BusinessLogicException(
        'El tratamiento no pudo ser encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    return await this.treatmentProgressRepository.find({
      where: { treatment: { id: treatment.id } },
      relations: ['treatment_progress_photos'],
    });
  }
}
