import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Injury } from './entities/injury.entity';

@Injectable()
export class InjuryService {
  constructor(
    @InjectRepository(Injury)
    private readonly injuryRepository: Repository<Injury>,
  ) {}

  async create(createInjury: Injury): Promise<Injury> {
    return await this.injuryRepository.save(createInjury);
  }

  async findOne(id: string) {
    const injury = await this.injuryRepository.findOne({
      where: { id: id },
      relations: [
        'photos',
        'automatic_cases',
        'cases',
        'cases.doctor',
        'cases.treatments',
        'cases.treatments.treatment_progresses',
        'cases.treatments.treatment_progresses.treatment_progress_photos',
      ],
    });

    if (!injury) {
      throw new BusinessLogicException(
        'No se logra encontrar al paciente en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return injury;
  }

  async findAll(patientId: string) {
    const injuries = await this.injuryRepository.find({
      where: {
        patient: { id: patientId },
      },
      relations: ['photos', 'cases', 'cases.doctor', 'automatic_cases'],
    });

    if (!injuries) {
      throw new BusinessLogicException(
        'No se logra encontrar al paciente en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return injuries;
  }
}
