import { getCollection } from 'astro:content';
import { entryMarkdown, markdownHeaders } from '../lib/markdown';

export async function GET() {
  const kinds = ['writing', 'talks', 'projects', 'papers'] as const;
  const sections: string[] = [];
  for (const kind of kinds) {
    const entries = await getCollection(
      kind,
      ({ data }: { data: { external?: string } }) => !data.external
    );
    entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    for (const entry of entries) {
      sections.push(entryMarkdown(kind, entry).trim());
    }
  }
  return new Response(sections.join('\n\n---\n\n') + '\n', {
    headers: markdownHeaders,
  });
}
