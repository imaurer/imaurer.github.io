import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.imaurer.com',
  output: 'static',
  redirects: {
    '/blog/': '/writing/',
    '/blog/posts/2023-09-06-llama-cpp-grammars/': '/writing/llama-cpp-grammars/',
    '/blog/posts/2024-01-08-what-is-a-custom-gpt/': '/writing/what-is-a-custom-gpt/',
    '/blog/posts/2023-05-18-the-answer-is-the-easy-part/': '/writing/',
    '/blog/posts/2023-07-14-llms-just-dont-understand/': '/writing/',
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
  },
});
