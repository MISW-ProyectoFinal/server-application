import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { plainToInstance } from 'class-transformer';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';


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
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }

  //METODOS PROPIOS
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    loginUserDto.who = "patient"
    return this.authService.login(loginUserDto);
  }
}
