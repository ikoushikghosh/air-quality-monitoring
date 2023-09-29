import { NotFoundException } from '@nestjs/common';
import { AirInfoRepository } from './air.repository';
import { AirService } from './air.service';
import { Test } from '@nestjs/testing';

const mockAirInfoRepository = () => ({
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  getAirInfo: jest.fn(),
});

const mockAirInfo = {
  _id: 'testId',
  id: 1,
  country: 'testCountry',
  isoCode: 'testIsoCode',
  population: BigInt(123445),
  airQualityIndex: 80.7,
  rank: 1,
};

const airInfoList = [mockAirInfo];

describe('AuthService', () => {
  let airService: AirService;
  let airInfoRepository: AirInfoRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AirService,
        { provide: AirInfoRepository, useFactory: mockAirInfoRepository },
      ],
    }).compile();

    airService = module.get<AirService>(AirService);
    airInfoRepository = module.get<AirInfoRepository>(AirInfoRepository);
  });

  describe('getAirInfoList', () => {
    it('should return the array of air info with total count', async () => {
      jest
        .spyOn(airInfoRepository, 'getAirInfo')
        .mockResolvedValueOnce({ airInfo: airInfoList, count: 1 });
      const result = await airService.getAirInfo({ per_page: '1', page: '1' });
      expect(result.count).toEqual(1);
    });
  });

  describe('getAirInfoByIsoCode', () => {
    it('should return air info details by valid isocode', async () => {
      jest
        .spyOn(airInfoRepository, 'findOne')
        .mockResolvedValueOnce(mockAirInfo);
      const result = await airService.getAirInfoByIsoCode('testIsoCode');
      expect(result.country).toEqual(mockAirInfo.country);
    });

    it('should return error for invalid isocode', async () => {
      jest.spyOn(airInfoRepository, 'findOne').mockResolvedValueOnce(null);
      expect(airService.getAirInfoByIsoCode('testIsoCode')).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
