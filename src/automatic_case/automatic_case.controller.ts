import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AutomaticCaseService } from './automatic_case.service';
import { CreateAutomaticCaseDto } from './dto/create-automatic_case.dto';
import { UpdateAutomaticCaseDto } from './dto/update-automatic_case.dto';

@Controller('automatic-case')
export class AutomaticCaseController {
  constructor(private readonly automaticCaseService: AutomaticCaseService) {}

  @Post()
  create(@Body() createAutomaticCaseDto: CreateAutomaticCaseDto) {
    return this.automaticCaseService.create(createAutomaticCaseDto);
  }

  @Get()
  findAll() {
    return this.automaticCaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.automaticCaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutomaticCaseDto: UpdateAutomaticCaseDto,
  ) {
    return this.automaticCaseService.update(+id, updateAutomaticCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.automaticCaseService.remove(+id);
  }
}
