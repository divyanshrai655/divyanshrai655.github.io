import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

/** @type {import('next').NextConfig} */
const skipChecks =
  process.env.NEXT_SKIP_CHECKS === '1' ||
  process.env.NEXT_SKIP_CHECKS === 'true';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Set base path if deploying to github.io/repo-name (uncomment and set your repo name)
  // basePath: '/your-repo-name',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Workaround for slow/hanging build checks in some environments.
  // Keep checks available via `npm run lint` and `npm run typecheck`.
  eslint: {
    ignoreDuringBuilds: skipChecks,
  },
  typescript: {
    ignoreBuildErrors: skipChecks,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});

export default withMDX(nextConfig);
