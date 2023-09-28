'use client';
import { AirInfo } from '../../models/AirInfo';
import React from 'react';

interface Props {
  airInfoCollection: AirInfo[];
}
const AirQualityDataTable: React.FC<Props> = ({ airInfoCollection }) => {
  return (
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
        <tbody>
          {airInfoCollection &&
            airInfoCollection?.map((airInfo) => {
              return (
                <tr key={airInfo.isoCode} className="hover">
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="badge badge-primary">{airInfo.rank}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{airInfo.country}</div>
                      <div className="text-sm opacity-50">
                        {airInfo.isoCode}
                      </div>
                    </div>
                  </td>
                  <td>{airInfo.airQualityIndex}</td>
                  <td>{airInfo.population}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AirQualityDataTable;
