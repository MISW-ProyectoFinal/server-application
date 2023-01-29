import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InjuryPhotoService } from './injury_photo.service';
import { CreateInjuryPhotoDto } from './dto/create-injury_photo.dto';
import { UpdateInjuryPhotoDto } from './dto/update-injury_photo.dto';

@Controller('injury-photo')
export class InjuryPhotoController {
  constructor(private readonly injuryPhotoService: InjuryPhotoService) {}

  @Post()
  create(@Body() createInjuryPhotoDto: CreateInjuryPhotoDto) {
    return this.injuryPhotoService.create(createInjuryPhotoDto);
  }

  @Get()
  findAll() {
    return this.injuryPhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.injuryPhotoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInjuryPhotoDto: UpdateInjuryPhotoDto,
  ) {
    return this.injuryPhotoService.update(+id, updateInjuryPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.injuryPhotoService.remove(+id);
  }
}
