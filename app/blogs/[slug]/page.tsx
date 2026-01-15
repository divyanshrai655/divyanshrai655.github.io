import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost, getBlogPosts } from '@/lib/mdx';
import { MDXContent } from '@/components/MDXContent';
import { extractToc } from '@/lib/toc';
import { TableOfContentsPanel } from '@/components/TableOfContentsPanel';
import { MathAutoRender } from '@/components/mdx/MathAutoRender';
import type { Metadata } from 'next';
import { site } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: [site.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const toc = extractToc(post.content);
  const contentId = `post-${slug}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[auto_1fr]">
      <TableOfContentsPanel items={toc} showMobileTrigger={false} />

      <article className="space-y-8 min-w-0 w-full lg:max-w-3xl lg:justify-self-center">
        <header className="space-y-4">
          <Link
            href="/blogs"
            className="text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            ← Back to blogs
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{post.meta.title}</h1>
          <TableOfContentsPanel items={toc} showDesktopSidebar={false} />
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <time dateTime={post.meta.date}>
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.meta.readingTime}</span>
            {post.meta.tags && post.meta.tags.length > 0 && (
              <>
                <span>·</span>
                <span>{post.meta.tags.join(', ')}</span>
              </>
            )}
          </div>
        </header>

        <div id={contentId} className="prose">
          <MDXContent content={post.content} />
        </div>

        {/* Client-side KaTeX auto-render for $...$ / $$...$$ */}
        <MathAutoRender containerId={contentId} />
      </article>
    </div>
  );
}

