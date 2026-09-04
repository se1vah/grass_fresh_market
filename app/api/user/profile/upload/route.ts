import { NextRequest } from 'next/server';
import { POST as handlePost } from '../route';

/**
 * POST /api/user/profile/upload
 * Alias endpoint for uploading user profile photo and updating profile information.
 */
export async function POST(request: NextRequest) {
  return handlePost(request);
}
