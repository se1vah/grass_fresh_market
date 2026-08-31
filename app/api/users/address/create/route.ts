import { NextRequest } from 'next/server';
import { POST as handlePost } from '../route';

/**
 * POST /api/users/address/create
 * Alias endpoint to create a user address.
 */
export async function POST(request: NextRequest) {
  return handlePost(request);
}
