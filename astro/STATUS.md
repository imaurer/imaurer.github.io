# Astro redesign — scaffold status

Branch: `astro-redesign`. The Astro site lives in `astro/` and coexists with the MkDocs site on main. The root CNAME is untouched.

## What's built

- Astro 5.18 static site, no UI framework, plain Astro components.
- Content collections with zod schemas: `writing`, `talks`, `projects`, `papers`. Shared fields: title, description, date, updated, category (agents | bioinformatics | building), tags, draft. Talks add youtubeId, event, eventDate, chapters, summary, takeaways. Projects add repo and status. Papers add authors, venue, doi.
- URL scheme without dates: /writing/[slug]/, /talks/[slug]/, /projects/[slug]/, /papers/[slug]/. Nav: Writing · Talks · Projects · Papers · About.
- Nord palette as CSS custom properties with a [data-theme] switch. Dark is the default. The toggle persists to localStorage and an explicit choice wins over system preference.
- Ioskeley Mono self-hosted in public/fonts/ (Regular, Bold, Italic, BoldItalic) with the SIL OFL 1.1 LICENSE. Body text uses a system sans stack.
- Shiki syntax highlighting with the nord theme; code blocks render in Ioskeley Mono.
- Full-text RSS at /rss.xml (drafts excluded), sitemap via @astrojs/sitemap, per-page Open Graph and Twitter card meta.
- Homepage: intro line, pinned section (3 items), Now paragraph, chronological recent list across all collections.
- Talk page: St. Jude BioMCP talk with summary, key takeaways, video placeholder ("video coming soon" — no youtubeId yet), 10 chapter links anchored to headings inserted in the transcript, and the full publish-cut transcript.
- Talks: five more entries, each with summary, takeaways, and full transcript with chapter anchors — Talk Python #154 (2018-03-07, episode link), Talk Python #456 (2024-04-16, YouTube embed + episode link), CI4CC ChatGPT-plugins talk (2023-06-19, YouTube embed, captions pulled 2026-08-27), Lay of the Land #172 (2024-06-27, YouTube embed + episode link), Dev in the Details #11 (2026-05-06, YouTube embed, no timestamps so no chapters).
- Talks schema gained optional `episodeUrl`; the talk page renders a "Listen on <site>" link when there is no youtubeId and an episode-page link under the embed when there are both. Summary frontmatter now renders as multiple paragraphs split on blank lines.
- Writing: "Why BioMCP exists" (draft) with a Shiki-highlighted `biomcp` CLI code block.
- Projects: BioMCP, FuzzTypes, botassembly (marked "not yet public").
- About page with role, thesis, and placeholder slots for photo, ORCID, and Scholar links.

## Preview

```bash
cd astro && npm install && npm run dev
```

`npm run build` writes the static site to `astro/dist/`.

## Deviations from the spec

- Talks gained optional `summary` and `takeaways` frontmatter fields so the talk page can render those sections above the transcript body (the body is the transcript, per spec).
- Draft entries appear in on-site lists with a "draft" badge so the mockup has content to review; they are excluded from RSS. Decide whether production builds should hide drafts entirely.

## Open design questions

- Draft policy: hide drafts in production builds, or keep the badge behavior?
- Chapter timestamps refer to the original recording; rebase them against the YouTube cut when the video posts (the talk page carries a note).
- The papers collection is empty; the build logs a harmless "collection is empty" warning until the first entry lands.
- Light mode keeps code blocks dark (Shiki ships Nord's dark colors). Alternative: dual-theme Shiki with nord-light-ish theme if a light code block is wanted.
- Category pages (/writing/category/agents/ etc.) are not built yet — categories render as labels only.
- Footer and About link to real GitHub, X, and LinkedIn profiles. Substack stays a commented-out placeholder until the account exists.
- Cutover plan: move astro/ contents to repo root, keep CNAME, switch the GitHub Pages workflow from MkDocs to Astro.
