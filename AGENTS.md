# AGENTS.md

Instructions for agents (and Ian) working in this repository.

## Orientation

- This repo is imaurer.com. It holds two sites.
- Legacy MkDocs Material site on `main` (docs/, mkdocs.yml, `uv run mkdocs build`). It serves production until cutover.
- Astro redesign in `astro/` on the `astro-redesign` branch. See `astro/STATUS.md` for build history.
- Dev server: `cd astro && npm exec -- astro dev --host 0.0.0.0 --port 4321` (bind 0.0.0.0 for network preview). Restart only for schema changes; it hot-reloads everything else.
- Build: `cd astro && npm run build` writes to `astro/dist/`.
- Never push without Ian's go. Production cutover happens only on Ian's explicit approval.

## Design system facts

- Nord palette. Dark is the default theme; light is the alternative. Colors live as CSS custom properties in `astro/src/styles/global.css`, switched via `[data-theme]` on the root element and persisted to localStorage.
- Ioskeley Mono for code, self-hosted in `astro/public/fonts/` (SIL OFL 1.1). Body text uses a system sans stack.
- Shiki syntax highlighting with the `nord` theme.
- Icons are Phosphor-style inline SVGs (viewBox 0 0 256 256 for Phosphor, fill currentColor). No icon fonts, no external requests.
- In-content links: accent underline, 3px offset, brighten on hover. Nav, wordmark, and footer links stay quiet with no underline. Monospace muted accent for anchor/chapter link rows.

## Writing voice rules

Copy for this site follows these rules verbatim:

- Subject-verb-object constructions.
- No cleft sentences ("It was X that...", "What X did was...").
- No contrastive appositives ("a pharmacologic action, not a mechanism").
- No appended glosses (dash or comma tails that explain what you just named).
- No trailing "which is / making / so that" clauses.
- Descriptions are 2-3 tight sentences.
- No hype.
- No hard-wrapped Markdown paragraphs. One long line each; the editor wraps.

## Checklists per content type

### Adding a Talk

```
[ ] File in astro/src/content/talks/<slug>.md
[ ] Frontmatter: title, description (2-3 sentences), date, category, tags, event, eventDate
[ ] youtubeId if a video exists; episodeUrl if a podcast page exists; both are optional
[ ] summary (multi-paragraph ok, blank-line separated) and takeaways list
[ ] chapters list ({ time, label }) when timestamps exist
[ ] Body is the transcript. Publish-cut transcripts only for talks with other speakers
[ ] Verify the air date from the source (episode page, YouTube), not from memory
[ ] Verify every chapter anchor resolves to a heading in the transcript
[ ] Page order renders: video → anchor links → key takeaways → description → transcript
```

### Adding a Writing post

```
[ ] File in astro/src/content/writing/<slug>.md
[ ] Frontmatter: title, description (2-3 sentences), date, category, tags
[ ] draft: true keeps it out of RSS but shows on-site with a badge; delete drafts that die
[ ] Images go in astro/public/images/
```

### Adding an External / Elsewhere entry

```
[ ] Stub file in astro/src/content/writing/<slug>.md with external + site fields
[ ] Body stays empty of substance; description carries the 2-3 sentence blurb
[ ] Verify the URL returns 200 with: curl -sL -A "Mozilla/5.0" -o /dev/null -w "%{http_code}" <url>
[ ] No botassembly.org entries until that site exists
[ ] External entries get no local page, no OG image, no RSS item, no .md twin
```

### Adding a Paper

```
[ ] File in astro/src/content/papers/<slug>.md
[ ] Frontmatter: title, description, date, category, venue, doi, pmid, authors, tags
[ ] description summarized from the real abstract, fetched from Europe PMC:
    https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:<pmid>&resultType=core&format=json
[ ] Body in plain language: what the paper does and Ian's role
[ ] Body ends with DOI and PubMed links
```

### Adding a Project

```
[ ] File in astro/src/content/projects/<slug>.md
[ ] Frontmatter: title, description, date, category, tags, status
[ ] order field controls index position (1 = first); date is the fallback sort
[ ] repo for a GitHub project ("View on GitHub →"); link for a site ("Learn more →")
```

## Every new page — cross-cutting steps

Do these for each page added, no exceptions:

```
[ ] Update astro/public/llms.txt with the page title + absolute .md twin URL
[ ] Confirm the .md twin route serves it (curl the dev server, expect text/markdown)
[ ] Confirm it appears in /llms-full.txt
[ ] Confirm the OG card generates (dist/og/<kind>/<slug>.png)
[ ] Confirm RSS includes it (local posts only; externals and drafts stay out)
[ ] npm run build passes
[ ] Check the page renders on the dev preview
```

## Verification habits

- Never trust dates or URLs from notes. Verify against the source.
- Never link the known fake CI4CC video y8E4e--jWCs.
- Write commit messages in the imperative mood.
