import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyUserToken, USER_COOKIE_NAME } from '@/lib/auth/user-jwt';
import path from 'path';
import fs from 'fs/promises';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Helper to resolve user_id from JWT token or request
async function getUserIdFromRequest(
  request: NextRequest,
  explicitUserId?: any
): Promise<number | null> {
  // 1. Check Cookie
  let token = request.cookies.get(USER_COOKIE_NAME)?.value;

  // 2. Check Authorization Header
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  if (token) {
    const payload = await verifyUserToken(token);
    if (payload && payload.id) {
      return Number(payload.id);
    }
  }

  // 3. Fallback to explicit user_id parameter
  if (explicitUserId !== undefined && explicitUserId !== null && explicitUserId !== '') {
    const parsed = Number(explicitUserId);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

// Helper to format user profile response object
function formatUserProfile(row: any) {
  return {
    id: row.id,
    fullName: row.fullName || '',
    full_name: row.fullName || '',
    email: row.email || '',
    phoneNumber: row.phoneNumber || '',
    phone_number: row.phoneNumber || '',
    profileImage: row.profileImage || '',
    profile_image: row.profileImage || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * GET /api/users/profile (or /api/user/profile)
 * Retrieves user profile details.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const rawUserId = searchParams.get('userId') || searchParams.get('user_id') || searchParams.get('id');

    const userId = await getUserIdFromRequest(request, rawUserId);

    if (!userId) {
      return NextResponse.json(
        { error: 'User identification required. Please log in or provide a valid user ID.' },
        { status: 401 }
      );
    }

    const rows = await query<any[]>(
      'SELECT id, fullName, email, phoneNumber, profileImage, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'User profile not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User profile retrieved successfully',
      user: formatUserProfile(rows[0]),
    });
  } catch (error: any) {
    console.error('Error retrieving user profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve user profile' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users/profile (or /api/user/profile or /api/user/profile/upload)
 * Uploads user profile photo and updates profile information.
 * Automatically deletes the old profile photo from server disk if updated.
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let bodyData: any = {};
    let imageFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      bodyData = {
        userId: formData.get('userId') || formData.get('user_id'),
        fullName: formData.get('fullName') || formData.get('full_name'),
        phoneNumber: formData.get('phoneNumber') || formData.get('phone_number'),
        email: formData.get('email'),
      };

      const fileInput = formData.get('profileImage') || formData.get('profile_image') || formData.get('image') || formData.get('photo') || formData.get('file');
      if (fileInput && fileInput instanceof File) {
        imageFile = fileInput;
      }
    } else {
      bodyData = await request.json().catch(() => ({}));
    }

    const rawUserId = bodyData.userId || bodyData.user_id;
    const userId = await getUserIdFromRequest(request, rawUserId);

    if (!userId) {
      return NextResponse.json(
        { error: 'User identification required. Please log in or provide a valid user ID.' },
        { status: 401 }
      );
    }

    // Verify existing user
    const existingRows = await query<any[]>(
      'SELECT id, fullName, email, phoneNumber, profileImage FROM users WHERE id = ?',
      [userId]
    );

    if (!existingRows || existingRows.length === 0) {
      return NextResponse.json(
        { error: 'User record not found.' },
        { status: 404 }
      );
    }

    const existingUser = existingRows[0];

    // Determine updated field values
    const fullName = bodyData.fullName !== undefined && bodyData.fullName !== null
      ? bodyData.fullName.toString().trim()
      : existingUser.fullName;

    const phoneNumber = bodyData.phoneNumber !== undefined && bodyData.phoneNumber !== null
      ? bodyData.phoneNumber.toString().trim()
      : existingUser.phoneNumber;

    let newPublicImagePath = existingUser.profileImage || '';

    // Handle Profile Photo Upload if a new file was provided
    if (imageFile) {
      if (!ALLOWED_MIME_TYPES.includes(imageFile.type)) {
        return NextResponse.json(
          { error: 'Invalid image format. Allowed formats: JPG, JPEG, PNG, WEBP' },
          { status: 400 }
        );
      }

      if (imageFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'Image size exceeds 5MB limit' },
          { status: 400 }
        );
      }

      // Determine file extension
      let ext = 'jpg';
      if (imageFile.type.includes('png')) ext = 'png';
      else if (imageFile.type.includes('webp')) ext = 'webp';
      else if (imageFile.type.includes('jpeg') || imageFile.type.includes('jpg')) ext = 'jpg';

      const filename = `user-${userId}-${Date.now()}.${ext}`;
      const uploadDir = path.join(process.cwd(), 'public', 'images', 'profile');

      // Ensure upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      const newFilePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(newFilePath, buffer);

      newPublicImagePath = `/images/profile/${filename}`;

      // DELETE OLD PROFILE PHOTO FILE FROM SERVER DISK IF IT EXISTS
      const oldProfileImage = existingUser.profileImage;
      if (oldProfileImage && typeof oldProfileImage === 'string' && oldProfileImage.startsWith('/images/profile/')) {
        try {
          const oldFilePath = path.join(process.cwd(), 'public', oldProfileImage);
          await fs.unlink(oldFilePath).catch((err) => {
            console.warn('Old profile photo could not be deleted or was missing:', err?.message || err);
          });
        } catch (unlinkErr) {
          console.warn('Failed to delete old profile photo:', unlinkErr);
        }
      }
    }

    // Update database record
    await query(
      'UPDATE users SET fullName = ?, phoneNumber = ?, profileImage = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [fullName, phoneNumber, newPublicImagePath, userId]
    );

    // Retrieve updated user profile
    const updatedRows = await query<any[]>(
      'SELECT id, fullName, email, phoneNumber, profileImage, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );

    return NextResponse.json({
      success: true,
      message: 'User profile updated successfully',
      user: formatUserProfile(updatedRows[0]),
    });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
