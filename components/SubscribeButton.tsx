'use client';

export function SubscribeButton() {
  return (
    <a
      href="/rss.xml"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground hover:border-accent/60 transition-colors"
      aria-label="Subscribe via RSS (opens the feed)"
      title="Opens the RSS feed in a new tab"
    >
      Subscribe
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    </a>
  );
}


