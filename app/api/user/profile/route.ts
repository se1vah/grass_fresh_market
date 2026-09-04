import { NextRequest } from 'next/server';
import { GET as handleGet, POST as handlePost, PUT as handlePut } from '../../users/profile/route';

/**
 * /api/user/profile (Alias for /api/users/profile)
 * Handles GET (view profile), POST (upload photo), and PUT (update details/password).
 */
export async function GET(request: NextRequest) {
  return handleGet(request);
}

export async function POST(request: NextRequest) {
  return handlePost(request);
}

export async function PUT(request: NextRequest) {
  return handlePut(request);
}
