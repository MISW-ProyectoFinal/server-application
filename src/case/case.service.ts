import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injury } from './../injury/entities/injury.entity';
import { Repository } from 'typeorm';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case } from './entities/case.entity';
import { CaseStatus } from './../case_status/case_status.enum';
import { Patient } from './../patient/entities/patient.entity';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { Doctor } from './../doctor/entities/doctor.entity';
import { doc } from 'prettier';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}

  async create(
    createCase: Case,
    injury: Injury,
    patient: Patient,
  ): Promise<Case> {
    // if (!injury || (injury && patient.injuries.includes(injury))) {
    //   throw new BusinessLogicException(
    //     'El paciente no tiene permisos para solicitar caso de esta lesión',
    //     BusinessError.NOT_FOUND,
    //   );
    // }
    createCase.injury = injury;
    return await this.caseRepository.save(createCase);
  }

  async findAll(doctorId: string, statusName: string): Promise<Case[]> {

    const doctor = await this.doctorRepository.findOne({
      where: { id: `${doctorId}` },
    });

    if (statusName == 'pending') {
      return await this.caseRepository.find({
        where: { case_status: CaseStatus.PENDIENTE },
        relations: ['injury'],
      });
    } else {
      if (!doctor) {
        throw new BusinessLogicException(
          'El doctor no pudo ser encontrado',
          BusinessError.NOT_FOUND,
        );
      }

      return await this.caseRepository.find({
        where: { doctor: { id: doctor.id } },
        relations: ['injury'],
      });
    }
  }

  async findOne(id: string) {
    const caseInstance = await this.caseRepository.findOne({
      where: { id: id },
      relations: ['injury'],
    });

    if (!caseInstance) {
      throw new BusinessLogicException(
        'No se logra encontrar el caso en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return caseInstance;
  }

  update(id: number, updateCaseDto: UpdateCaseDto) {
    return `This action updates a #${id} case`;
  }

  async assignCase(id: string, caseData: Case, doctorId: string): Promise<Case> {

    const doctor = await this.doctorRepository.findOne({
      where: { id: `${doctorId}` },
    });

    if (!doctor) {
      throw new BusinessLogicException(
        'Doctor no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const caseToUpdate = await this.caseRepository.findOne({
      where: { id: id },
      relations: ['doctor'],
    });

    if (!caseToUpdate) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (caseToUpdate.doctor) {
        throw new BusinessLogicException(
          'El caso ya tiene asignado un doctor',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    return await this.caseRepository.save({
      ...caseToUpdate,
      ...caseData,
    });
  }
}
