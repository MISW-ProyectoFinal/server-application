import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './uploads/patient_skin_types',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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
  @UseInterceptors(FileInterceptor('file', storage))
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updatePatientDto.skin_type_photo_filename = file.filename;
    }
    const patient: Patient = plainToInstance(Patient, updatePatientDto);
    return this.patientService.update(id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }

  //METODOS PROPIOS
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    loginUserDto.who = 'patient';
    return this.authService.login(loginUserDto);
  }
}
