import { NextRequest } from 'next/server';
import { POST as handleBulkCart } from '../bulk/route';

/**
 * POST /api/cart/create-bulk
 * Alias endpoint for bulk cart creation API.
 */
export async function POST(request: NextRequest) {
  return handleBulkCart(request);
}
