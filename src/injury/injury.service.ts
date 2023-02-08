import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { Injury } from './entities/injury.entity';

@Injectable()
export class InjuryService {
  constructor(
    @InjectRepository(Injury)
    private readonly injuryRepository: Repository<Injury>,
  ) {}

  async create(createInjury: Injury): Promise<Injury> {
    return await this.injuryRepository.save(createInjury);
  }

  findOne(id: number) {
    return `This action returns a #${id} injury`;
  }

  update(id: number, updateInjuryDto: UpdateInjuryDto) {
    return `This action updates a #${id} injury`;
  }
}
