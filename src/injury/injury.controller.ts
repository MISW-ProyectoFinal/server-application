import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjuryService } from './injury.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
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
    return await this.injuryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInjuryDto: UpdateInjuryDto) {
    return this.injuryService.update(+id, updateInjuryDto);
  }
}
