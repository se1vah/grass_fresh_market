import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyShopToken, SHOP_COOKIE_NAME } from '@/lib/auth/shop-jwt';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to /shop routes
  if (pathname.startsWith('/shop')) {
    const token = request.cookies.get(SHOP_COOKIE_NAME)?.value;
    const payload = token ? await verifyShopToken(token) : null;
    const isAuthenticated = !!payload;

    // Login page handling
    if (pathname === '/shop/login') {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/shop', request.url));
      }
      return NextResponse.next();
    }

    // Protected shop routes
    if (!isAuthenticated) {
      const loginUrl = new URL('/shop/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/shop/:path*'],
};
