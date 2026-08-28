import type { CollectionEntry, CollectionKey } from 'astro:content';

const SITE = 'https://www.imaurer.com';

export function entryMarkdown(
  kind: CollectionKey,
  entry: CollectionEntry<CollectionKey>
): string {
  const data = entry.data as Record<string, unknown> & {
    title: string;
    date: Date;
  };
  const parts = [data.date.toISOString().slice(0, 10)];
  if (typeof data.event === 'string') parts.push(data.event);
  if (typeof data.venue === 'string') parts.push(data.venue);
  parts.push(`${SITE}/${kind}/${entry.id}/`);
  const body = (entry.body ?? '').trim();
  return `# ${data.title}\n\n${parts.join(' · ')}\n\n${body}\n`;
}

export const markdownHeaders = {
  'Content-Type': 'text/markdown; charset=utf-8',
};
