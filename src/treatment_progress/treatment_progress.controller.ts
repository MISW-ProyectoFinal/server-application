import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TreatmentProgressService } from './treatment_progress.service';
import { CreateTreatmentProgressDto } from './dto/create-treatment_progress.dto';
import { UpdateTreatmentProgressDto } from './dto/update-treatment_progress.dto';

@Controller('treatment-progress')
export class TreatmentProgressController {
  constructor(
    private readonly treatmentProgressService: TreatmentProgressService,
  ) {}

  @Post()
  create(@Body() createTreatmentProgressDto: CreateTreatmentProgressDto) {
    return this.treatmentProgressService.create(createTreatmentProgressDto);
  }

  @Get()
  findAll() {
    return this.treatmentProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentProgressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentProgressDto: UpdateTreatmentProgressDto,
  ) {
    return this.treatmentProgressService.update(
      +id,
      updateTreatmentProgressDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentProgressService.remove(+id);
  }
}
