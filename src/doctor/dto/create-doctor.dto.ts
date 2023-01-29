import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateDoctorDto extends CreateUserDto {
  @IsBoolean()
  enabled = false;
}
