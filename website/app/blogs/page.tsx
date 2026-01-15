import { getBlogPosts, getAllTags } from '@/lib/mdx';
import { BlogList } from '@/components/BlogList';
import type { Metadata } from 'next';
import { SubscribeButton } from '@/components/SubscribeButton';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'My personal collection of ideas, coding insights, and tips.',
};

export default function BlogsPage() {
  const posts = getBlogPosts();
  const allTags = getAllTags(posts);

  return (
    <div className="space-y-8">
      <header className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-bold tracking-tight font-serif">Blogs</h1>
          <SubscribeButton />
        </div>
        <p className="leading-relaxed">
          My personal collection of ideas, coding insights, and tips. Most entries
          remain private, with select ones published here. This site serves as a
          public outlet for some of my musings.
        </p>
      </header>

      <BlogList posts={posts} allTags={allTags} />
    </div>
  );
}
