import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Helper to sanitize slug format if needed
function sanitizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    let page = parseInt(searchParams.get('page') || '1', 10);
    let limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = (searchParams.get('search') || '').trim();
    const status = (searchParams.get('status') || '').trim();

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const whereConditions: string[] = [];
    const queryParams: any[] = [];

    // Search filter across page_name, slug, page_title
    if (search) {
      whereConditions.push('(page_name LIKE ? OR slug LIKE ? OR page_title LIKE ?)');
      const searchPattern = `%${search}%`;
      queryParams.push(searchPattern, searchPattern, searchPattern);
    }

    // Status filter
    if (status && status !== 'All') {
      whereConditions.push('status = ?');
      queryParams.push(status);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Fetch total count for pagination
    const countSql = `SELECT COUNT(*) as total FROM cms_pages ${whereClause}`;
    const countResult = await query<any[]>(countSql, queryParams);
    const total = countResult[0]?.total ? Number(countResult[0].total) : 0;

    const totalPages = Math.ceil(total / limit) || 1;

    if (page > totalPages && totalPages > 0) {
      page = totalPages;
    }

    const offset = (page - 1) * limit;

    // Fetch CMS pages
    const listSql = `SELECT id, page_name, slug, page_title, meta_description, content, status, created_at, updated_at FROM cms_pages ${whereClause} ORDER BY id DESC LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;
    const rows = await query<any[]>(listSql, queryParams);

    return NextResponse.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error('Error fetching CMS pages:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch CMS pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page_name, slug, page_title, meta_description, content, status } = body || {};

    // 1. Validation for required fields
    if (!page_name || !String(page_name).trim()) {
      return NextResponse.json({ error: 'Page Name is required' }, { status: 400 });
    }

    if (!slug || !String(slug).trim()) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    if (!page_title || !String(page_title).trim()) {
      return NextResponse.json({ error: 'Page Title is required' }, { status: 400 });
    }

    if (!meta_description || !String(meta_description).trim()) {
      return NextResponse.json({ error: 'Meta Description is required' }, { status: 400 });
    }

    if (!content || !String(content).trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const validStatus = status === 'Inactive' ? 'Inactive' : 'Active';
    const cleanSlug = sanitizeSlug(String(slug));

    if (!cleanSlug) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 });
    }

    // 2. Check slug uniqueness
    const existingSlug = await query<any[]>('SELECT id FROM cms_pages WHERE slug = ?', [cleanSlug]);
    if (existingSlug.length > 0) {
      return NextResponse.json(
        { error: `Slug "${cleanSlug}" already exists. Please enter a unique slug.` },
        { status: 400 }
      );
    }

    // 3. Insert into database
    const insertSql = `
      INSERT INTO cms_pages (page_name, slug, page_title, meta_description, content, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const insertParams = [
      String(page_name).trim(),
      cleanSlug,
      String(page_title).trim(),
      String(meta_description).trim(),
      String(content).trim(),
      validStatus,
    ];

    const result = await query<any>(insertSql, insertParams);

    const newPage = {
      id: result.insertId,
      page_name: String(page_name).trim(),
      slug: cleanSlug,
      page_title: String(page_title).trim(),
      meta_description: String(meta_description).trim(),
      content: String(content).trim(),
      status: validStatus,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'CMS page created successfully',
        data: newPage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating CMS page:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create CMS page' },
      { status: 500 }
    );
  }
}
