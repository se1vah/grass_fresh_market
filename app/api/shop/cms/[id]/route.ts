import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

function sanitizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// GET /api/shop/cms/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pageId = parseInt(id, 10);

    if (isNaN(pageId)) {
      return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
    }

    const rows = await query<any[]>('SELECT * FROM cms_pages WHERE id = ? LIMIT 1', [pageId]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'CMS page not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
    });
  } catch (error: any) {
    console.error('Error fetching CMS page by ID:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch CMS page' },
      { status: 500 }
    );
  }
}

// PUT /api/shop/cms/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pageId = parseInt(id, 10);

    if (isNaN(pageId)) {
      return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
    }

    const existingRows = await query<any[]>('SELECT id FROM cms_pages WHERE id = ? LIMIT 1', [pageId]);
    if (!existingRows || existingRows.length === 0) {
      return NextResponse.json({ error: 'CMS page not found' }, { status: 404 });
    }

    const body = await request.json();
    const { page_name, slug, page_title, meta_description, content, status } = body || {};

    // Form validations
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

    // Slug uniqueness check (exclude current record ID)
    const duplicateSlug = await query<any[]>(
      'SELECT id FROM cms_pages WHERE slug = ? AND id != ? LIMIT 1',
      [cleanSlug, pageId]
    );

    if (duplicateSlug && duplicateSlug.length > 0) {
      return NextResponse.json(
        { error: `Slug "${cleanSlug}" is already in use by another page. Please choose a unique slug.` },
        { status: 400 }
      );
    }

    // Update query
    const updateSql = `
      UPDATE cms_pages
      SET page_name = ?,
          slug = ?,
          page_title = ?,
          meta_description = ?,
          content = ?,
          status = ?
      WHERE id = ?
    `;

    const updateParams = [
      String(page_name).trim(),
      cleanSlug,
      String(page_title).trim(),
      String(meta_description).trim(),
      String(content).trim(),
      validStatus,
      pageId,
    ];

    await query(updateSql, updateParams);

    const updatedPage = {
      id: pageId,
      page_name: String(page_name).trim(),
      slug: cleanSlug,
      page_title: String(page_title).trim(),
      meta_description: String(meta_description).trim(),
      content: String(content).trim(),
      status: validStatus,
    };

    return NextResponse.json({
      success: true,
      message: 'CMS page updated successfully',
      data: updatedPage,
    });
  } catch (error: any) {
    console.error('Error updating CMS page:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update CMS page' },
      { status: 500 }
    );
  }
}

// DELETE /api/shop/cms/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pageId = parseInt(id, 10);

    if (isNaN(pageId)) {
      return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
    }

    const existingRows = await query<any[]>('SELECT id FROM cms_pages WHERE id = ? LIMIT 1', [pageId]);
    if (!existingRows || existingRows.length === 0) {
      return NextResponse.json({ error: 'CMS page not found' }, { status: 404 });
    }

    await query('DELETE FROM cms_pages WHERE id = ?', [pageId]);

    return NextResponse.json({
      success: true,
      message: 'CMS page deleted successfully',
      id: pageId,
    });
  } catch (error: any) {
    console.error('Error deleting CMS page:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete CMS page' },
      { status: 500 }
    );
  }
}
