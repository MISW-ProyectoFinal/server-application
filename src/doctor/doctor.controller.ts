import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { AuthService } from '../auth/auth.service';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Controller('doctor')
@UseInterceptors(BusinessErrorsInterceptor)
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly authService: AuthService,
  ) {}
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const doctor: Doctor = plainToInstance(Doctor, createDoctorDto);
    return this.doctorService.create(doctor);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-preferences')
  async updatePreferences(
    @Req() req: any,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    const { doctorId } = req.user;
    const doctorData: Doctor = plainToInstance(Doctor, updateDoctorDto);
    return await this.doctorService.update(doctorId, doctorData);
  }

  //METODOS PROPIOS
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('push-enable/:notificationToken')
  @HttpCode(HttpStatus.OK)
  async enablePush(
    @Req() req: any,
    @Param('notificationToken') notificationToken: string,
  ) {
    const doctorId = req.user.id;
    console.log('activando');
    const doctorData: Doctor = plainToInstance(Doctor, {
      notification_token: notificationToken,
    });
    await this.doctorService.update(doctorId, doctorData);
    return { success: true, defined_token: true, token: notificationToken };
  }

  @UseGuards(JwtAuthGuard)
  @Put('push-disable')
  @HttpCode(HttpStatus.OK)
  async disablePush(@Req() req: any) {
    const doctorId = req.user.id;
    console.log('desactivando');
    const doctorData: Doctor = plainToInstance(Doctor, {
      notification_token: null,
    });
    await this.doctorService.update(doctorId, doctorData);
    return { success: true, disable_token: true, token: null };
  }
}
