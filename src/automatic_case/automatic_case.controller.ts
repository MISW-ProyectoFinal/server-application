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
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Injury } from './../injury/entities/injury.entity';
import { InjuryService } from './../injury/injury.service';
import { Patient } from './../patient/entities/patient.entity';
import { PatientService } from './../patient/patient.service';
import { AutomaticCaseService } from './automatic_case.service';
import { CreateAutomaticCaseDto } from './dto/create-automatic_case.dto';
import { UpdateAutomaticCaseDto } from './dto/update-automatic_case.dto';
import { AutomaticCase } from './entities/automatic_case.entity';

@Controller('automatic-case')
export class AutomaticCaseController {
  constructor(
    private readonly automaticCaseService: AutomaticCaseService,
    private readonly injuryService: InjuryService,
    private readonly patientService: PatientService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':injuryId')
  async create(
    @Req() req: any,
    @Param('injuryId') injuryId: string,
    @Body() createAutomaticCaseDto: CreateAutomaticCaseDto,
  ) {
    const { id } = req.user;
    const patient: Patient = await this.patientService.findOne(id);
    const injury: Injury = await this.injuryService.findOne(injuryId);
    const automaticCase: AutomaticCase = plainToInstance(
      AutomaticCase,
      createAutomaticCaseDto,
    );

    return await this.automaticCaseService.create(
      automaticCase,
      injury,
      patient,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':statusName')
  async findAll(@Param('statusName') statusName: string) {
    return await this.automaticCaseService.findAll(statusName);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.automaticCaseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutomaticCaseDto: UpdateAutomaticCaseDto,
  ) {
    return this.automaticCaseService.update(+id, updateAutomaticCaseDto);
  }
}
