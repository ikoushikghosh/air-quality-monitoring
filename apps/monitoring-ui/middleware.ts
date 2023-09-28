import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from './libs/auth';

const AUTH_PAGES = ['/login', '/signup', '/_next/static', '/favicon'];
const cookieKey = 'accessToken';

const isAuthPages = (url: string) => {
  return AUTH_PAGES.some((page) => url.startsWith(page));
};

export async function middleware(req: NextRequest) {
  const { url, nextUrl, cookies } = req;
  const { value: token } = cookies.get(cookieKey) ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);
  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete(cookieKey);
      return response;
    }

    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set('next', nextUrl.pathname);

    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );
    response.cookies.delete(cookieKey);

    return response;
  }
  return NextResponse.next();
}

export const config = { matcher: ['/login', '/:path*'] };
