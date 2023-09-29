import { AirInfo } from '../../../models/AirInfo';
import { getAirInfoDetailsByIsoCode } from '../../../actions/get-air-info';
import Image from 'next/image';
import React from 'react';
import AppLayout from '../../components/AppLayout';
import Link from 'next/link';

const AirInfoDetailsPage: React.FC<{ props: any }> = async (props) => {
  const { icocode } = props.params;
  const airInfoDetails: AirInfo = await getAirInfoDetailsByIsoCode(icocode);
  return (
    <AppLayout>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            className="max-w-sm rounded-lg shadow-2xl"
            src="/images/air-quality-index.jpeg"
            alt="Air Quality Index Meter"
            width={300}
            height={300}
          />
          <div>
            <h2 className="text-4xl font-bold">
              {airInfoDetails.isoCode}-{airInfoDetails.country}
            </h2>
            <div className="badge badge-primary mr-4">
              {airInfoDetails.airQualityIndex}
            </div>
            <div className="badge badge-secondary mr-4">{`Population - ${airInfoDetails.population}`}</div>
            <p className="py-6">{`The above air quality information is showing for the country ${airInfoDetails.country} as per the air quality index record of the year 2022.`}</p>
            <Link href={'/airinfo'} className="link link-primary">
              Back To Air Info
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AirInfoDetailsPage;
