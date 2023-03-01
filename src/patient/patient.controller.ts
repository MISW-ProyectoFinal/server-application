/* eslint-disable prefer-const */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  Req,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '../auth/auth.service';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { BusinessErrorsInterceptor } from './../shared/interceptors/business-errors.interceptor';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { PatientAllergyService } from './../patient_allergy/patient_allergy.service';
import { PatientIllnessService } from './../patient_illness/patient_illness.service';
import { InfoDermoDto } from './dto/info-dermo.dto';
import {
  BusinessLogicException,
  BusinessError,
} from './../shared/errors/business-errors';

@Controller('patient')
@UseInterceptors(BusinessErrorsInterceptor)
export class PatientController {
  containerName = 'specialities';

  azureBlobService: any;
  constructor(
    private readonly patientService: PatientService,
    private readonly authService: AuthService,
    private readonly patientAllergyService: PatientAllergyService,
    private readonly patientIllnessService: PatientIllnessService,
  ) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    const patient: Patient = plainToInstance(Patient, createPatientDto);
    return this.patientService.create(patient);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const patient: Patient = plainToInstance(Patient, updatePatientDto);
    return await this.patientService.update(id, patient);
  }

  //METODOS PROPIOS
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('info-dermatological')
  async infoDermatological(
    @Req() req: any,
    @Body() infoDermoDto: InfoDermoDto,
  ) {
    const { id } = req.user;

    let skinSaved = true;
    if (infoDermoDto.skin_type != null) {
      const patient: Patient = plainToInstance(Patient, {
        skin_type: infoDermoDto.skin_type,
      });
      const saveSkinType = await this.patientService.update(id, patient);
      skinSaved = saveSkinType ? true : false;
    }

    // Ensure that infoDermoDto.allergyId values are unique
    infoDermoDto.allergyId = [...new Set(infoDermoDto.allergyId)];
    infoDermoDto.illnessId = [...new Set(infoDermoDto.illnessId)];

    const saveAllergy = await this.patientAllergyService.create(
      id,
      infoDermoDto.allergyId,
    );
    const saveIllness = await this.patientIllnessService.create(
      id,
      infoDermoDto.illnessId,
    );

    if (saveAllergy && saveIllness && skinSaved) {
      return { msj: 'CREATED' };
    } else {
      throw new BusinessLogicException(
        'illnesses not fund',
        BusinessError.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('clinical-history/:id')
  async clinicalHistory(@Req() req: any, @Param('id') id: string) {
    const doctorId = req.user.id;

    let patient = await this.patientService.clinicalHistory(id, doctorId);

    for (let i = 0; i < patient.injuries.length; i++) {
      const photos = patient.injuries[i].photos;

      for (let j = 0; j < photos.length; j++) {
        const filePath = this.azureBlobService.getfilePath(
          photos[j].file_name,
          'injuries',
        );
        photos[j].file_name = filePath.url;
      }
      patient.injuries[i].photos = photos;

      const cases = patient.injuries[i].cases;

      for (let j = 0; j < cases.length; j++) {
        const treatments = cases[j].treatments;

        for (let k = 0; k < treatments.length; k++) {
          const progresses = treatments[k].treatment_progresses;

          for (let l = 0; l < progresses.length; l++) {
            const tp_photos = progresses[l].treatment_progress_photos;

            for (let m = 0; m < tp_photos.length; m++) {
              const filePath = this.azureBlobService.getfilePath(
                tp_photos[m].file_name,
                'treatment-progress-photos',
              );
              tp_photos[m].file_name = filePath.url;
            }
            patient.injuries[i].cases[j].treatments[k].treatment_progresses[
              l
            ].treatment_progress_photos = tp_photos;
          }
        }
      }
    }

    return patient;
  }
}
