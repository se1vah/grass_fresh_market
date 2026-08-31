import { NextRequest } from 'next/server';
import {
  GET as handleGet,
  POST as handlePost,
  PUT as handlePut,
  DELETE as handleDelete,
} from '../../users/address/route';

/**
 * /api/user/address (Alias for /api/users/address)
 */
export async function GET(request: NextRequest) {
  return handleGet(request);
}

export async function POST(request: NextRequest) {
  return handlePost(request);
}

export async function PUT(request: NextRequest) {
  return handlePut(request);
}

export async function DELETE(request: NextRequest) {
  return handleDelete(request);
}
