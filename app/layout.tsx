import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
import { Navigation } from '@/components/Navigation';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { site, absoluteUrl } from '@/lib/site';
import './globals.css';

function PersonSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    image: absoluteUrl(site.imagePath),
    email: `mailto:${site.email}`,
    sameAs: [site.socials.github, site.socials.linkedin].filter(Boolean),
    jobTitle: 'Machine Learning Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Sprinklr',
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: absoluteUrl(site.imagePath),
        width: 900,
        height: 900,
        alt: `${site.name} profile photo`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: [absoluteUrl(site.imagePath)],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <PersonSchema />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          <GoogleAnalytics />
          <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 md:py-16">
            <Navigation />
            <main>{children}</main>
            <footer className="mt-20 border-t border-border pt-8 text-sm text-muted">
              <p>© {new Date().getFullYear()} Divyansh Rai. All rights reserved.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
