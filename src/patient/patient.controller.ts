import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('patient')
@UseInterceptors(BusinessErrorsInterceptor)
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly authService: AuthService,
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
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    const patient: Patient = plainToInstance(Patient, updatePatientDto);
    return this.patientService.update(id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }

  //METODOS PROPIOS
  //METODOS PROPIOS
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req);
  }
}
