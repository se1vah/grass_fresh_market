import { NextResponse } from 'next/server';
import { SHOP_COOKIE_NAME } from '@/lib/auth/shop-jwt';

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear shop_token cookie by setting maxAge: 0 and expires: past date
    response.cookies.set(SHOP_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Error during shop logout:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
