import { NextRequest } from 'next/server';
import { POST as handleAddCart } from '../route';

/**
 * POST /api/cart/add
 * Alias endpoint for addCart API.
 */
export async function POST(request: NextRequest) {
  return handleAddCart(request);
}
