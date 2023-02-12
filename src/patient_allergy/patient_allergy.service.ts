import { All, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Allergy } from '../allergy/entities/allergy.entity';
import { Patient } from '../patient/entities/patient.entity';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';
import { Repository, In } from 'typeorm';
import { UpdatePatientAllergyDto } from './dto/update-patient_allergy.dto';

@Injectable()
export class PatientAllergyService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Allergy)
    private readonly allergyRepository: Repository<Allergy>,
  ) {}

  async create(patientId: string, allergyId: string[]) {
    const patient = await this.patientRepository.findOne({
      where: { id: `${patientId}` },
      relations: ['allergies'],
    });

    if (!patient) {
      throw new BusinessLogicException(
        'patient not found',
        BusinessError.NOT_FOUND,
      );
    }

    const allergy = await this.allergyRepository.findBy({
      id: In(allergyId),
    });

    if (!allergy) {
      throw new BusinessLogicException(
        'alergies not fund',
        BusinessError.NOT_FOUND,
      );
    }

    patient.allergies = allergy;
    await this.patientRepository.save(patient);
    return true;
  }

  findAll() {
    return `This action returns all patientAllergy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientAllergy`;
  }

  update(id: number, updatePatientAllergyDto: UpdatePatientAllergyDto) {
    return `This action updates a #${id} patientAllergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientAllergy`;
  }
}
