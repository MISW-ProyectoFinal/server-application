import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AllergyService } from './allergy.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { Allergy } from './entities/allergy.entity';

@Controller('allergy')
export class AllergyController {
  constructor(private readonly allergyService: AllergyService) {}

  @Post()
  async create(@Body() createAllergyDto: CreateAllergyDto) {
    const allergy: Allergy = plainToInstance(Allergy, createAllergyDto);
    return this.allergyService.create(allergy);
  }

  @Get()
  async findAll() {
    return await this.allergyService.findAll();
  }
}
