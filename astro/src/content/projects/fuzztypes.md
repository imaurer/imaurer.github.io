---
title: "FuzzTypes"
description: "Pydantic extension types that autocorrect on the way in — fuzzy and semantic matching of free text to controlled vocabularies at validation time."
date: 2024-03-01
category: building
tags: [python, pydantic, open-source]
repo: "https://github.com/genomoncology/fuzztypes"
status: "active"
---

FuzzTypes extends Pydantic with annotation types that resolve messy input into clean, controlled values during validation. Instead of validating and rejecting, the types match: aliases, fuzzy string similarity, and semantic search against a named-entity store.
