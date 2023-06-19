import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export { default } from 'next-auth/middleware'

export const middleware = async (req) => {
  const token = await getToken({
    req,
    secret: process?.env?.NEXTAUTH_SECRET
  });
  // const session = getServerSession()
  console.log('token', token)
  // console.log('session', session)

  const isAdmin = token?.role === 'admin'

  // redirect user without access to login
  if (!token) {
    return NextResponse.redirect("http://localhost:3000/signin");
  }

  if (req.url.includes('/orders') && !isAdmin) {
    return NextResponse.redirect("http://localhost:3000/accessRestricted");
  }

  if (req.url.includes('/settings') && !isAdmin) {
    return NextResponse.redirect("http://localhost:3000/accessRestricted")
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products",
    "/categories",
    "/orders:path*",
    "/settings:path*",
  ]
}