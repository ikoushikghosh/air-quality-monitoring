import React from 'react';
import AppLayout from '../components/AppLayout';
import { NextPage } from 'next';
import AirQualityDataTable from '../components/AirQualityDataTable';
import { getAirInfo } from '../../actions/get-air-info';
import { AirInfo } from '../../models/AirInfo';

const AirInfoPage: NextPage = async () => {
  const airInfoData: AirInfo[] = await getAirInfo(1);
  return (
    <AppLayout>
      <div className="flex justify-between">
        <div>
          <h1>Air Quality Monitioring List</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-4">
          <AirQualityDataTable airInfoCollection={airInfoData} />
        </div>
      </div>
    </AppLayout>
  );
};

export default AirInfoPage;
