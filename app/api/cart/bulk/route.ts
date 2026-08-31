import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyUserToken, USER_COOKIE_NAME } from '@/lib/auth/user-jwt';

// Helper to resolve user_id from JWT token (cookie/header) or explicit request param
async function getUserIdFromRequest(
  request: NextRequest,
  explicitUserId?: any
): Promise<number | null> {
  // 1. Check HTTP-only Cookie
  let token = request.cookies.get(USER_COOKIE_NAME)?.value;

  // 2. Check Authorization Header (Bearer token)
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

  // 3. Fallback to explicit user_id if provided
  if (explicitUserId !== undefined && explicitUserId !== null && explicitUserId !== '') {
    const parsed = Number(explicitUserId);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

// Helper to fetch complete cart items & summary for a user
async function fetchUserCart(userId: number) {
  const cartRows = await query<any[]>(
    `SELECT 
        c.id as cart_id,
        c.user_id,
        c.subcategory_id,
        c.quantity,
        c.created_at as cart_created_at,
        c.updated_at as cart_updated_at,
        s.subcategory_name,
        s.status as subcategory_status,
        s.amount,
        s.stock,
        s.offer,
        s.category_id,
        cat.category_name,
        cat.category_type,
        cat.status as category_status
     FROM cart c
     JOIN subcategories s ON c.subcategory_id = s.id
     JOIN categories cat ON s.category_id = cat.id
     WHERE c.user_id = ?
     ORDER BY c.updated_at DESC`,
    [userId]
  );

  if (!cartRows || cartRows.length === 0) {
    return {
      cartItems: [],
      cartSummary: {
        totalItems: 0,
        itemCount: 0,
        totalAmount: 0,
      },
    };
  }

  const subcategoryIds = [...new Set(cartRows.map((row) => row.subcategory_id))];
  const imagesMap: Record<number, string[]> = {};

  if (subcategoryIds.length > 0) {
    const imgRows = await query<any[]>(
      `SELECT subcategory_id, image_url 
       FROM subcategory_images 
       WHERE subcategory_id IN (${subcategoryIds.map(() => '?').join(',')}) 
       ORDER BY is_primary DESC, id ASC`,
      subcategoryIds
    );

    imgRows.forEach((imgRow) => {
      if (!imagesMap[imgRow.subcategory_id]) {
        imagesMap[imgRow.subcategory_id] = [];
      }
      imagesMap[imgRow.subcategory_id].push(imgRow.image_url);
    });
  }

  let totalItems = 0;
  let totalAmount = 0;

  const formattedItems = cartRows.map((row) => {
    const unitPrice = Number(row.amount) || 0;
    const qty = Number(row.quantity) || 0;
    const itemTotal = unitPrice * qty;

    totalItems += qty;
    totalAmount += itemTotal;

    const itemImages = imagesMap[row.subcategory_id] || [];

    return {
      id: row.cart_id,
      cartId: row.cart_id,
      userId: row.user_id,
      subcategoryId: row.subcategory_id,
      quantity: qty,
      itemTotal: Number(itemTotal.toFixed(2)),
      subcategory: {
        id: row.subcategory_id,
        subcategoryName: row.subcategory_name,
        amount: unitPrice,
        stock: row.stock !== null && row.stock !== undefined ? Number(row.stock) : null,
        offer: Number(row.offer || 0),
        status: row.subcategory_status,
        images: itemImages,
        primaryImage: itemImages[0] || '',
        category: {
          id: row.category_id,
          categoryName: row.category_name,
          categoryType: row.category_type,
          status: row.category_status,
        },
      },
      createdAt: row.cart_created_at,
      updatedAt: row.cart_updated_at,
    };
  });

  return {
    cartItems: formattedItems,
    cartSummary: {
      totalItems,
      itemCount: formattedItems.length,
      totalAmount: Number(totalAmount.toFixed(2)),
    },
  };
}

export interface BulkCartItemInput {
  subcategory_id?: number;
  subcategoryId?: number;
  product_id?: number;
  productId?: number;
  quantity?: number;
  action?: 'add' | 'set';
}

/**
 * POST /api/cart/bulk
 * Bulk add/update items in the user's shopping cart.
 *
 * Payload options:
 * - mode: "merge" (default - merges with existing cart items) or "replace" (clears existing cart before adding)
 * - defaultAction: "add" (default - increments quantity) or "set" (overwrites quantity)
 * - items: Array of { subcategory_id, quantity, action? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    
    // Extract user identification
    const rawUserId = body.user_id || body.userId;
    const userId = await getUserIdFromRequest(request, rawUserId);

    if (!userId) {
      return NextResponse.json(
        { error: 'User identification required. Please log in or provide a valid user ID.' },
        { status: 401 }
      );
    }

    // Extract items array (supports body as array directly or body.items / body.cartItems / body.products)
    let rawItems: any[] = [];
    if (Array.isArray(body)) {
      rawItems = body;
    } else if (Array.isArray(body.items)) {
      rawItems = body.items;
    } else if (Array.isArray(body.cartItems)) {
      rawItems = body.cartItems;
    } else if (Array.isArray(body.products)) {
      rawItems = body.products;
    }

    if (!rawItems || rawItems.length === 0) {
      return NextResponse.json(
        { error: 'Bulk cart operation requires a non-empty array of items.' },
        { status: 400 }
      );
    }

    const mode = (body.mode || 'merge').toString().toLowerCase(); // 'merge' | 'replace'
    const globalDefaultAction = (body.action || body.defaultAction || 'add').toString().toLowerCase();

    // 1. Sanitize & parse item inputs
    const parsedItems: { subcategoryId: number; quantity: number; action: 'add' | 'set' }[] = [];
    
    for (let i = 0; i < rawItems.length; i++) {
      const rawItem = rawItems[i];
      const rawSubId = rawItem.subcategory_id || rawItem.subcategoryId || rawItem.product_id || rawItem.productId;
      const subcategoryId = parseInt(rawSubId, 10);

      if (isNaN(subcategoryId) || subcategoryId < 1) {
        return NextResponse.json(
          { error: `Item at index ${i} has an invalid or missing subcategory_id.` },
          { status: 400 }
        );
      }

      let quantity = rawItem.quantity !== undefined && rawItem.quantity !== null ? parseInt(rawItem.quantity, 10) : 1;
      if (isNaN(quantity) || quantity < 1) {
        return NextResponse.json(
          { error: `Quantity for subcategory_id ${subcategoryId} at index ${i} must be a positive integer (at least 1).` },
          { status: 400 }
        );
      }

      const itemAction = rawItem.action ? rawItem.action.toString().toLowerCase() : globalDefaultAction;
      const validAction: 'add' | 'set' = itemAction === 'set' ? 'set' : 'add';

      parsedItems.push({
        subcategoryId,
        quantity,
        action: validAction,
      });
    }

    // 2. Fetch subcategories & categories info for all requested items
    const uniqueSubIds = [...new Set(parsedItems.map((item) => item.subcategoryId))];
    const subCheckRows = await query<any[]>(
      `SELECT s.id, s.subcategory_name, s.amount, s.stock, s.status, c.status as category_status 
       FROM subcategories s 
       JOIN categories c ON s.category_id = c.id 
       WHERE s.id IN (${uniqueSubIds.map(() => '?').join(',')})`,
      uniqueSubIds
    );

    const subMap: Record<number, any> = {};
    subCheckRows.forEach((row) => {
      subMap[row.id] = row;
    });

    // Check availability of all items
    for (const itemInput of parsedItems) {
      const sub = subMap[itemInput.subcategoryId];
      if (!sub) {
        return NextResponse.json(
          { error: `SubCategory product with ID ${itemInput.subcategoryId} does not exist.` },
          { status: 404 }
        );
      }

      if (sub.status !== 'active' || sub.category_status !== 'active') {
        return NextResponse.json(
          { error: `Item "${sub.subcategory_name}" (ID: ${itemInput.subcategoryId}) is currently unavailable.` },
          { status: 400 }
        );
      }
    }

    // 3. If mode === 'replace', clear current cart first
    if (mode === 'replace') {
      await query('DELETE FROM cart WHERE user_id = ?', [userId]);
    }

    // Fetch existing cart rows for user to compute final quantities & stock validation
    const existingCartRows = await query<any[]>(
      'SELECT id, subcategory_id, quantity FROM cart WHERE user_id = ?',
      [userId]
    );

    const existingCartMap: Record<number, { id: number; quantity: number }> = {};
    if (existingCartRows && Array.isArray(existingCartRows)) {
      existingCartRows.forEach((row) => {
        existingCartMap[row.subcategory_id] = {
          id: row.id,
          quantity: Number(row.quantity),
        };
      });
    }

    // Aggregate quantities if payload contains duplicate subcategory_ids
    const targetQuantities: Record<number, number> = {};

    for (const itemInput of parsedItems) {
      const subId = itemInput.subcategoryId;
      const currentQtyInCart = existingCartMap[subId] ? existingCartMap[subId].quantity : 0;
      
      if (itemInput.action === 'set') {
        targetQuantities[subId] = itemInput.quantity;
      } else {
        // 'add'
        const baseQty = targetQuantities[subId] !== undefined 
          ? targetQuantities[subId] 
          : (mode === 'replace' ? 0 : currentQtyInCart);
        targetQuantities[subId] = baseQty + itemInput.quantity;
      }
    }

    // 4. Validate stock limits for all final target quantities
    for (const subIdStr of Object.keys(targetQuantities)) {
      const subId = Number(subIdStr);
      const finalQty = targetQuantities[subId];
      const sub = subMap[subId];

      if (sub && sub.stock !== null && sub.stock !== undefined) {
        const availableStock = Number(sub.stock);
        if (finalQty > availableStock) {
          return NextResponse.json(
            {
              error: `Requested total quantity (${finalQty}) exceeds available stock (${availableStock}) for "${sub.subcategory_name}".`,
              subcategoryId: subId,
              requestedQuantity: finalQty,
              availableStock,
            },
            { status: 400 }
          );
        }
      }
    }

    // 5. Apply database inserts / updates for all items
    for (const subIdStr of Object.keys(targetQuantities)) {
      const subId = Number(subIdStr);
      const finalQty = targetQuantities[subId];
      const existingRecord = existingCartMap[subId];

      if (existingRecord) {
        await query(
          'UPDATE cart SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [finalQty, existingRecord.id]
        );
      } else {
        await query(
          'INSERT INTO cart (user_id, subcategory_id, quantity) VALUES (?, ?, ?)',
          [userId, subId, finalQty]
        );
      }
    }

    // 6. Retrieve and return refreshed cart data & summary
    const { cartItems, cartSummary } = await fetchUserCart(userId);

    return NextResponse.json(
      {
        success: true,
        message: `Bulk cart creation completed successfully (${Object.keys(targetQuantities).length} items processed)`,
        mode,
        processedCount: Object.keys(targetQuantities).length,
        data: cartItems,
        cartSummary,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error creating bulk cart:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to perform bulk cart creation' },
      { status: 500 }
    );
  }
}
