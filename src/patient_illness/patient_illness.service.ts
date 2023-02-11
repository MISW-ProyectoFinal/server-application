import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Illness } from 'src/illness/entities/illness.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Repository,In } from 'typeorm';
import { CreatePatientIllnessDto } from './dto/create-patient_illness.dto';
import { UpdatePatientIllnessDto } from './dto/update-patient_illness.dto';

@Injectable()
export class PatientIllnessService {

  constructor(

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Illness)
    private readonly illnessRepository: Repository<Illness>,

  ){}

  async create(patientId:string, illnessId:string[]): Promise<Patient> {

    const patient = await this.patientRepository.findOne({
      where:{id:`${patientId}`}
    });

    const illnesses = await this.illnessRepository.findBy({
      id: In(illnessId),
    });

   
    patient.illnesses = [];
    patient.illnesses.concat(illnesses)

    
    return await this.patientRepository.save(patient)
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
