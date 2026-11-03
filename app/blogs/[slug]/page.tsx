import { getBlogPost, getBlogPosts, type PostMeta } from '@/lib/mdx';
import { site, absoluteUrl, ogImage, pageMetadata, personId } from '@/lib/site';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/MDXContent';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
    params: {
        slug: string;
    };
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const posts = getBlogPosts();
    if (posts.length === 0) {
        return [{ slug: 'coming-soon' }];
    }
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    if (params.slug === 'coming-soon') {
        return {
            title: 'Coming Soon',
            description: 'Blog posts are coming soon.',
        };
    }
    const post = getBlogPost(params.slug);
    if (!post) return {};
    const base = pageMetadata({
        path: `/blogs/${params.slug}`,
        title: post.meta.title,
        description: post.meta.description,
    });
    return {
        title: post.meta.title,
        description: post.meta.description,
        ...base,
        openGraph: {
            ...base.openGraph,
            type: 'article',
            publishedTime: new Date(post.meta.date).toISOString(),
            authors: [site.url],
            tags: post.meta.tags,
        },
    };
}

function BlogPostingSchema({ slug, meta }: { slug: string; meta: PostMeta }) {
    const url = absoluteUrl(`/blogs/${slug}`);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: meta.title,
        description: meta.description,
        datePublished: new Date(meta.date).toISOString(),
        url,
        mainEntityOfPage: url,
        image: ogImage.url,
        keywords: meta.tags,
        author: { '@id': personId },
    };

    return (
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export default function BlogPostPage({ params }: Props) {
    if (params.slug === 'coming-soon') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 text-center font-geist-mono">
                <h1 className="text-2xl font-bold">No posts yet</h1>
                <p className="text-muted-foreground">
                    Check back later for new content!
                </p>
                <Link
                    href="/blogs"
                    className="text-sm text-accent hover:underline"
                >
                    ← Back to blog list
                </Link>
            </div>
        );
    }

    const post = getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="prose prose-zinc dark:prose-invert mx-auto max-w-none font-geist-mono">
            <BlogPostingSchema slug={params.slug} meta={post.meta} />
            <Link
                href="/blogs"
                className="not-prose mb-8 -ml-1 inline-block font-sans text-sm !text-muted !no-underline transition-colors hover:!text-foreground"
            >
                ← All posts
            </Link>

            <header className="mb-12 not-prose">
                <h1 className="text-3xl font-bold mb-4">{post.meta.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
                    <time className="shrink-0">
                        {new Date(post.meta.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    {post.meta.tags && post.meta.tags.length > 0 && (
                        <>
                            <span>·</span>
                            <div className="flex gap-2">
                                {post.meta.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded-[4px] border border-border"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </header>

            <div className="prose-headings:font-normal prose-a:text-accent hover:prose-a:underline font-mono text-sm leading-7">
                <MDXContent content={post.content} />
            </div>
        </article>
    );
}
