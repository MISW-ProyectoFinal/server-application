import { Injectable } from '@nestjs/common';
import { CreateInjuryPhotoDto } from './dto/create-injury_photo.dto';
import { UpdateInjuryPhotoDto } from './dto/update-injury_photo.dto';

@Injectable()
export class InjuryPhotoService {
  create(createInjuryPhotoDto: CreateInjuryPhotoDto) {
    return 'This action adds a new injuryPhoto';
  }

  findAll() {
    return `This action returns all injuryPhoto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} injuryPhoto`;
  }

  update(id: number, updateInjuryPhotoDto: UpdateInjuryPhotoDto) {
    return `This action updates a #${id} injuryPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} injuryPhoto`;
  }
}
