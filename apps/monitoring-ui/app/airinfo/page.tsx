import React from 'react';
import AppLayout from '../components/AppLayout';
import { NextPage } from 'next';
import { getAirInfo } from '../../actions/get-air-info';
import { AirInfo } from '../../models/AirInfo';
import LoadMoreAirInfo from '../components/LoadMoreAirInfo';
import AirInfoRecordsTable from '../components/AirInfoRecordsTable';

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
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Country</th>
                  <th>Air Quality Index</th>
                  <th>Population</th>
                  <th>Action</th>
                </tr>
              </thead>
              <AirInfoRecordsTable airInfoCollection={airInfoData} />
              <LoadMoreAirInfo getAirInfo={getAirInfo} />
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AirInfoPage;
