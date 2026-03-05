import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoute = ['/profile', '/cart'];
const authRoute = ['/login', '/register'];

export default async function middleware(req: NextRequest) {

  const token = await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  const path = req.nextUrl.pathname;

  if (protectedRoute.includes(path)) {
    if (!token) {
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('url', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (authRoute.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/cart', '/login', '/register'],
};