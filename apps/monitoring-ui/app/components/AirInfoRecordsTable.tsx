'use client';
import { useRouter } from 'next/navigation';
import { AirInfo } from '../../models/AirInfo';
import React from 'react';

interface Props {
  airInfoCollection: AirInfo[];
}
const AirInfoRecordsTable: React.FC<Props> = ({ airInfoCollection }) => {
  const router = useRouter();

  const handleOnClickDetails = async (isoCode: string) => {
    router.push(`/airinfo/${isoCode}`);
  };
  return (
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
                  <div className="text-sm opacity-50">{airInfo.isoCode}</div>
                </div>
              </td>
              <td>{airInfo.airQualityIndex}</td>
              <td>{airInfo.population}</td>
              <th>
                <button
                  className="btn btn-outline btn-primary btn-xs"
                  onClick={() => handleOnClickDetails(airInfo.isoCode)}
                >
                  details
                </button>
              </th>
            </tr>
          );
        })}
    </tbody>
  );
};

export default AirInfoRecordsTable;
