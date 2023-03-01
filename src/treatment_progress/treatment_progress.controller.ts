/* eslint-disable prefer-const */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TreatmentProgressService } from './treatment_progress.service';
import { CreateTreatmentProgressDto } from './dto/create-treatment_progress.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { TreatmentProgress } from './entities/treatment_progress.entity';
import { plainToInstance } from 'class-transformer';
import { TreatmentProgressPhotoService } from './../treatment_progress_photo/treatment_progress_photo.service';
import { TreatmentProgressPhoto } from './../treatment_progress_photo/entities/treatment_progress_photo.entity';
import { AzureBlobService } from './../shared/services/azure-blob.service';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BusinessErrorsInterceptor } from './../shared/interceptors/business-errors.interceptor';

@Controller('treatment-progress')
@UseInterceptors(BusinessErrorsInterceptor)
export class TreatmentProgressController {
  containerName = 'treatment-progress-photos';

  constructor(
    private readonly treatmentProgressService: TreatmentProgressService,
    private readonly treatmentProgressPhotoService: TreatmentProgressPhotoService,
    private readonly azureBlobService: AzureBlobService,
  ) {}

  @Post(':treatmentId')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: any,
    @Param('treatmentId') treatmentId: string,
    @Body() createTreatmentProgressDto: CreateTreatmentProgressDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const patientId = req.user.id;
    const treatmentProgress: TreatmentProgress = plainToInstance(
      TreatmentProgress,
      createTreatmentProgressDto,
    );

    const createdTreatmentProgress = await this.treatmentProgressService.create(
      treatmentProgress,
      treatmentId,
      patientId,
    );

    if (createdTreatmentProgress && files) {
      for (let i = 0; i < files.length; i++) {
        let createdTreatmentProgressPhoto: TreatmentProgressPhoto =
          plainToInstance(TreatmentProgressPhoto, {
            file_name: '',
          });

        let file_name = await this.azureBlobService.upload(
          files[i],
          this.containerName,
          'image/jpeg',
          '5000000',
        );

        createdTreatmentProgressPhoto.file_name = file_name;

        this.treatmentProgressPhotoService.create(
          createdTreatmentProgress,
          createdTreatmentProgressPhoto,
        );
      }

      return createdTreatmentProgress;
    } else {
      throw new BusinessLogicException(
        'Ocurrió un error al crear la evolución.',
        BusinessError.PRECONDITION_FAILED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.treatmentProgressService.findOne(id);
  }
}
