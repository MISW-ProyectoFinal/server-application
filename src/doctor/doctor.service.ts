import { Injectable } from '@nestjs/common';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { from, lastValueFrom, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

const saltRounds = 10;
@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(doctroCreated: Doctor): Promise<Doctor> {
    doctroCreated.password = await lastValueFrom(
      this.hashPassword(doctroCreated.password),
    );
    await this.userRepository.save(doctroCreated);
    return await this.doctorRepository.save(doctroCreated);
  }

  private hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, saltRounds));
  }

  findAll() {
    return `This action returns all doctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} ${updateDoctorDto.name} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
