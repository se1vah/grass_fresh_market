import { SignJWT, jwtVerify } from 'jose';

export const USER_COOKIE_NAME = 'user_token';

export interface UserJwtPayload {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
}

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET || 'fallback-user-jwt-secret-key-change-in-prod';
  return new TextEncoder().encode(secret);
}

export async function signUserToken(payload: UserJwtPayload): Promise<string> {
  const secretKey = getJwtSecretKey();
  return new SignJWT({
    id: payload.id,
    fullName: payload.fullName,
    email: payload.email,
    phoneNumber: payload.phoneNumber || '',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function verifyUserToken(token: string): Promise<UserJwtPayload | null> {
  try {
    const secretKey = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secretKey);

    if (!payload.id || !payload.email) {
      return null;
    }

    return {
      id: Number(payload.id),
      fullName: String(payload.fullName || ''),
      email: String(payload.email),
      phoneNumber: payload.phoneNumber ? String(payload.phoneNumber) : (payload.phone ? String(payload.phone) : ''),
    };
  } catch (err) {
    return null;
  }
}

export function getUserCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  };
}
