import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Injury } from './../injury/entities/injury.entity';
import { InjuryService } from './../injury/injury.service';
import { Patient } from './../patient/entities/patient.entity';
import { PatientService } from './../patient/patient.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case } from './entities/case.entity';
import { AzureBlobService } from './../shared/services/azure-blob.service';
import { RequestAssignCaseDto } from './dto/request-assign-case.dto';
import { Treatment } from './../treatment/entities/treatment.entity';
import { TreatmentService } from './../treatment/treatment.service';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Controller('case')
export class CaseController {
  containerName = 'injuries';

  constructor(
    private readonly caseService: CaseService,
    private readonly injuryService: InjuryService,
    private readonly patientService: PatientService,
    private readonly treatmentService: TreatmentService,
    private readonly azureBlobService: AzureBlobService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':injuryId')
  async create(
    @Req() req: any,
    @Param('injuryId') injuryId: string,
    @Body() createCaseDto: CreateCaseDto,
  ) {
    const { id } = req.user;
    const patient: Patient = await this.patientService.findOne(id);
    const injury: Injury = await this.injuryService.findOne(injuryId);
    const caseInstance: Case = plainToInstance(Case, createCaseDto);

    return await this.caseService.create(caseInstance, injury, patient);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/bystatus/:statusName')
  async findAll(@Req() req: any, @Param('statusName') statusName: string) {
    const { id } = req.user;
    const rta = await this.caseService.findAll(id, statusName);

    const cases = rta.map((myCase) => {
      const photo = myCase.injury.photos.map((photo) => {
        const filePath = this.azureBlobService.getfilePath(
          photo.file_name,
          this.containerName,
        );
        photo.file_name = filePath.url;
        return photo;
      });

      myCase.injury.photos = photo;
      return myCase;
    });
    return cases;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const rta = await this.caseService.findOne(id);

    const photo = rta.injury.photos.map((photo) => {
      const filePath = this.azureBlobService.getfilePath(
        photo.file_name,
        this.containerName,
      );
      photo.file_name = filePath.url;
      return photo;
    });

    rta.injury.photos = photo;
    return rta;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('assign/:id')
  async assignCase(
    @Req() req: any,
    @Param('id') id: string,
    @Body() requestAssignCaseDto: RequestAssignCaseDto,
  ) {
    const doctorId = req.user.id;

    const caseInstance: Case = plainToInstance(Case, {
      cci: requestAssignCaseDto.cci,
      amount: requestAssignCaseDto.amount,
      currency_type: requestAssignCaseDto.currency_type,
    });

    const createdCase = await this.caseService.assignCase(
      id,
      caseInstance,
      doctorId,
    );

    if (createdCase) {
      const treatment: Treatment = plainToInstance(Treatment, {
        diagnosis: requestAssignCaseDto.diagnosis,
        description: requestAssignCaseDto.description,
      });

      const createdTreatment = await this.treatmentService.create(
        treatment,
        createdCase.id,
        doctorId,
      );
      createdCase.treatments = [createdTreatment];

      return createdCase;
    } else {
      throw new BusinessLogicException(
        'Ocurrió un error en la asignación del caso',
        BusinessError.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('answer-request/:requestAnswer/:id')
  async confirmRequest(
    @Req() req: any,
    @Param('requestAnswer') requestAnswer: string,
    @Param('id') id: string,
  ) {
    const patientId = req.user.id;
    return await this.caseService.answerRequest(id, requestAnswer, patientId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('unassign/:id')
  async unassignCase(@Req() req: any, @Param('id') id: string) {
    const doctorId = req.user.id;
    return await this.caseService.unassignCase(id, doctorId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('finish/:id')
  async finishCase(@Req() req: any, @Param('id') id: string) {
    const doctorId = req.user.id;
    return await this.caseService.finishCase(id, doctorId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('confirm-conclusion/:requestAnswer/:id')
  async confirmConclusion(
    @Req() req: any,
    @Param('requestAnswer') requestAnswer: string,
    @Param('id') id: string,
  ) {
    const patientId = req.user.id;
    return await this.caseService.confirmConclusion(
      id,
      requestAnswer,
      patientId,
    );
  }
}
