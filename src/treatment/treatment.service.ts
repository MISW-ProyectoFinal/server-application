import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './../case/entities/case.entity';
import { CaseStatus } from './../case_status/case_status.enum';
import { Doctor } from './../doctor/entities/doctor.entity';
import { Patient } from './../patient/entities/patient.entity';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Treatment } from './entities/treatment.entity';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,

    @InjectRepository(Treatment)
    private readonly treatmentRepository: Repository<Treatment>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(
    treatmentToCreate: Treatment,
    caseId: string,
    doctorId: string,
  ): Promise<Treatment> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: `${doctorId}` },
    });

    if (!doctor) {
      throw new BusinessLogicException(
        'Doctor no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const treatmentCase = await this.caseRepository.findOne({
      where: { id: caseId },
      relations: ['doctor', 'injury'],
    });

    if (!treatmentCase) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (
        treatmentCase.doctor.id != doctor.id ||
        treatmentCase.case_status != CaseStatus.EN_PROCESO
      ) {
        throw new BusinessLogicException(
          'No tiene autorización de brindar tratamiento',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    treatmentToCreate.injury = treatmentCase.injury;
    treatmentToCreate.caso = treatmentCase;

    return await this.treatmentRepository.save(treatmentToCreate);
  }

  findAll() {
    return `This action returns all treatment`;
  }

  async findOne(id: string) {
    const treatment = await this.treatmentRepository.findOne({
      where: { id: id },
    });

    if (!treatment) {
      throw new BusinessLogicException(
        'No se encontró el tratamiento en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return treatment;
  }

  update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    return `This action updates a #${id} treatment`;
  }

  remove(id: number) {
    return `This action removes a #${id} treatment`;
  }
}
