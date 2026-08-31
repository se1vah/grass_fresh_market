import { NextRequest } from 'next/server';
import { GET as handleGetAllCart } from '../route';

/**
 * GET /api/cart/get-all
 * Alias endpoint for getAllCart API.
 */
export async function GET(request: NextRequest) {
  return handleGetAllCart(request);
}
