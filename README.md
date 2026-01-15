# Personal Website

A clean, minimal personal website built with Next.js 14, TypeScript, Tailwind CSS, and MDX.

## Features

- ✨ Clean, minimal design with dark mode support
- 📝 Blog posts with MDX (Markdown + JSX)
- ➗ LaTeX math rendering (KaTeX via client-side auto-render)
- 📈 Interactive plots in MDX (Plotly component)
- 💭 Twitter-style thoughts feed (JSON-based, no markdown needed)
- 🏷️ Tag filtering for blog posts
- ⏱️ Reading time estimation
- 📱 Fully responsive (mobile-first)
- 🔍 SEO optimized with meta tags and Open Graph
- 📡 RSS feed
- 🚀 Static site generation for fast page loads
- 🎨 Syntax highlighting for code blocks
- 📚 Table of contents for long posts

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

### Building for Production

```bash
# Create production build (outputs to ./out folder)
npm run build
```

## Adding Content

### Blog Posts

Create a new `.mdx` file in `content/blogs/`:

```mdx
---
title: Your Blog Post Title
date: 2024-12-29
description: A brief description of your post.
tags:
  - tag1
  - tag2
published: true
---

Your content here. You can use **Markdown** and JSX components!
```

### Thoughts (Twitter-style)

Edit `content/thoughts.json` to add new thoughts:

```json
[
  {
    "id": "unique-id",
    "content": "Your thought goes here. Just plain text, no markdown needed!",
    "date": "2024-12-29T10:30:00Z",
    "tags": ["optional", "tags"]
  }
]
```

**Tips for thoughts:**
- Keep them short and punchy (like tweets)
- Use `\n` for line breaks if needed
- Tags are optional
- IDs should be unique (e.g., `thought-001`, `thought-002`)

## Customization

### Personal Information

Update these files with your information:

1. `app/layout.tsx` - Site metadata, title, description
2. `app/page.tsx` - About me content
3. `app/thoughts/page.tsx` - Change "Your Name" and avatar initial
4. `lib/rss.ts` - RSS feed author info

### Theme Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --background: #fafafa;
  --foreground: #171717;
  --accent: #0066cc;
  /* ... */
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --accent: #60a5fa;
  /* ... */
}
```

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

**Note:** For Vercel, you may want to remove `output: 'export'` from `next.config.mjs` to enable server features.

### Option 2: GitHub Pages

This project is configured for GitHub Pages out of the box!

1. Push your code to GitHub
2. Go to your repo → Settings → Pages
3. Under "Build and deployment", select **GitHub Actions**
4. Push to `main` branch - it will auto-deploy!

**If using a repo name (not custom domain):**

Uncomment and set the `basePath` in `next.config.mjs`:

```js
basePath: '/your-repo-name',
```

**If using a custom domain:**

1. Add your domain in repo Settings → Pages → Custom domain
2. Create a `public/CNAME` file with your domain:
   ```
   yourdomain.com
   ```

### Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Writing Posts

### Math (LaTeX / KaTeX)

Inline math:

```md
Euler's identity: $e^{i\pi} + 1 = 0$.
```

Block math:

```md
$$
\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
$$
```

### Interactive Plotly charts

Use the `Plotly` MDX component:

```mdx
<Plotly
  data={[
    { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'scatter', mode: 'lines+markers' },
  ]}
  layout={{ title: 'Example chart' }}
/>
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home/About page
│   ├── globals.css         # Global styles
│   ├── blogs/
│   │   ├── page.tsx        # Blog list
│   │   └── [slug]/page.tsx # Individual blog post
│   ├── thoughts/
│   │   └── page.tsx        # Twitter-style thoughts feed
│   ├── rss.xml/route.ts    # RSS feed
│   ├── sitemap.ts          # Sitemap generation
│   └── robots.ts           # Robots.txt
├── components/
│   ├── Navigation.tsx      # Site navigation
│   ├── ThemeProvider.tsx   # Dark mode context
│   ├── MDXContent.tsx      # MDX renderer
│   └── TagFilter.tsx       # Tag filtering UI
├── content/
│   ├── blogs/*.mdx         # Blog posts (MDX)
│   └── thoughts.json       # Thoughts feed (JSON)
├── lib/
│   ├── mdx.ts              # Blog MDX utilities
│   ├── thoughts.ts         # Thoughts utilities
│   └── rss.ts              # RSS generation
└── public/                 # Static assets
```

## License

MIT License - feel free to use this template for your own site!
