import { Injectable } from '@nestjs/common';
import { AirInfoRepository } from './air.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAirInfoDto } from './dto/create-air-info.dto';
import { AirInfo } from './air.entity';
import { GetAirInfoDto } from './dto/get-air-info.dto';

@Injectable()
export class AirService {
  constructor(
    @InjectRepository(AirInfoRepository)
    private airInfoRepository: AirInfoRepository
  ) {}

  async saveAirInfo(createAirInfoDto: CreateAirInfoDto): Promise<AirInfo> {
    return await this.airInfoRepository.saveAirInfo(createAirInfoDto);
  }

  async getAirInfo(
    getAirInfoDto: GetAirInfoDto
  ): Promise<{ airInfo: AirInfo[]; count: number }> {
    const { perPage = '5', page } = getAirInfoDto;
    const take: number = Number.parseInt(perPage);
    const skip = take * Number.parseInt(page) - take;
    return await this.airInfoRepository.getAirInfo(take, skip);
  }
}
