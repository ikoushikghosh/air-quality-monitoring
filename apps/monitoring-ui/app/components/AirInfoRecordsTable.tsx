import { AirInfo } from '../../models/AirInfo';
import React from 'react';

interface Props {
  airInfoCollection: AirInfo[];
}
const AirInfoRecordsTable: React.FC<Props> = ({ airInfoCollection }) => {
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
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          );
        })}
    </tbody>
  );
};

export default AirInfoRecordsTable;
