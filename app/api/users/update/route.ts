import { NextRequest } from 'next/server';
import { PUT as handlePut } from '../profile/route';

/**
 * PUT /api/users/update
 * Alias endpoint for updating user profile details and password.
 */
export async function PUT(request: NextRequest) {
  return handlePut(request);
}
