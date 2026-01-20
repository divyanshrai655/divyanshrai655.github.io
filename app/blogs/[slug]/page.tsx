import { getBlogPost, getBlogPosts } from '@/lib/mdx';
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

export function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getBlogPost(params.slug);
    if (!post) return {};
    return {
        title: post.meta.title,
        description: post.meta.description,
    };
}

export default function BlogPostPage({ params }: Props) {
    const post = getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="prose prose-zinc dark:prose-invert mx-auto max-w-none font-geist-mono">
            <Link
                href="/blogs"
                className="no-underline text-xs text-muted-foreground hover:text-accent mb-8 inline-block transition-colors"
            >
                ← Back to blog list
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
