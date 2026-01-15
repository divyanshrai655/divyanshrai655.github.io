import GithubSlugger from 'github-slugger';

export type TocItem = {
  depth: 2 | 3;
  value: string;
  id: string;
};

function stripInlineCode(s: string) {
  return s.replace(/`([^`]+)`/g, '$1');
}

/**
 * Extracts a simple TOC from MDX/Markdown content.
 * - Only includes H2/H3 (## / ###)
 * - Ignores fenced code blocks
 * - Generates GitHub-compatible slugs (matches `rehype-slug`)
 */
export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();

  const lines = content.split(/\r?\n/);
  const toc: TocItem[] = [];

  let inFence = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // Toggle fenced code blocks ``` / ~~~
    if (/^(\s*)(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line.trim());
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    if (depth !== 2 && depth !== 3) continue;

    // Remove trailing markdown heading markers: "## Title ###"
    const text = match[2].replace(/\s+#+\s*$/, '').trim();
    if (!text) continue;

    const normalized = stripInlineCode(text);
    const id = slugger.slug(normalized);

    toc.push({ depth, value: text, id });
  }

  return toc;
}


