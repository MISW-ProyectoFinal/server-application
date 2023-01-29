import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AutomaticDiagnosisService } from './automatic_diagnosis.service';
import { CreateAutomaticDiagnosisDto } from './dto/create-automatic_diagnosis.dto';
import { UpdateAutomaticDiagnosisDto } from './dto/update-automatic_diagnosis.dto';

@Controller('automatic-diagnosis')
export class AutomaticDiagnosisController {
  constructor(
    private readonly automaticDiagnosisService: AutomaticDiagnosisService,
  ) {}

  @Post()
  create(@Body() createAutomaticDiagnosisDto: CreateAutomaticDiagnosisDto) {
    return this.automaticDiagnosisService.create(createAutomaticDiagnosisDto);
  }

  @Get()
  findAll() {
    return this.automaticDiagnosisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.automaticDiagnosisService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutomaticDiagnosisDto: UpdateAutomaticDiagnosisDto,
  ) {
    return this.automaticDiagnosisService.update(
      +id,
      updateAutomaticDiagnosisDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.automaticDiagnosisService.remove(+id);
  }
}
