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

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
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
      relations: ['injury', 'injury.photos', 'injury.patient'],
    });

    if (!caseInstance) {
      throw new BusinessLogicException(
        'No se logra encontrar el caso en el sistema',
        BusinessError.NOT_FOUND,
      );
    }

    return caseInstance;
  }

  update(id: number, updateCaseDto: UpdateCaseDto) {
    return `This action updates a #${id} case`;
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
      relations: ['doctor'],
    });

    if (!caseToUpdate) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (caseToUpdate.doctor) {
        throw new BusinessLogicException(
          'El caso ya tiene asignado un doctor',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    return await this.caseRepository.save({
      ...caseToUpdate,
      ...caseData,
    });
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
      relations: ['injury', 'injury.patient', 'injury.photos'],
    });

    if (!caseToUpdate) {
      throw new BusinessLogicException(
        'Caso no encontrado',
        BusinessError.NOT_FOUND,
      );
    } else {
      if (caseToUpdate.injury.patient.id != patient.id) {
        throw new BusinessLogicException(
          'El caso no pertenece al paciente',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }

    if (requestAnswer == 'yes') {
      caseToUpdate.case_status = CaseStatus.EN_PROCESO;
    } else {
      caseToUpdate.doctor = null;
      caseToUpdate.case_status = CaseStatus.PENDIENTE;
      caseToUpdate.cci = '';
      caseToUpdate.amount = null;
      caseToUpdate.currency_type = CurrencyType.USD;
    }

    return await this.caseRepository.save(caseToUpdate);
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
      relations: ['doctor'],
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
}
