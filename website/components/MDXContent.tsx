import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import type { ReactNode } from 'react';

interface MDXContentProps {
  content: string;
}

import { Plotly } from '@/components/mdx/Plotly';

const components = {
  // Custom components for MDX - extend as needed
  Callout: ({
    children,
    type = 'info',
  }: {
    children: ReactNode;
    type?: 'info' | 'warning' | 'tip';
  }) => {
    const styles = {
      info: 'border-accent bg-accent/10',
      warning: 'border-yellow-500 bg-yellow-500/10',
      tip: 'border-green-500 bg-green-500/10',
    };

    return (
      <div className={`my-4 rounded-md border-l-4 p-4 ${styles[type]}`}>
        {children}
      </div>
    );
  },
  Plotly,
};

export function MDXContent({ content }: MDXContentProps) {
  return (
    <MDXRemote
      source={content}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeHighlight],
        },
      }}
    />
  );
}

