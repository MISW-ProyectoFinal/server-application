import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UpdateInjuryDto } from './dto/update-injury.dto';
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
      relations: ['cases'],
    });

    if (!injury) {
      throw new BusinessLogicException(
        'No se logra encontrar la lesión en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return injury;
  }

  async findAll(patientId: string) {
    return await this.injuryRepository.find({
      where: {
        patient: { id: patientId },
      },
    });
  }
}
