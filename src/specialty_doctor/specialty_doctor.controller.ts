import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecialtyDoctorService } from './specialty_doctor.service';
import { CreateSpecialtyDoctorDto } from './dto/create-specialty_doctor.dto';
import { UpdateSpecialtyDoctorDto } from './dto/update-specialty_doctor.dto';

@Controller('specialty-doctor')
export class SpecialtyDoctorController {
  constructor(
    private readonly specialtyDoctorService: SpecialtyDoctorService,
  ) {}

  @Post()
  create(@Body() createSpecialtyDoctorDto: CreateSpecialtyDoctorDto) {
    return this.specialtyDoctorService.create(createSpecialtyDoctorDto);
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
    @Body() updateSpecialtyDoctorDto: UpdateSpecialtyDoctorDto,
  ) {
    return this.specialtyDoctorService.update(+id, updateSpecialtyDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialtyDoctorService.remove(+id);
  }
}
