import { NextRequest } from 'next/server';
import { GET as handleGetAllUsers } from '../../users/get-all/route';

/**
 * GET /api/user/get-all
 * Alias endpoint for get all user details API.
 */
export async function GET(request: NextRequest) {
  return handleGetAllUsers(request);
}
