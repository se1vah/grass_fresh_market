import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';
import { verifyShopToken, SHOP_COOKIE_NAME } from '@/lib/auth/shop-jwt';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SHOP_COOKIE_NAME)?.value;
    const user = token ? await verifyShopToken(token) : null;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Category Stats
    const rows = await query<any[]>('SELECT COUNT(*) as total FROM categories');
    const totalCategories = rows[0]?.total ? Number(rows[0].total) : 0;

    const activeRows = await query<any[]>("SELECT COUNT(*) as total FROM categories WHERE status = 'active'");
    const activeCategories = activeRows[0]?.total ? Number(activeRows[0].total) : 0;

    // SubCategory Stats (for subcategories under active parent categories)
    const subRows = await query<any[]>(
      `SELECT COUNT(*) as total 
       FROM subcategories s 
       JOIN categories c ON s.category_id = c.id 
       WHERE c.status = 'active'`
    );
    const totalSubCategories = subRows[0]?.total ? Number(subRows[0].total) : 0;

    const activeSubRows = await query<any[]>(
      `SELECT COUNT(*) as total 
       FROM subcategories s 
       JOIN categories c ON s.category_id = c.id 
       WHERE s.status = 'active' AND c.status = 'active'`
    );
    const activeSubCategories = activeSubRows[0]?.total ? Number(activeSubRows[0].total) : 0;

    return NextResponse.json({
      success: true,
      totalCategories,
      activeCategories,
      inactiveCategories: totalCategories - activeCategories,
      totalSubCategories,
      activeSubCategories,
      inactiveSubCategories: totalSubCategories - activeSubCategories,
    });
  } catch (error: any) {
    console.error('Error fetching shop stats:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
