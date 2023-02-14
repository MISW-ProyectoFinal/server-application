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
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PatientAllergyService } from 'src/patient_allergy/patient_allergy.service';
import { PatientIllnessService } from 'src/patient_illness/patient_illness.service';
import { InfoDermoDto } from './dto/info-dermo.dto';
import {
  BusinessLogicException,
  BusinessError,
} from 'src/shared/errors/business-errors';

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
    const saveAllergy = await this.patientAllergyService.create(
      id,
      infoDermoDto.allergyId,
    );
    const saveIllness = await this.patientIllnessService.create(
      id,
      infoDermoDto.illnessId,
    );

    if (saveAllergy && saveIllness) {
      return { msj: 'CREATED' };
    } else {
      throw new BusinessLogicException(
        'illnesses not fund',
        BusinessError.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
