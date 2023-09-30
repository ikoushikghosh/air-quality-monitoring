'use server';

import { post } from '../libs/base-http-helper';
import { SignIn } from '../models/SignIn';
import { setCookie } from './set-cookie';

export async function signin(params: SignIn): Promise<SignIn> {
  const { username, password } = params;
  const apiUrl = `auth/signin`;
  const response = await post(apiUrl, '', { username, password });
  const accessToken = response.data.accessToken;
  if (accessToken) {
    await setCookie(accessToken);
  }
  return { ...params, accessToken: accessToken };
}

export async function signup(params: SignIn): Promise<SignIn> {
  const { username, password } = params;
  const apiUrl = `auth/signup`;
  await post(apiUrl, '', { username, password });
  return params;
}
