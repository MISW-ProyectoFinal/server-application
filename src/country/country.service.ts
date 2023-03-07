import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    return await this.countryRepository.save(createCountryDto);
  }

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.find({
      relations: ['cities', 'document_types'],
    });
  }
}
