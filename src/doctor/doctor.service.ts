import { Injectable } from '@nestjs/common';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { from, lastValueFrom, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';
import { NotificationDto } from './../notification/dto/create-notification.dto';
import { NotificationService } from './../notification/notification.service';
import { UpdateNotificationDto } from './../notification/dto/update-notification.dto';

const saltRounds = 10;
@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(doctorCreated: Doctor): Promise<Doctor> {
    const doctorRegister = await this.doctorRepository.findOne({
      where: { email: doctorCreated.email },
    });

    if (!doctorRegister) {
      doctorCreated.password = await lastValueFrom(
        this.hashPassword(doctorCreated.password),
      );

      return await this.doctorRepository.save(doctorCreated);
    } else {
      throw new BusinessLogicException(
        'email exist',
        BusinessError.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private hashPassword(password: string): Observable<string> {
    return from<Promise<string>>(bcrypt.hash(password, saltRounds));
  }

  findAll() {
    return `This action returns all doctor`;
  }

  async findOne(id: string) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['country', 'city', 'virt_country', 'virt_city'],
    });
    if (!doctor) {
      throw new BusinessLogicException(
        'El doctor que esta buscando no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return doctor;
  }

  async update(id: string, updateDoctor: Doctor): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: id },
    });

    if (!doctor) {
      throw new BusinessLogicException(
        'Doctor no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    return await this.doctorRepository.save({
      ...doctor,
      ...updateDoctor,
    });
  }

  async findByEmail(email: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { email: email },
    });
    if (!doctor) {
      throw new BusinessLogicException(
        'El doctor que esta buscando no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return doctor;
  }

  async enablePush(
    doctorId: string,
    update_dto: NotificationDto,
  ): Promise<any> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    const res = await this.notificationService.acceptPushNotification(
      doctor,
      update_dto,
    );

    console.log(res);
    console.log('probando');
    return res;
  }

  async disablePush(
    doctorId: string,
    update_dto: UpdateNotificationDto,
  ): Promise<any> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });
    return await this.notificationService.disablePushNotification(
      doctor,
      update_dto,
    );
  }

  async getPushNotifications(): Promise<any> {
    return await this.notificationService.getNotifications();
  }
}
