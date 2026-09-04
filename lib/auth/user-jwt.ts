import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

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

/**
 * Resolves user_id from JWT token (cookie or Authorization header) or explicit request parameter/body field.
 */
export async function getUserIdFromRequest(
  request: NextRequest,
  explicitUserId?: any
): Promise<number | null> {
  // 1. Check HTTP-only Cookie
  let token = request.cookies.get(USER_COOKIE_NAME)?.value;

  // 2. Check Authorization Header (Bearer token)
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  if (token) {
    const payload = await verifyUserToken(token);
    if (payload && payload.id) {
      return Number(payload.id);
    }
  }

  // 3. Fallback to explicit user_id if provided
  if (explicitUserId !== undefined && explicitUserId !== null && explicitUserId !== '') {
    const parsed = Number(explicitUserId);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

