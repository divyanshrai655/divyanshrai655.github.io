import { getBlogPosts, getAllTags } from '@/lib/mdx';
import { BlogList } from '@/components/BlogList';
import type { Metadata } from 'next';
import { SubscribeButton } from '@/components/SubscribeButton';
import { site, pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'My personal collection of ideas, coding insights, and tips.',
  ...pageMetadata({
    path: '/blogs',
    title: `Blogs | ${site.name}`,
    description: 'My personal collection of ideas, coding insights, and tips.',
  }),
};

export default function BlogsPage() {
  const posts = getBlogPosts();
  const allTags = getAllTags(posts);

  return (
    <div className="space-y-8 font-geist-mono">
      <header className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Blog List</h1>
          <SubscribeButton />
        </div>
        <p className="subheader leading-relaxed">
          Findings and Personal Learnings
        </p>
      </header>

      <BlogList posts={posts} allTags={allTags} />
    </div>
  );
}
