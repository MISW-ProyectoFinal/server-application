import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { Treatment } from './entities/treatment.entity';
import { AzureBlobService } from './../shared/services/azure-blob.service';
import { TreatmentProgressService } from './../treatment_progress/treatment_progress.service';

@Controller('treatment')
export class TreatmentController {
  containerName = 'treatment-progress-photos';

  constructor(
    private readonly treatmentService: TreatmentService,
    private readonly treatmentProgressService: TreatmentProgressService,
    private readonly azureBlobService: AzureBlobService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':caseId')
  async create(
    @Req() req: any,
    @Param('caseId') caseId: string,
    @Body() createTreatmentDto: CreateTreatmentDto,
  ) {
    const doctorId = req.user.id;
    const treatment: Treatment = plainToInstance(Treatment, createTreatmentDto);

    return await this.treatmentService.create(treatment, caseId, doctorId);
  }

  @Get()
  findAll() {
    return this.treatmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const treatment = await this.treatmentService.findOne(id);

    if (treatment.treatment_progresses.length > 0) {
      const treatment_progresses = await this.treatmentProgressService.findAll(
        treatment.id,
      );

      for (let i = 0; i < treatment_progresses.length; i++) {
        const photos = treatment_progresses[i].treatment_progress_photos;

        for (let i = 0; i < photos.length; i++) {
          const filePath = this.azureBlobService.getfilePath(
            photos[i].file_name,
            this.containerName,
          );
          photos[i].file_name = filePath.url;
        }
      }

      treatment.treatment_progresses = treatment_progresses;
    }

    return treatment;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentService.update(+id, updateTreatmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentService.remove(+id);
  }
}
