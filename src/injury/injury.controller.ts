import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InjuryService } from './injury.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';

@Controller('injury')
export class InjuryController {
  constructor(private readonly injuryService: InjuryService) {}

  @Post()
  create(@Body() createInjuryDto: CreateInjuryDto) {
    return this.injuryService.create(createInjuryDto);
  }

  @Get()
  findAll() {
    return this.injuryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.injuryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInjuryDto: UpdateInjuryDto) {
    return this.injuryService.update(+id, updateInjuryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.injuryService.remove(+id);
  }
}
