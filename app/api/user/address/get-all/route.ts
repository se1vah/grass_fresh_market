import { NextRequest } from 'next/server';
import { GET as handleGet } from '../route';

/**
 * GET /api/user/address/get-all
 * Retrieves all user addresses for the authenticated user or specified userId parameter.
 */
export async function GET(request: NextRequest) {
  return handleGet(request);
}
