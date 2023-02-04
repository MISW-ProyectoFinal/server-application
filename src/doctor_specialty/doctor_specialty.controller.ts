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
  UseGuards,
  Req,
} from '@nestjs/common';
import { DoctorSpecialtyService } from './doctor_specialty.service';
import { CreateDoctorSpecialtyDto } from './dto/create-doctor_specialty.dto';
import { UpdateDoctorSpecialtyDto } from './dto/update-doctor_specialty.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { diskStorage, Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
import { DoctorSpecialty } from './entities/doctor_specialty.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';

export const storage = {
  storage: diskStorage({
    destination: './uploads/specialties',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
@Controller('specialty-doctor')
@UseInterceptors(BusinessErrorsInterceptor)
export class DoctorSpecialtyController {
  constructor(
    private readonly specialtyDoctorService: DoctorSpecialtyService,
    private readonly doctorService: DoctorService,
  ) {}

  //CREA ESPECIALIDAD DE DOCTOR
  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createDoctorSpecialtyDto: CreateDoctorSpecialtyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createDoctorSpecialtyDto.file_name = file.filename;
    }

    const doctorSpecialty: DoctorSpecialty = plainToInstance(
      DoctorSpecialty,
      createDoctorSpecialtyDto,
    );
    return this.specialtyDoctorService.create(doctorSpecialty);
  }

  //OBTENER ESPECIALIDADES DE UN DOCTOR
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    const { id } = req.user;
    const doctor: Doctor = await this.doctorService.findOne(id);
    return this.specialtyDoctorService.findAll(doctor);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialtyDoctorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorSpecialtyDto: UpdateDoctorSpecialtyDto,
  ) {
    return this.specialtyDoctorService.update(+id, updateDoctorSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialtyDoctorService.remove(+id);
  }
}
