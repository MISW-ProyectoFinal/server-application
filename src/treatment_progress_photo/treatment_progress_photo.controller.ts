import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TreatmentProgressPhotoService } from './treatment_progress_photo.service';
import { CreateTreatmentProgressPhotoDto } from './dto/create-treatment_progress_photo.dto';
import { UpdateTreatmentProgressPhotoDto } from './dto/update-treatment_progress_photo.dto';

@Controller('treatment-progress-photo')
export class TreatmentProgressPhotoController {
  constructor(
    private readonly treatmentProgressPhotoService: TreatmentProgressPhotoService,
  ) {}

  @Post()
  create(
    @Body() createTreatmentProgressPhotoDto: CreateTreatmentProgressPhotoDto,
  ) {
    return this.treatmentProgressPhotoService.create(
      createTreatmentProgressPhotoDto,
    );
  }

  @Get()
  findAll() {
    return this.treatmentProgressPhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentProgressPhotoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentProgressPhotoDto: UpdateTreatmentProgressPhotoDto,
  ) {
    return this.treatmentProgressPhotoService.update(
      +id,
      updateTreatmentProgressPhotoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentProgressPhotoService.remove(+id);
  }
}
