import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorSpecialtyService } from './doctor_specialty.service';
import { CreateDoctorSpecialtyDto } from './dto/create-doctor_specialty.dto';
import { UpdateDoctorSpecialtyDto } from './dto/update-doctor_specialty.dto';

@Controller('specialty-doctor')
export class DoctorSpecialtyController {
  constructor(
    private readonly specialtyDoctorService: DoctorSpecialtyService,
  ) {}

  @Post()
  create(@Body() createDoctorSpecialtyDto: CreateDoctorSpecialtyDto) {
    return this.specialtyDoctorService.create(createDoctorSpecialtyDto);
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
