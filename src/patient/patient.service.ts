import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, lastValueFrom, Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import * as bcrypt from 'bcrypt';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';

const saltRounds = 10;
@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPatientDto: Patient): Promise<Patient>{

    const patient = await this.patientRepository.findOne({
      where: { email: createPatientDto.email },
    });
    if (!patient) {
    createPatientDto.password = await lastValueFrom(
      this.hashPassword(createPatientDto.password),
    );

    
    return await this.patientRepository.save(createPatientDto);
    }else{
      throw new BusinessLogicException(
        'email registered',
        BusinessError.PRECONDITION_FAILED,
      );
    }
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }

  private hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, saltRounds));
  }

  async findByEmail(email: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { email: email },
    });
    if (!patient) {
      throw new BusinessLogicException(
        'El patient que esta buscando no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return patient;
  }
}
