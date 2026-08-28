---
name: transcript-keywords
description: "Fix mis-heard proper nouns in talk transcripts — the canonical keyword list and the rules for applying it."
---

# Transcript keyword cleanup

Auto-captions mangle proper nouns. Ian Maurer approved correcting proper
nouns in transcript bodies. This is a documented exception to the
no-rewording rule for talk transcripts: fix ONLY proper nouns, never reword
anything else.

## The fix-only-proper-nouns exception

- Only touch a word or short phrase that is a proper noun (a person's name,
  a company name, a product or library name).
- Never fix grammar, punctuation, word choice, or anything else in the
  transcript body, even when it reads awkwardly. That is the normal
  no-rewording rule and it still applies to everything except the proper
  nouns below.
- Apply this to talk pages in `astro/src/content/talks/` and to the one
  notes capture file that Ian named an exception
  (`notes/marketing/talks/the-intersection-of-ai-and-genomic-analysis-ian-maurer-48eQ6sYNU8s.md`).
  Every other notes capture file stays a verbatim raw capture — do not touch
  proper nouns there.

## Judgment rule

Only fix a mis-hearing when the surrounding context makes the intended
proper noun certain. When unsure, leave the text as-is and list the
uncertain spot in your report so a person can decide.

## Canonical keyword list

Name → known mis-hearings the auto-captions have produced:

- **Ian Maurer** → "Ian Moore", "Ian Marr", "Ian Moyer", "Ian Mauer", "Ian
  Mower", and bare "Moore" / "Marr" / "Moyer" where context clearly means
  Ian. Leave "Moore's Law" and any other real person named Moore, Marr, or
  Moyer alone.
- **Ron Laneve** (host of the Bell Falls Search podcast) → "Ron lenie",
  "Ron Lenny", "Ron Laneve" variants.
- **Brulant** (Ian's consulting-career employer) → "brong", "Bruant", and
  similar mis-hearings where context is that employer.
- **Publicis** → "Publis", "Publisis".
- **attrs** (the Python library) → "Adders" where context means the
  library.
- **GenomOncology** → "Genomic Oncology", "Genom Oncology", "Genome
  Oncology", "genomoncology" (wrong casing), "genomicology",
  "gnomon collegey", and similar mis-hearings where context means the
  company.
- **BioMCP** → "bio MCP", "biocp", and similar mis-hearings of Ian's
  open-source project name.
- **PangoPup** → mis-hearings of this project name.
- **Pydantic** → "pantic", "pedantic" where context means the Python
  library.
- **FastAPI** → mis-hearings of this Python library name.

## After fixing a transcript

Update the page's caption-caveat line (the blockquote near the top that
describes the transcript source) if it claims names are mis-heard and
those examples are now fixed. Rephrase it to something like: "auto-captions;
proper nouns corrected, otherwise verbatim."

## Keeping this list current

Add new mis-hearings to this list whenever a new transcript lands. Do not
rely on memory across sessions — the list is the source of truth.
