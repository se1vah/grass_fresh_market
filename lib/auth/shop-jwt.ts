import { SignJWT, jwtVerify } from 'jose';

export const SHOP_COOKIE_NAME = 'shop_token';

export interface ShopJwtPayload {
  id: string;
  email: string;
  isSuperAdmin: boolean;
}

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET || 'fallback-shop-jwt-secret-key-change-in-prod';
  return new TextEncoder().encode(secret);
}

export async function signShopToken(payload: ShopJwtPayload): Promise<string> {
  const secretKey = getJwtSecretKey();
  return new SignJWT({
    id: payload.id,
    email: payload.email,
    isSuperAdmin: payload.isSuperAdmin,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function verifyShopToken(token: string): Promise<ShopJwtPayload | null> {
  try {
    const secretKey = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    
    if (!payload.id || !payload.email) {
      return null;
    }

    return {
      id: payload.id as string,
      email: payload.email as string,
      isSuperAdmin: Boolean(payload.isSuperAdmin),
    };
  } catch (err) {
    return null;
  }
}

export function getShopCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  };
}
