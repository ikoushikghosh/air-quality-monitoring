'use client';
import { AirInfo } from '../../models/AirInfo';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from './Spinner';
import AirInfoRecordsTable from './AirInfoRecordsTable';

const LoadMoreAirInfo: React.FC<{
  getAirInfo: (page: number) => Promise<AirInfo[]>;
}> = (props) => {
  const [airInfoList, setAirInfoList] = useState<AirInfo[]>([]);
  // records already loaded
  const [recordLoaded, setRecordLoaded] = useState(1);

  const { ref, inView } = useInView();

  const loadMoreAirInfoData = async () => {
    const nextRecord = recordLoaded + 1;
    const newAirInfoData = (await props.getAirInfo(nextRecord)) ?? [];
    setAirInfoList((prevAirInfoData: AirInfo[]) => [
      ...prevAirInfoData,
      ...newAirInfoData,
    ]);
    setRecordLoaded(nextRecord);
  };

  useEffect(() => {
    if (inView) {
      console.log('scrolled to the end');
      loadMoreAirInfoData();
    }
  }, [inView]);

  return (
    <>
      <AirInfoRecordsTable airInfoCollection={airInfoList} />
      <tfoot ref={ref}>
        <tr>
          <td className="p-4">
            <Spinner />
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default LoadMoreAirInfo;
