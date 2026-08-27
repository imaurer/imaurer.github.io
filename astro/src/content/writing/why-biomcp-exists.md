---
title: "Why BioMCP exists"
description: "Language models get more useful and more reliable when they retrieve information and call trusted tools instead of answering from memory. BioMCP is that tool layer for biomedicine."
date: 2025-11-04
category: agents
tags: [biomcp, mcp, tools]
draft: true
---

Large language models are powerful prediction systems, but they need grounding. In a complex domain like precision oncology, a model answering from memory alone makes up what sounds like a good answer. It gets better when it uses a tool. Research keeps confirming the pattern: connect a model to a curated tool set and its accuracy improves across the board.

Curated knowledge graphs sit on the other end of the spectrum. They encode relationships among diseases, genes, variants, drugs, therapies, and trials. They are explainable and traceable. They are also expensive to maintain. Language models add flexible synthesis and natural-language interaction. The practical direction is a hybrid system: curated sources plus models plus tools.

The Model Context Protocol standardizes the tool half of that hybrid. A chat client or agent can discover and call tools exposed by a server without a bespoke integration for every application. BioMCP is a focused biomedical tool layer built on that standard: an open-source Python library, command-line interface, and MCP server over ClinicalTrials.gov, PubMed/PubTator, MyVariant.info, cBioPortal, OncoKB, and FDA adverse-event data.

The CLI started as a testing convenience and turned out to matter on its own. Coding agents use command-line tools remarkably well, so the same interface serves automated tests, agents, and humans:

```bash
# Find open melanoma trials, five per page
biomcp trial search --condition melanoma --status open --page-size 5

# Check that the upstream data sources are reachable
biomcp health check
```

The design goal is restraint. Expose enough structured, well-described tools for a model to act effectively — without overwhelming its context window or confusing tool selection. And trust the whole chain: the server, its dependencies, and the sources behind it. If you would not trust ClinicalTrials.gov or PubMed directly, no protocol fixes that.

The objective is not to replace expert judgment with an unverified answer. It is to turn hours of searching into a better, cited starting point for expert work.
