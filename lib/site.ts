function normalizeSiteUrl(input: string): string {
  const trimmed = input.trim().replace(/\/+$/, '');
  try {
    return new URL(trimmed).toString().replace(/\/+$/, '');
  } catch {
    return 'https://divyanshrai655.github.io/';
  }
}

export const site = {
  /** Set `NEXT_PUBLIC_SITE_URL` in prod. Example: https://divyanshrai.com */
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || 'https://divyanshrai655.github.io/'),
  name: 'Divyansh Rai',
  /** Third-person bio helps “name SEO” */
  description:
    'Divyansh Rai is a Machine Learning Engineer at Sprinklr, building and optimizing LLM-powered systems for production.',

  imagePath: '/images/profile.png',
  socials: {
    github: 'https://github.com/divyanshrai655',
    linkedin: 'https://www.linkedin.com/in/divyanshrai655/',
    twitter: 'https://x.com/DLazyLeopard',
  },
} as const;

export function absoluteUrl(path: string) {
  if (!path) return site.url;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${site.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Stable JSON-LD id so posts can reference the site's Person as their author. */
export const personId = `${site.url}/#person`;

export const ogImage = {
  url: absoluteUrl(site.imagePath),
  width: 900,
  height: 900,
  alt: `${site.name} profile photo`,
};

/**
 * Canonical + Open Graph + Twitter metadata for a page.
 * Next.js replaces (not merges) a parent's `openGraph`/`twitter`, so every page sets the full block.
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: 'en_US',
      type: 'website' as const,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [ogImage.url],
    },
  };
}


