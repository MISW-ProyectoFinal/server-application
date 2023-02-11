import { All, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Allergy } from 'src/allergy/entities/allergy.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Repository,In } from 'typeorm';
import { CreatePatientAllergyDto } from './dto/create-patient_allergy.dto';
import { UpdatePatientAllergyDto } from './dto/update-patient_allergy.dto';

@Injectable()
export class PatientAllergyService {


  constructor(

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Allergy)
    private readonly allergyRepository: Repository<Allergy>,

  ){}

  async create(patientId:string, allergyId:string[]): Promise<Patient> {

    const patient = await this.patientRepository.findOne({
      where:{id:`${patientId}`}
    });

    const allergy = await this.allergyRepository.findBy({
      id: In(allergyId)
    });

   
    //patient.allergies = [];
    //patient.allergies.concat(allergy)
    

    for(let arll in allergy){
      patient.allergies = [
        ...patient.allergies,
        allergy[arll],
      ];
    }
    return await this.patientRepository.save(patient)
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
