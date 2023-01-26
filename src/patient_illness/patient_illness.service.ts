import { Injectable } from '@nestjs/common';
import { CreatePatientIllnessDto } from './dto/create-patient_illness.dto';
import { UpdatePatientIllnessDto } from './dto/update-patient_illness.dto';

@Injectable()
export class PatientIllnessService {
  create(createPatientIllnessDto: CreatePatientIllnessDto) {
    return 'This action adds a new patientIllness';
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
