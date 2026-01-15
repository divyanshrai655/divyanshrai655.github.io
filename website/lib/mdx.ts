import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  readingTime: string;
  published?: boolean;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

type PostsCacheEntry = {
  posts: PostMeta[];
  mtimeMs: number;
};

type PostCacheEntry = {
  post: Post;
  mtimeMs: number;
};

// Small in-memory caches to avoid repeated filesystem + gray-matter work on each request in dev.
// These are safe because Next reloads modules on edits; for content edits we track mtime.
const postsCache = new Map<string, PostsCacheEntry>();
const postCache = new Map<string, PostCacheEntry>();

function profileStart(label: string) {
  if (!process.env.NEXT_PROFILE_MDX) return;
  // eslint-disable-next-line no-console
  console.time(label);
}

function profileEnd(label: string) {
  if (!process.env.NEXT_PROFILE_MDX) return;
  // eslint-disable-next-line no-console
  console.timeEnd(label);
}

function getPostsFromDirectory(directory: string): PostMeta[] {
  const fullPath = path.join(contentDirectory, directory);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const dirStat = fs.statSync(fullPath);
  const cached = postsCache.get(directory);
  if (cached && cached.mtimeMs === dirStat.mtimeMs) {
    return cached.posts;
  }

  profileStart(`mdx:getPostsFromDirectory(${directory})`);
  const files = fs.readdirSync(fullPath).filter((file) => file.endsWith('.mdx'));

  const posts = files
    .map((file) => {
      const filePath = path.join(fullPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug: file.replace('.mdx', ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        tags: data.tags || [],
        readingTime: stats.text,
        published: data.published !== false,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  postsCache.set(directory, { posts, mtimeMs: dirStat.mtimeMs });
  profileEnd(`mdx:getPostsFromDirectory(${directory})`);
  return posts;
}

function getPostBySlug(directory: string, slug: string): Post | null {
  const fullPath = path.join(contentDirectory, directory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileStat = fs.statSync(fullPath);
  const cacheKey = `${directory}/${slug}`;
  const cached = postCache.get(cacheKey);
  if (cached && cached.mtimeMs === fileStat.mtimeMs) {
    return cached.post;
  }

  profileStart(`mdx:getPostBySlug(${cacheKey})`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const post: Post = {
    meta: {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || [],
      readingTime: stats.text,
      published: data.published !== false,
    },
    content,
  };

  postCache.set(cacheKey, { post, mtimeMs: fileStat.mtimeMs });
  profileEnd(`mdx:getPostBySlug(${cacheKey})`);
  return post;
}

export function getBlogPosts(): PostMeta[] {
  return getPostsFromDirectory('blogs');
}

export function getBlogPost(slug: string): Post | null {
  return getPostBySlug('blogs', slug);
}

export function getAllTags(posts: PostMeta[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

