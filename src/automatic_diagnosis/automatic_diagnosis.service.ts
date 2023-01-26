import { Injectable } from '@nestjs/common';
import { CreateAutomaticDiagnosisDto } from './dto/create-automatic_diagnosis.dto';
import { UpdateAutomaticDiagnosisDto } from './dto/update-automatic_diagnosis.dto';

@Injectable()
export class AutomaticDiagnosisService {
  create(createAutomaticDiagnosisDto: CreateAutomaticDiagnosisDto) {
    return 'This action adds a new automaticDiagnosis';
  }

  findAll() {
    return `This action returns all automaticDiagnosis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} automaticDiagnosis`;
  }

  update(id: number, updateAutomaticDiagnosisDto: UpdateAutomaticDiagnosisDto) {
    return `This action updates a #${id} automaticDiagnosis`;
  }

  remove(id: number) {
    return `This action removes a #${id} automaticDiagnosis`;
  }
}
