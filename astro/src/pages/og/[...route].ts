import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

interface CardData {
  title: string;
  label: string;
}

const pages: Record<string, CardData> = {
  site: { title: 'Ian Maurer', label: 'imaurer.com' },
  about: { title: 'About Ian Maurer', label: 'imaurer.com' },
  writing: { title: 'Writing', label: 'imaurer.com' },
  talks: { title: 'Talks', label: 'imaurer.com' },
  projects: { title: 'Projects', label: 'imaurer.com' },
  papers: { title: 'Papers', label: 'imaurer.com' },
};

const collections = [
  ['writing', 'Writing'],
  ['talks', 'Talk'],
  ['projects', 'Project'],
  ['papers', 'Paper'],
] as const;

for (const [name, label] of collections) {
  for (const entry of await getCollection(name)) {
    pages[`${name}/${entry.id}`] = {
      title: entry.data.title,
      label: `${label} · imaurer.com`,
    };
  }
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path: string, page: CardData) => ({
    title: page.title,
    description: page.label,
    logo: {
      path: './src/assets/avatar.png',
      size: [112, 112],
    },
    bgGradient: [
      [46, 52, 64],
      [59, 66, 82],
    ],
    border: { color: [136, 192, 208], width: 12, side: 'block-end' },
    padding: 72,
    font: {
      title: {
        families: ['Ioskeley Mono'],
        weight: 'Bold',
        color: [236, 239, 244],
        size: 60,
        lineHeight: 1.25,
      },
      description: {
        families: ['Ioskeley Mono'],
        color: [136, 192, 208],
        size: 30,
      },
    },
    fonts: [
      './src/assets/fonts/IoskeleyMono-Regular.ttf',
      './src/assets/fonts/IoskeleyMono-Bold.ttf',
    ],
  }),
});
