function normalizeSiteUrl(input: string): string {
  const trimmed = input.trim().replace(/\/+$/, '');
  try {
    return new URL(trimmed).toString().replace(/\/+$/, '');
  } catch {
    return 'https://yourwebsite.com';
  }
}

export const site = {
  /** Set `NEXT_PUBLIC_SITE_URL` in prod. Example: https://divyanshrai.com */
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com'),
  name: 'Divyansh Rai',
  /** Third-person bio helps “name SEO” */
  description:
    'Divyansh Rai is a Machine Learning Engineer at Sprinklr, building and optimizing LLM-powered systems for production.',
  email: 'divyansh2509@gmail.com',
  imagePath: '/images/profile.png',
  socials: {
    github: 'https://github.com/divyanshrai655',
    linkedin: 'https://www.linkedin.com/in/divyanshrai655/',
  },
} as const;

export function absoluteUrl(path: string) {
  if (!path) return site.url;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${site.url}${path.startsWith('/') ? '' : '/'}${path}`;
}


