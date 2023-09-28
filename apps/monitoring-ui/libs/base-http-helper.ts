import axios from 'axios';
import { NextResponse } from 'next/server';

export const API_BASE_URL =
  process.env.MONITORING_API_BASE_URL || 'http://localhost:3000/api';
const commonOptions = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const get = async (endpoint: string, token: string, options = {}) => {
  Object.assign(options, commonOptions(token));
  return axios
    .get(`${API_BASE_URL}/${endpoint}`, options)
    .catch((error) => handleHttpError(error));
};

export const post = async (endpoint: string, token: string, options = {}) => {
  Object.assign(options, commonOptions(token));
  return axios
    .post(`${API_BASE_URL}/${endpoint}`, options)
    .catch((error) => handleHttpError(error));
};

export const patch = async (endpoint: string, token: string, options = {}) => {
  Object.assign(options, commonOptions(token));
  return axios
    .patch(`${API_BASE_URL}/${endpoint}`, options)
    .catch((error) => handleHttpError(error));
};

export const remove = async (endpoint: string, token: string, options = {}) => {
  Object.assign(options, commonOptions(token));
  return axios
    .delete(`${API_BASE_URL}/${endpoint}`, options)
    .catch((error) => handleHttpError(error));
};

export const handleHttpError = (error: any) => {
  const { statusCode } = error.response.data;

  if (statusCode !== 401) {
    throw error;
  } else {
    return handle401();
  }
};

export const handle401 = () => {
  NextResponse.redirect(new URL('/login'));
};
