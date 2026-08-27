import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

export async function GET(context) {
  const container = await AstroContainer.create();

  const collect = async (name, prefix) => {
    const entries = await getCollection(
      name,
      ({ data }) => !data.draft && !data.external
    );
    return Promise.all(
      entries.map(async (entry) => {
        const { Content } = await render(entry);
        const html = await container.renderToString(Content);
        return {
          title: entry.data.title,
          description: entry.data.description,
          pubDate: entry.data.date,
          link: `/${prefix}/${entry.id}/`,
          content: html,
        };
      })
    );
  };

  const items = (
    await Promise.all([
      collect('writing', 'writing'),
      collect('talks', 'talks'),
      collect('projects', 'projects'),
      collect('papers', 'papers'),
    ])
  )
    .flat()
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Ian Maurer',
    description:
      'CTO of GenomOncology. I write about AI agents doing real biomedical work.',
    site: context.site,
    items,
  });
}
