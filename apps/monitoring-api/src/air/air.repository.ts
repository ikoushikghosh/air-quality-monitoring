import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AirInfo } from './air.entity';
import { CreateAirInfoDto } from './dto/create-air-info.dto';

@Injectable()
export class AirInfoRepository extends Repository<AirInfo> {
  constructor(private dataSource: DataSource) {
    super(AirInfo, dataSource.createEntityManager());
  }

  async saveAirInfo(createAirInfoDto: CreateAirInfoDto): Promise<AirInfo> {
    const { country, isoCode, population, airQualityIndex, rank } =
      createAirInfoDto;
    const airInfo = this.create({
      country,
      isoCode,
      population,
      airQualityIndex,
      rank,
    });
    try {
      await this.save(airInfo);
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException(
          `Error while saving air info: Air Information for the country ${country} already exists.`
        );
      }
    }
    return airInfo;
  }

  async getAirInfo(
    take: number,
    skip: number
  ): Promise<{ airInfo: AirInfo[]; count: number }> {
    const [airInfo, count] = await this.findAndCount({ take, skip });

    return { airInfo, count };
  }
}
