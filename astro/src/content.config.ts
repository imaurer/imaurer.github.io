import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const category = z.enum(['agents', 'bioinformatics', 'building']);

const base = {
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category,
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
};

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object(base),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    ...base,
    youtubeId: z.string().optional(),
    episodeUrl: z.string().url().optional(),
    event: z.string(),
    eventDate: z.coerce.date(),
    chapters: z
      .array(z.object({ time: z.string(), label: z.string() }))
      .optional(),
    summary: z.string().optional(),
    takeaways: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...base,
    repo: z.string().optional(),
    status: z.string().optional(),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    ...base,
    authors: z.array(z.string()).optional(),
    venue: z.string().optional(),
    doi: z.string().optional(),
    pmid: z.string().optional(),
  }),
});

export const collections = { writing, talks, projects, papers };
