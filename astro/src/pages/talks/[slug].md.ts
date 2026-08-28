import { getCollection } from 'astro:content';
import { entryMarkdown, markdownHeaders } from '../../lib/markdown';

export async function getStaticPaths() {
  const entries = await getCollection('talks');
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

export async function GET({ props }: { props: { entry: any } }) {
  return new Response(entryMarkdown('talks', props.entry), {
    headers: markdownHeaders,
  });
}
