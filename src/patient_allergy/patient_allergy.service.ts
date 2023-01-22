import { Injectable } from '@nestjs/common';
import { CreatePatientAllergyDto } from './dto/create-patient_allergy.dto';
import { UpdatePatientAllergyDto } from './dto/update-patient_allergy.dto';

@Injectable()
export class PatientAllergyService {
  create(createPatientAllergyDto: CreatePatientAllergyDto) {
    return 'This action adds a new patientAllergy';
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
