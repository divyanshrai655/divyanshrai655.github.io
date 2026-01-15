'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PostMeta } from '@/lib/mdx';

interface BlogListProps {
  posts: PostMeta[];
  allTags: string[];
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts;

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Filter:</span>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="rounded-full bg-border px-3 py-1 text-xs text-muted hover:bg-accent hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                selectedTag === tag
                  ? 'bg-accent text-white'
                  : 'bg-border text-muted hover:bg-accent hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-muted py-8">No posts found.</p>
      ) : (
        <ul className="space-y-6">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <article className="group">
                <Link href={`/blogs/${post.slug}`} className="block space-y-2">
                  <h2 className="text-lg font-medium group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span>·</span>
                        <span>{post.tags.join(', ')}</span>
                      </>
                    )}
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

