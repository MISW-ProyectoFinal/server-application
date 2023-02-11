import { Module } from '@nestjs/common';
import { IllnessService } from './illness.service';
import { IllnessController } from './illness.controller';
import { Illness } from './entities/illness.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [IllnessController],
  providers: [IllnessService],
  imports: [TypeOrmModule.forFeature([Illness])],
})
export class IllnessModule {}
