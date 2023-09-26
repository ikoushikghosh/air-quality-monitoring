import { Module } from '@nestjs/common';
import { AirService } from './air.service';
import { AirController } from './air.controller';
import { AirInfoRepository } from './air.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirInfo } from './air.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AirInfo]), AuthModule],
  controllers: [AirController],
  providers: [AirService, AirInfoRepository],
})
export class AirModule {}
