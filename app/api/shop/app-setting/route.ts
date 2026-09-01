import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/shop/app-setting
export async function GET() {
  try {
    const rows = await query<any[]>(
      'SELECT id, email, phone_number, created_at, updated_at FROM app_settings ORDER BY id DESC LIMIT 1'
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          id: 0,
          email: '',
          phone_number: '',
          phoneNumber: '',
        },
      });
    }

    const setting = rows[0];
    return NextResponse.json({
      success: true,
      data: {
        id: setting.id,
        email: setting.email || '',
        phoneNumber: setting.phone_number || '',
        created_at: setting.created_at,
        updated_at: setting.updated_at,
      },
    });
  } catch (error: any) {
    console.error('Error fetching app settings:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch app settings' },
      { status: 500 }
    );
  }
}

// Helper to process setting update logic
async function handleUpdateSetting(request: NextRequest) {
  try {
    const body = await request.json();
    const emailInput = body?.email;
    const phoneInput = body?.phone_number ?? body?.phoneNumber;

    // Validation
    if (!emailInput || typeof emailInput !== 'string' || !emailInput.trim()) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    const cleanEmail = emailInput.trim();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!phoneInput || typeof phoneInput !== 'string' || !phoneInput.trim()) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const cleanPhone = phoneInput.trim();

    // Check if an app_setting row exists
    const existing = await query<any[]>(
      'SELECT id FROM app_settings ORDER BY id DESC LIMIT 1'
    );

    let settingId: number;

    if (existing && existing.length > 0) {
      settingId = Number(existing[0].id);
      await query(
        'UPDATE app_settings SET email = ?, phone_number = ? WHERE id = ?',
        [cleanEmail, cleanPhone, settingId]
      );
    } else {
      const result = await query<any>(
        'INSERT INTO app_settings (email, phone_number) VALUES (?, ?)',
        [cleanEmail, cleanPhone]
      );
      settingId = Number(result.insertId);
    }

    // Fetch updated row
    const updatedRows = await query<any[]>(
      'SELECT id, email, phone_number, created_at, updated_at FROM app_settings WHERE id = ?',
      [settingId]
    );

    const updatedSetting = updatedRows[0] || {
      id: settingId,
      email: cleanEmail,
      phone_number: cleanPhone,
    };

    return NextResponse.json({
      success: true,
      message: 'App settings updated successfully',
      data: {
        id: updatedSetting.id,
        email: updatedSetting.email,
        phoneNumber: updatedSetting.phone_number,
        updated_at: updatedSetting.updated_at,
      },
    });
  } catch (error: any) {
    console.error('Error updating app settings:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update app settings' },
      { status: 500 }
    );
  }
}

// PUT /api/shop/app-setting
export async function PUT(request: NextRequest) {
  return handleUpdateSetting(request);
}

// POST /api/shop/app-setting (Support both PUT and POST methods)
export async function POST(request: NextRequest) {
  return handleUpdateSetting(request);
}
