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
export class DoctorSpecialtyController {
  constructor(
    private readonly specialtyDoctorService: DoctorSpecialtyService,
  ) {}

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

  @Get()
  findAll() {
    return this.specialtyDoctorService.findAll();
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
