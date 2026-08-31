import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { query } from '@/lib/db';
import 'react-quill-new/dist/quill.snow.css';

interface CMSPageRecord {
  id: number;
  page_name: string;
  slug: string;
  page_title: string;
  meta_description: string;
  content: string;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

async function getPublishedCMSPage(slug: string): Promise<CMSPageRecord | null> {
  try {
    const rows = await query<CMSPageRecord[]>(
      'SELECT * FROM cms_pages WHERE slug = ? AND status = "Active" LIMIT 1',
      [slug]
    );

    if (rows && rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching CMS page by slug:', error);
    return null;
  }
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedCMSPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found - Grace Fresh Market',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: page.page_title,
    description: page.meta_description,
    openGraph: {
      title: page.page_title,
      description: page.meta_description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.page_title,
      description: page.meta_description,
    },
  };
}

export default async function DynamicCMSPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPublishedCMSPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBF9] font-nunito selection:bg-[#80C34A] selection:text-[#1E2922]">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main CMS Page Content Container */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Banner / Header */}
        <div className="mb-10 text-center border-b border-[#E2EAE1] pb-8">
          <span className="inline-block px-3 py-1 bg-[#EAF2EA] text-[#2D5A27] text-xs font-bold font-quicksand rounded-full uppercase tracking-wider mb-3">
            Information
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-quicksand text-gray-900 tracking-tight leading-tight">
            {page.page_name}
          </h1>
        </div>

        {/* Content Box */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E2EAE1] shadow-xs">
          <style>{`
            .cms-content-wrapper p {
              margin-bottom: 1rem;
              line-height: 1.75;
            }
            .cms-content-wrapper p:last-child {
              margin-bottom: 0;
            }
            .cms-content-wrapper h1 {
              font-size: 2rem;
              font-weight: 700;
              margin-top: 1.75rem;
              margin-bottom: 1rem;
              color: #111827;
              font-family: var(--font-quicksand), sans-serif;
            }
            .cms-content-wrapper h2 {
              font-size: 1.5rem;
              font-weight: 700;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              color: #111827;
              font-family: var(--font-quicksand), sans-serif;
            }
            .cms-content-wrapper h3 {
              font-size: 1.25rem;
              font-weight: 700;
              margin-top: 1.25rem;
              margin-bottom: 0.5rem;
              color: #111827;
              font-family: var(--font-quicksand), sans-serif;
            }
            .cms-content-wrapper ul {
              list-style-type: disc;
              padding-left: 1.5rem;
              margin-bottom: 1rem;
            }
            .cms-content-wrapper ol {
              list-style-type: decimal;
              padding-left: 1.5rem;
              margin-bottom: 1rem;
            }
            .cms-content-wrapper li {
              margin-bottom: 0.375rem;
            }
            .cms-content-wrapper blockquote {
              border-left: 4px solid #2D5A27;
              padding-left: 1rem;
              margin: 1.25rem 0;
              font-style: italic;
              color: #374151;
              background-color: #F9FBF9;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              border-top-right-radius: 0.5rem;
              border-bottom-right-radius: 0.5rem;
            }
            .cms-content-wrapper a {
              color: #2D5A27;
              text-decoration: underline;
              font-weight: 600;
            }
            .cms-content-wrapper a:hover {
              color: #1e3d1a;
            }
            .cms-content-wrapper code {
              background-color: #F3F4F6;
              padding: 0.2rem 0.4rem;
              border-radius: 0.375rem;
              font-family: monospace;
              font-size: 0.875em;
              color: #1F2937;
            }
            .cms-content-wrapper pre {
              background-color: #1F2937;
              color: #F9FAFB;
              padding: 1rem;
              border-radius: 0.75rem;
              overflow-x: auto;
              margin-bottom: 1rem;
            }
          `}</style>
          <div
            className="ql-editor cms-content-wrapper prose max-w-none font-nunito text-gray-800 text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
