import { NextRequest } from 'next/server';
import { POST as handlePost } from '../route';

/**
 * POST /api/user/address/create
 * Creates a new user address.
 * Data: address(id, userId, addressType("home", "office", "other"), street, buildingName, city, state, zipcode, isDefault)
 */
export async function POST(request: NextRequest) {
  return handlePost(request);
}
