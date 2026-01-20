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

  // Group posts by year
  const postsByYear = filteredPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, PostMeta[]>);

  // Sort years descending
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-12">
      {/* Filter Section */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {/* <span className="text-sm text-muted">Filter:</span> */}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="rounded-full bg-border px-3 py-1 text-xs text-muted hover:bg-accent hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${isSelected
                  ? 'bg-accent text-white'
                  : 'bg-border text-muted hover:bg-accent hover:text-white'
                  }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      {/* Blog List Section */}
      {filteredPosts.length === 0 ? (
        <p className="text-muted py-8">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {years.map((year) => (
            <section key={year} className="mb-8 font-geist-mono">
              <h2 className="mb-4 text-xs font-mono text-muted-foreground">{year}</h2>
              <div className="flex flex-col">
                {postsByYear[year].map((post) => (
                  <article key={post.slug} className="group">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="flex flex-col sm:flex-row sm:items-baseline py-3 border-b border-border/20 hover:bg-accent/5 transition-colors gap-2 sm:gap-4 group-last:border-0"
                    >
                      {/* Date */}
                      <div className="w-24 text-sm text-muted-foreground shrink-0 font-mono">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>

                      {/* Title */}
                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-normal text-foreground group-hover:text-accent transition-colors truncate font-mono">
                          {post.title}
                        </h3>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 shrink-0 sm:justify-end mt-1 sm:mt-0">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-[4px] border border-border/40 text-[10px] text-muted-foreground font-mono transition-colors group-hover:border-accent/50 group-hover:text-accent"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

