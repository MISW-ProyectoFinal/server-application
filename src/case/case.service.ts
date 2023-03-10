import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injury } from './../injury/entities/injury.entity';
import { Repository } from 'typeorm';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case } from './entities/case.entity';
import { CaseStatus } from './../case_status/case_status.enum';
import { Patient } from './../patient/entities/patient.entity';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { Doctor } from './../doctor/entities/doctor.entity';
import { CurrencyType } from './../currency_type/currency_type.enum';
import { Treatment } from './../treatment/entities/treatment.entity';
import { NotificationService } from './../notification/notification.service';

import axios from 'axios';

const API_KEY = 'OTY4MjljMTQtZWUwOC00YzJlLWEwNzktNjM3OTJkODQ3ZjNk';
const ONE_SIGNAL_APP_ID = '658d550f-70ca-4e08-85f5-60fab7f06947';
const BASE_URL = 'https://onesignal.com/api/v1';

const optionsBuilder = (method: string, path: string, body: any) => {
  return {
    method,
    url: `${BASE_URL}/${path}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    data: JSON.stringify(body),
  };
};

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,

    @InjectRepository(Treatment)
    private readonly treatmentRepository: Repository<Treatment>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    private readonly notificationService: NotificationService,
  ) {}

  async create(
    createCase: Case,
    injury: Injury,
    patient: Patient,
  ): Promise<Case> {
    // if (!injury || (injury && patient.injuries.includes(injury))) {
    //   throw new BusinessLogicException(
    //     'El paciente no tiene permisos para solicitar caso de esta lesión',
    //     BusinessError.NOT_FOUND,
    //   );
    // }
    createCase.injury = injury;
    return await this.caseRepository.save(createCase);
  }

  async findAll(doctorId: string, statusName: string): Promise<Case[]> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: `${doctorId}` },
    });

    if (statusName == 'pending') {
      return await this.caseRepository.find({
        where: { case_status: CaseStatus.PENDIENTE },
        relations: ['injury', 'injury.photos', 'injury.patient'],
      });
    } else {
      if (!doctor) {
        throw new BusinessLogicException(
          'El doctor no pudo ser encontrado',
          BusinessError.NOT_FOUND,
        );
      }

      return await this.caseRepository.find({
        where: { doctor: { id: doctor.id } },
        relations: ['injury', 'injury.photos', 'injury.patient'],
      });
    }
  }

  async findOne(id: string) {
    const caseInstance = await this.caseRepository.findOne({
      where: { id: id },
      relations: ['injury', 'injury.photos', 'injury.patient', 'treatments'],
    });

    if (!caseInstance) {
      throw new BusinessLogicException(
        'No se logra encontrar el caso en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return caseInstance;
  }

  async assignCase(
    id: string,
    caseData: Case,
    doctorId: string,
  ): Promise<Case> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: `${doctorId}` },
    });

    if (!doctor) {
      throw new BusinessLogicException(
        'Doctor no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const caseToUpdate = await this.caseRepository.findOne({
      where: { id: id },
      relations: ['doctor', 'injury', 'injury.patient'],
    });

    if (!caseToUpdate) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (
        caseToUpdate.doctor ||
        caseToUpdate.case_status != CaseStatus.PENDIENTE
      ) {
        throw new BusinessLogicException(
          'El caso ya tiene asignado un doctor o no se encuentra en estado pendiente',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    caseData.doctor = doctor;
    caseData.case_status = CaseStatus.POR_CONFIRMAR;

    const savedCaseToUpdate = await this.caseRepository.save({
      ...caseToUpdate,
      ...caseData,
    });

    const notificationToken = caseToUpdate.injury.patient.notification_token;
    if (
      savedCaseToUpdate.case_status == CaseStatus.POR_CONFIRMAR &&
      notificationToken != null
    ) {
      const body = {
        app_id: ONE_SIGNAL_APP_ID,
        include_player_ids: [notificationToken],
        contents: {
          es: `${doctor.name} ${doctor.surname} ha solicitado atender tu caso`,
          en: `${doctor.name} ${doctor.surname} has request to take your case`,
        },
      };
      const options = optionsBuilder('POST', 'notifications', body);
      try {
        await axios(options);
      } catch (error) {
        console.error(error.response.data.errors);
      }
    }

    return savedCaseToUpdate;
  }

  async answerRequest(
    id: string,
    requestAnswer: string,
    patientId: string,
  ): Promise<Case> {
    const patient = await this.patientRepository.findOne({
      where: { id: `${patientId}` },
    });

    if (!patient) {
      throw new BusinessLogicException(
        'Paciente no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const caseToUpdate = await this.caseRepository.findOne({
      where: { id: id },
      relations: [
        'injury',
        'injury.patient',
        'injury.photos',
        'treatments',
        'doctor',
      ],
    });

    if (!caseToUpdate) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (caseToUpdate.injury.patient.id != patient.id) {
        throw new BusinessLogicException(
          'El caso no pertenece al paciente o no se encuentra por confirmar',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    const initialDoctor = caseToUpdate.doctor;
    let treatment = caseToUpdate.treatments[0];

    if (requestAnswer == 'yes') {
      caseToUpdate.case_status = CaseStatus.EN_PROCESO;

      const date = new Date();
      treatment.start_date = date.toISOString().slice(0, 10);
      this.treatmentRepository.save(treatment);
    } else {
      caseToUpdate.doctor = null;
      caseToUpdate.case_status = CaseStatus.PENDIENTE;
      caseToUpdate.cci = '';
      caseToUpdate.amount = null;
      caseToUpdate.currency_type = CurrencyType.USD;

      this.treatmentRepository.remove(treatment);
    }

    const savedCase = await this.caseRepository.save(caseToUpdate);

    if (savedCase) {
      const fullResponse = `${patient.name} ha ${
        requestAnswer == 'yes' ? 'aceptado' : 'rechazado'
      } su solicitud de atención.`;

      const not_response = await this.notificationService.sendPush(
        initialDoctor,
        'Solicitud de caso',
        fullResponse,
      );

      console.log(not_response);
    }

    return savedCase;
  }

  async unassignCase(id: string, doctorId: string): Promise<Case> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: `${doctorId}` },
    });

    if (!doctor) {
      throw new BusinessLogicException(
        'Doctor no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const caseToUpdate = await this.caseRepository.findOne({
      where: { id: id },
      relations: ['doctor', 'treatments'],
    });

    if (!caseToUpdate) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (
        !caseToUpdate.doctor ||
        caseToUpdate.doctor.id != doctor.id ||
        caseToUpdate.case_status != CaseStatus.POR_CONFIRMAR
      ) {
        throw new BusinessLogicException(
          'No es posible desasignar este caso',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    this.treatmentRepository.remove(caseToUpdate.treatments[0]);

    return await this.caseRepository.save({
      ...caseToUpdate,
      ...{
        doctor: null,
        case_status: CaseStatus.PENDIENTE,
        cci: '',
        amount: null,
      },
    });
  }

  async finishCase(id: string, doctorId: string): Promise<Case> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: `${doctorId}` },
    });

    if (!doctor) {
      throw new BusinessLogicException(
        'Doctor no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const caseToUpdate = await this.caseRepository.findOne({
      where: { id: id },
      relations: ['doctor', 'treatments'],
    });

    if (!caseToUpdate) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (
        !caseToUpdate.doctor ||
        caseToUpdate.doctor.id != doctor.id ||
        caseToUpdate.case_status != CaseStatus.EN_PROCESO ||
        caseToUpdate.treatments.length == 0
      ) {
        throw new BusinessLogicException(
          'No es posible concluir este caso',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    return await this.caseRepository.save({
      ...caseToUpdate,
      ...{
        case_status: CaseStatus.POR_CONCLUIR,
      },
    });
  }

  async confirmConclusion(
    id: string,
    requestAnswer: string,
    patientId: string,
  ): Promise<Case> {
    const patient = await this.patientRepository.findOne({
      where: { id: `${patientId}` },
    });

    if (!patient) {
      throw new BusinessLogicException(
        'Paciente no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const caseToUpdate = await this.caseRepository.findOne({
      where: { id: id },
      relations: ['injury', 'injury.patient'],
    });

    if (!caseToUpdate) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (
        caseToUpdate.injury.patient.id != patient.id ||
        caseToUpdate.case_status != CaseStatus.POR_CONCLUIR
      ) {
        throw new BusinessLogicException(
          'No se puede responder a conclusión de caso',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    if (requestAnswer == 'yes') {
      caseToUpdate.case_status = CaseStatus.CERRADO;
      const date = new Date();
      caseToUpdate.end_date = date.toISOString().slice(0, 10);
    } else {
      caseToUpdate.case_status = CaseStatus.EN_PROCESO;
    }

    return await this.caseRepository.save(caseToUpdate);
  }
}
