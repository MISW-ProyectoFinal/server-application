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
  Header,
  Query,
  Res,
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
import { AzureBlobService } from 'src/shared/services/azure-blob.service';

@Controller('specialty-doctor')
@UseInterceptors(BusinessErrorsInterceptor)
export class DoctorSpecialtyController {
  containerName = 'specialities';

  constructor(
    private readonly specialtyDoctorService: DoctorSpecialtyService,
    private readonly doctorService: DoctorService,
    private readonly azureBlobService: AzureBlobService,
  ) {}

  //CREA ESPECIALIDAD DE DOCTOR
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: any,
    @Body() createDoctorSpecialtyDto: CreateDoctorSpecialtyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { id } = req.user;
    const doctor: Doctor = await this.doctorService.findOne(id);

    createDoctorSpecialtyDto.file_name = await this.azureBlobService.upload(
      file,
      this.containerName,
      'application/pdf',
      '5000000',
    );
    const doctorSpecialty: DoctorSpecialty = plainToInstance(
      DoctorSpecialty,
      createDoctorSpecialtyDto,
    );

    doctorSpecialty.doctor = doctor;

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
    return this.specialtyDoctorService.findOne(id);
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

  //METODOS PROPIOS

  ////DESCARGAR PDF DE ESPECIALIDAD
  @Get('/download/:doctorspesialty')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=spesialty.pdf')
  @UseGuards(JwtAuthGuard)
  async downloadPDF(@Res() res, @Param('doctorspesialty') doctorspesialtyId) {
    const specialityDoctor = await this.specialtyDoctorService.findOne(
      doctorspesialtyId,
    );

    const file = await this.azureBlobService.getfile(
      specialityDoctor.file_name,
      this.containerName,
    );
    return file.pipe(res);
  }
}
