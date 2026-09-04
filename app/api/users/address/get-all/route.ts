import { NextRequest } from 'next/server';
import { GET as handleGet } from '../route';

/**
 * GET /api/users/address/get-all
 * Retrieves all user addresses.
 */
export async function GET(request: NextRequest) {
  return handleGet(request);
}
