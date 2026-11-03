'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PostMeta } from '@/lib/mdx';

interface BlogListProps {
  posts: PostMeta[];
  allTags: string[];
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedTags.length === 0) return true;
    return post.tags?.some((tag) => selectedTags.includes(tag));
  });

  return (
    <div className="space-y-12">
      {/* Filter Section */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1 text-xs transition-colors inline-flex items-center gap-1.5 ${isSelected
                  ? 'bg-accent text-white'
                  : 'bg-border text-muted hover:bg-accent hover:text-white'
                  }`}
              >
                {tag}
                {isSelected && (
                  <span className="text-[10px] leading-none opacity-80 hover:opacity-100">✕</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Blog List Section */}
      {filteredPosts.length === 0 ? (
        <p className="text-muted py-8">No posts found.</p>
      ) : (
        <ul className="flex flex-col gap-7 font-sans">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <time dateTime={post.date} className="block text-sm text-muted">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
              <Link
                href={`/blogs/${post.slug}`}
                className="mt-1 inline-block text-[1.375rem] leading-snug text-[#2a6fd1] transition-colors hover:underline hover:underline-offset-4 dark:text-[#7aaef5]"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

