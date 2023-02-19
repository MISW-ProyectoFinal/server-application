import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Header,
  Res,
} from '@nestjs/common';
import { DoctorSpecialtyService } from './doctor_specialty.service';
import { CreateDoctorSpecialtyDto } from './dto/create-doctor_specialty.dto';
import { UpdateDoctorSpecialtyDto } from './dto/update-doctor_specialty.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { DoctorSpecialty } from './entities/doctor_specialty.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from './../shared/interceptors/business-errors.interceptor';
import { DoctorService } from './../doctor/doctor.service';
import { Doctor } from './../doctor/entities/doctor.entity';
import { AzureBlobService } from './../shared/services/azure-blob.service';

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.specialtyDoctorService.findOne(id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDoctorSpecialtyDto: UpdateDoctorSpecialtyDto,
  // ) {
  //   return this.specialtyDoctorService.update(+id, updateDoctorSpecialtyDto);
  // }

  @Patch('authorize/:id')
  async authorize(@Param('id') id: string) {
    const updateDoctorSpecialtyDto: UpdateDoctorSpecialtyDto = {
      authorized: true,
    };
    const doctorSpecialty: DoctorSpecialty = plainToInstance(
      DoctorSpecialty,
      updateDoctorSpecialtyDto,
    );
    return await this.specialtyDoctorService.update(id, doctorSpecialty);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.specialtyDoctorService.remove(+id);
  // }

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
