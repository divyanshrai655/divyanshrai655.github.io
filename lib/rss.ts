import { Feed } from 'feed';
import { getBlogPosts } from './mdx';
import { site } from './site';

export function generateRssFeed(): string {
  const posts = getBlogPosts();

  const feed = new Feed({
    title: `${site.name} - Blog`,
    description: `Writing by ${site.name}.`,
    id: site.url,
    link: site.url,
    language: 'en',
    favicon: `${site.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${site.name}`,
    author: {
      name: site.name,
      email: site.email,
      link: site.url,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site.url}/blogs/${post.slug}`,
      link: `${site.url}/blogs/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
    });
  });

  return feed.rss2();
}

