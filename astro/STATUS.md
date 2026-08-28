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
- Projects: BioMCP (lead) and PangoPup. FuzzTypes and botassembly were removed on owner feedback (2026-08-27).
- About page with role, thesis, placeholder slots for photo, ORCID, and Scholar links, plus links to the Writing, Talks, Projects, and Papers indexes.

## Design polish (2026-08-27)

- In-content links now show a subtle underline (accent color, 3px offset) and brighten on hover via a per-theme `--accent-bright` token. Nav, wordmark, and footer links stay quieter with no underline.
- Footer social links are inline single-color SVG icons (currentColor, aria-label + title): GitHub, X, LinkedIn, RSS. A YouTube icon sits commented out until the channel exists. The commented Substack placeholder came out of the footer; the About page still carries it.
- Open Graph card images generate per page at build time with astro-og-canvas: Nord dark gradient background, frost bottom border, the page title in Ioskeley Mono Bold, a "<Type> · imaurer.com" label, and Ian's GitHub avatar. The route is `src/pages/og/[...route].ts`; TTF copies of Ioskeley Mono live in `src/assets/fonts/` because CanvasKit cannot read woff2. `twitter:card` is `summary_large_image` and `og:image` is absolute.
- `site` in astro.config is now `https://www.imaurer.com` to match the root CNAME.
- Cross-links: talk pages add a "Watch on YouTube" link under the embed; project pages add a prominent "View on GitHub" button; paper pages surface DOI and PMID in the meta line (new optional `pmid` schema field); every content page ends with a "More <section> →" link back to its index.
- The avatar also sits at `public/images/avatar.png` for general use.

## Ported posts (2026-08-27)

Two posts from the old MkDocs blog now live in the writing collection with their original prose and publication dates. Cutover needs redirects from the old URLs:

| Old URL | New URL |
| --- | --- |
| /blog/posts/2023-09-06-llama-cpp-grammars/ | /writing/llama-cpp-grammars/ |
| /blog/posts/2024-01-08-what-is-a-custom-gpt/ | /writing/what-is-a-custom-gpt/ |

The Custom GPT post's image moved from docs/images/ to public/images/what-is-a-custom-gpt.png. The other two old posts (2023-05-18, 2023-07-14) were not ported.

## Elsewhere — external posts (2026-08-27)

The writing schema gained optional `external` (URL) and `site` (display label) fields. An external entry is a stub .md file. Its frontmatter carries the link and its body is a 1-3 sentence blurb shown in the writing index. The list item links straight to the external URL. External entries have no local detail page, no OG image, and are excluded from RSS. The writing index and homepage recent list mark them with a monospace "→ domain" badge in the muted accent color. The writing index carries a one-line note about them.

Entries added (all URLs verified 200 on 2026-08-27): "What is a Variant Call Format (VCF) File?" on genomoncology.com, and eight biomcp.org blog articles. The ninth biomcp.org post (biomcp-kuva-charts) is a legacy compatibility stub and was skipped. Dates for biomcp.org entries come from each article's first commit in the local biomcp repo. The what-is-a-vcf-file stub carries a commented example of the pattern for future botassembly.org entries.

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
- Light mode keeps code blocks dark (Shiki ships Nord's dark colors). Alternative: dual-theme Shiki with nord-light-ish theme if a light code block is wanted.
- Category pages (/writing/category/agents/ etc.) are not built yet — categories render as labels only.
- Footer and About link to real GitHub, X, and LinkedIn profiles. Substack stays a commented-out placeholder until the account exists.
- Cutover plan: move astro/ contents to repo root, keep CNAME, switch the GitHub Pages workflow from MkDocs to Astro.

## Refinement pass (2026-08-28)

- Projects: added the Precision Oncology Platform (POP) entry with an external link to genomoncology.com/our-solutions/ (verified 200). The projects schema gained optional `order` and `link` fields. The index sorts by `order` first (POP, BioMCP, PangoPup) and falls back to date. The detail page renders "View on GitHub →" for `repo` entries and "Learn more →" for `link` entries.
- Theme toggle: the text button became a Phosphor-style inline SVG icon (sun/moon, regular weight, currentColor, MIT license). The sun shows in dark mode and the moon in light mode. The icon shows the mode a click switches to. aria-label, focus, and localStorage behavior are unchanged.
- Writing: deleted the why-biomcp-exists draft. The homepage pinned slot now points at the We Deleted 35 Tools post on biomcp.org. Every entry carries a 2-3 sentence description and the index shows it as the blurb for local and external entries alike.
- Talks: every talk carries a 2-3 sentence description and the index shows it under the event name.
- Talk pages: new section order is video (or listen link / placeholder), anchor links (Key takeaways · Description · Transcript), key takeaways, a Description section holding the summary, then Transcript with the chapter links directly under its heading.
- Papers: descriptions are now 2-3 sentence summaries of each paper's actual abstract (fetched from Europe PMC) and the index shows them.
- About: Ian's photo (public/images/avatar.png) sits at the bottom of the page at 160px with a subtle Nord border. The photo placeholder note is gone.
- RSS: unchanged. The feed still builds full-text and excludes external entries and drafts.
- Markdown for agents: every local content page has a raw markdown twin at the same path with `.md` appended (Astro static endpoints, text/markdown, `# title` + one metadata line + raw body). Each page shows a Copy Markdown button and a View as Markdown link near the meta line. `public/llms.txt` is hand-written per the llmstxt.org format and every link resolves in dist. `/llms-full.txt` concatenates all content markdown in one fetch. The footer carries a muted llms.txt link near the RSS icon.
- Repo root: AGENTS.md is now the real instruction file with content checklists; CLAUDE.md is a relative symlink to it.
