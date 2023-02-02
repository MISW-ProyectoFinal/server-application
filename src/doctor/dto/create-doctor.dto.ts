import { CreateUserDto } from './../../user/dto/create-user.dto';
import { IsBoolean } from 'class-validator';

export class CreateDoctorDto extends CreateUserDto {
  @IsBoolean()
  enabled = false;
}
