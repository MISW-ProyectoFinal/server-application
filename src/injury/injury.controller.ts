/* eslint-disable prefer-const */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjuryService } from './injury.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Patient } from './../patient/entities/patient.entity';
import { InjuryPhotoService } from './../injury_photo/injury_photo.service';
import { PatientService } from './../patient/patient.service';
import { AzureBlobService } from './../shared/services/azure-blob.service';
import { Injury } from './entities/injury.entity';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { InjuryPhoto } from './../injury_photo/entities/injury_photo.entity';
import { CreateInjuryPhotoDto } from './../injury_photo/dto/create-injury_photo.dto';

@Controller('injury')
export class InjuryController {
  containerName = 'injuries';

  constructor(
    private readonly injuryPhotoService: InjuryPhotoService,
    private readonly injuryService: InjuryService,
    private readonly patientService: PatientService,
    private readonly azureBlobService: AzureBlobService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: any,
    @Body() createInjuryDto: CreateInjuryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { id } = req.user;
    const patient: Patient = await this.patientService.findOne(id);

    if (patient) {
      const injury: Injury = plainToInstance(Injury, createInjuryDto);
      injury.patient = patient;
      const createdInjury: Injury = await this.injuryService.create(injury);

      if (createdInjury) {
        const createInjuryPhotoDto: CreateInjuryPhotoDto = {
          file_name: '',
          injury: null,
        };
        const createdInjuryPhoto: InjuryPhoto = plainToInstance(
          InjuryPhoto,
          createInjuryPhotoDto,
        );
        createdInjuryPhoto.injury = createdInjury;
        if (file) {
          createdInjuryPhoto.file_name = await this.azureBlobService.upload(
            file,
            this.containerName,
            'image/jpeg',
            '5000000',
          );
        }

        this.injuryPhotoService.create(createdInjuryPhoto);

        return createdInjury;
      } else {
        throw new BusinessLogicException(
          'Ocurrió un error al generar el caso.',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    } else {
      throw new BusinessLogicException(
        'Ocurrió un error al no encontrar la información del paciente.',
        BusinessError.PRECONDITION_FAILED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let injury = await this.injuryService.findOne(id);
    let photos = injury.photos;

    for (let i = 0; i < photos.length; i++) {
      const filePath = this.azureBlobService.getfilePath(
        photos[i].file_name,
        'injuries',
      );
      photos[i].file_name = filePath.url;
    }
    injury.photos = photos;

    let cases = injury.cases;
    for (let i = 0; i < cases.length; i++) {
      const treatments = cases[i].treatments;

      for (let j = 0; j < treatments.length; j++) {
        const progresses = treatments[j].treatment_progresses;

        for (let k = 0; k < progresses.length; k++) {
          const tp_photos = progresses[k].treatment_progress_photos;

          for (let l = 0; l < tp_photos.length; l++) {
            const filePath = this.azureBlobService.getfilePath(
              tp_photos[l].file_name,
              'treatment-progress-photos',
            );
            tp_photos[l].file_name = filePath.url;
          }
          injury.cases[i].treatments[j].treatment_progresses[
            k
          ].treatment_progress_photos = tp_photos;
        }
      }
    }

    return injury;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    const { id } = req.user;
    let injuries = await this.injuryService.findAll(id);

    for (let i = 0; i < injuries.length; i++) {
      const photos = injuries[i].photos;

      for (let j = 0; j < photos.length; j++) {
        const filePath = this.azureBlobService.getfilePath(
          photos[j].file_name,
          'injuries',
        );
        photos[j].file_name = filePath.url;
      }
      injuries[i].photos = photos;
    }

    return injuries;
  }
}
