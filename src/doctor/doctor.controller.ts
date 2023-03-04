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
import { NotificationDto } from 'src/notification/dto/create-notification.dto';
import { UpdateNotificationDto } from 'src/notification/dto/update-notification.dto';
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
  @Put('push-enable')
  @HttpCode(HttpStatus.OK)
  async enablePush(@Req() req: any, @Body() updateDto: NotificationDto) {
    const doctorId = req.user.id;
    console.log('activando');
    console.log(updateDto);
    return await this.doctorService.enablePush(doctorId, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('push-disable')
  @HttpCode(HttpStatus.OK)
  async disablePush(@Req() req: any, @Body() updateDto: UpdateNotificationDto) {
    const doctorId = req.user.id;
    console.log('desactivando');
    return await this.doctorService.disablePush(doctorId, updateDto);
  }

  @Get('push-notifications')
  @HttpCode(HttpStatus.OK)
  async fetchPusNotifications() {
    return await this.doctorService.getPushNotifications();
  }
}
