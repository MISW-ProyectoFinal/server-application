import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseStatus } from './../case_status/case_status.enum';
import { Injury } from './../injury/entities/injury.entity';
import { Patient } from './../patient/entities/patient.entity';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AutomaticCase } from './entities/automatic_case.entity';

@Injectable()
export class AutomaticCaseService {
  constructor(
    @InjectRepository(AutomaticCase)
    private readonly automaticCaseRepository: Repository<AutomaticCase>,
  ) {}

  async create(
    createAutomaticCase: AutomaticCase,
    injury: Injury,
    patient: Patient,
  ) {
    if (injury.cases.length > 0) {
      throw new BusinessLogicException(
        'La lesión ya está asignada a un caso por especialista',
        BusinessError.NOT_FOUND,
      );
    }
    createAutomaticCase.injury = injury;
    return await this.automaticCaseRepository.save(createAutomaticCase);
  }

  async findAll(statusName: string): Promise<AutomaticCase[]> {
    if (statusName == 'Pendiente') {
      return await this.automaticCaseRepository.find({
        where: { case_status: CaseStatus.PENDIENTE },
      });
    } else {
      const statusEnum =
        statusName == 'En proceso' ? CaseStatus.EN_PROCESO : CaseStatus.CERRADO;
      return await this.automaticCaseRepository.find({
        where: { case_status: statusEnum },
      });
    }
  }

  async findOne(id: string) {
    const automaticCase = await this.automaticCaseRepository.findOne({
      where: { id: id },
    });

    if (!automaticCase) {
      throw new BusinessLogicException(
        'No se logra encontrar el caso en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return automaticCase;
  }
}
