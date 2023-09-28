'use server';

import { cookies } from 'next/headers';

export async function setCookie(accessToken: string) {
  cookies().set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    path: '/',
  });
}
