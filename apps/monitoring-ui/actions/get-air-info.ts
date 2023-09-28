'use server';
import { cookies } from 'next/headers';
import { get } from '../libs/base-http-helper';
import { AirInfo } from '../models/AirInfo';

export async function getAirInfo(page: number): Promise<AirInfo[]> {
  const perPage = 5;
  const apiUrl = `air?page=${page}&per_page=${perPage}`;
  const { value: token } = cookies().get('accessToken') ?? { value: '' };
  const response = await get(apiUrl, token, {});
  const { airInfo: result } = response.data;
  return result as AirInfo[];
}
