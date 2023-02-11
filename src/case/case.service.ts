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

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,
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

  async findAll(doctor: Doctor, statusName: string): Promise<Case[]> {
    if (statusName == 'Pendiente') {
      return await this.caseRepository.find({
        where: { case_status: CaseStatus.PENDIENTE },
      });
    } else {
      if (!doctor) {
        throw new BusinessLogicException(
          'El doctor no pudo ser encontrado',
          BusinessError.NOT_FOUND,
        );
      }

      return await this.caseRepository.find({
        where: { doctor: doctor },
      });
    }
  }

  async findOne(id: string) {
    const caseInstance = await this.caseRepository.findOne({
      where: { id: id },
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
}
