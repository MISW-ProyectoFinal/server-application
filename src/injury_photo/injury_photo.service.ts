import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjuryPhoto } from './entities/injury_photo.entity';

@Injectable()
export class InjuryPhotoService {
  constructor(
    @InjectRepository(InjuryPhoto)
    private readonly injuryPhotoRepository: Repository<InjuryPhoto>,
  ) {}

  async create(createInjuryPhoto: InjuryPhoto): Promise<InjuryPhoto> {
    return await this.injuryPhotoRepository.save(createInjuryPhoto);
  }
}
