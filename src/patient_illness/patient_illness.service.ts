import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Illness } from '../illness/entities/illness.entity';
import { Patient } from '../patient/entities/patient.entity';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';
import { Repository, In } from 'typeorm';
import { UpdatePatientIllnessDto } from './dto/update-patient_illness.dto';

@Injectable()
export class PatientIllnessService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Illness)
    private readonly illnessRepository: Repository<Illness>,
  ) {}

  async create(patientId: string, illnessId: string[]) {
    const patient = await this.patientRepository.findOne({
      where: { id: `${patientId}` },
    });

    if (!patient) {
      throw new BusinessLogicException(
        'patient not found',
        BusinessError.NOT_FOUND,
      );
    }

    const illnesses = await this.illnessRepository.findBy({
      id: In(illnessId),
    });

    if (!illnesses) {
      throw new BusinessLogicException(
        'illnesses not fund',
        BusinessError.NOT_FOUND,
      );
    }

    patient.illnesses = illnesses;
    await this.patientRepository.save(patient);
    return true;
  }

  findAll() {
    return `This action returns all patientIllness`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientIllness`;
  }

  update(id: number, updatePatientIllnessDto: UpdatePatientIllnessDto) {
    return `This action updates a #${id} patientIllness`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientIllness`;
  }
}
