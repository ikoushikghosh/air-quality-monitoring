import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateAirInfoDto } from './dto/create-air-info.dto';
import { AirInfo } from './air.entity';
import { AirService } from './air.service';
import { GetAirInfoDto } from './dto/get-air-info.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('air')
@UseGuards(AuthGuard())
export class AirController {
  constructor(private airService: AirService) {}
  @Post()
  saveAirInfo(@Body() createAirInfoDto: CreateAirInfoDto): Promise<AirInfo> {
    return this.airService.saveAirInfo(createAirInfoDto);
  }

  @Get()
  getAirInfo(
    @Query() getAirInfoDto: GetAirInfoDto
  ): Promise<{ airInfo: AirInfo[]; count: number }> {
    return this.airService.getAirInfo(getAirInfoDto);
  }

  @Get('/:isocode')
  getAirInfoByIsoCode(@Param('isocode') isocode: string): Promise<AirInfo> {
    return this.airService.getAirInfoByIsoCode(isocode);
  }
}
