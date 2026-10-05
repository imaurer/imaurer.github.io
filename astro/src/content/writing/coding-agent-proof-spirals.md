---
title: "Coding Agent Proof Spirals"
description: "Coding agents on long tasks sometimes start writing checks of their checks. This post describes that proof spiral, why workflow rules cause it, and how to stop it. The full skill is a gist you can drop into your own agent setup."
date: 2026-10-05
category: agents
tags: [coding agents, agent design, skills, ThinkThen]
draft: false
image: /images/coding-agent-proof-spirals.png
---

![A proof spiral: Build sits at the center, and each loop outward adds a larger step: check, record the check, review the record, check the checker. The spiral never reaches Ship.](/images/coding-agent-proof-spirals.png)

I work with coding agents on long tasks where they plan and develop on their own. Most of the time it works. Every so often an agent falls into an anti-pattern I call a proof spiral. It starts writing checks of its checks.

## What it looks like

The agent builds a feature and writes a check. The check needs a record. The record needs a review. The review finds a gap in the check, so the agent builds a better checker. Each step looks reasonable. Together they stall delivery, and the logs look rigorous the whole time.

These are the signs I watch for:

- The same check reruns while nothing it depends on has changed.
- New gates appear after the existing gates pass.
- Review findings never connect to a product failure.
- The agent builds tools to check its checks: receipt checkers, fingerprints, provenance chains.
- I ask for status, and the agent describes proofs. It doesn't tell me what works.

The vocabulary gives it away too. Frozen, sealed, byte for byte, fresh, exact receipt. When those words show up in status lines that keep ending in "remains pending", I go look.

## Why it happens

It's tempting to blame the model. Look at the workflow first.

Workflow rules often make defects and violations explicit. They rarely say how long delivery should take or how much uncertainty is fine to leave behind. Take three reasonable rules: "always verify independently", "fix every finding" and "persist until done". Together they prevent completion. A model that follows instructions well obeys all three. Strong instruction following becomes the liability.

Rules also pile up. Each bad run earns a new rule, and the old rule stays.

Checking can also stand in for access. An agent that can't reach the real environment builds mocks and checkers instead. More local checks can't settle an external question.

## How to stop it

Start with one question: **What decision does this proof change?** If the answer is none, the proof is ceremony. This question stops a spiral earliest.

Then fix the workflow:

- **Use one stopping rule.** Complete the agreed checks and investigate concrete failures. Repeat or widen a check only when something relevant changed, or when the check can resolve a named uncertainty. Otherwise deliver.
- **Replace conflicting rules.** Don't layer an override on top. A temporary exception leaves the old rules in place.
- **Size checks by consequence.** A one-line authorization change can be critical. A wording fix may need only a look. Diff size tells you little.
- **Name what stays unknown.** When the available checks can't resolve something, record the limit and deliver the finished work. If an agreed acceptance criterion stays unmet, call it a release blocker. Don't claim readiness, and don't invent substitute proof.

Heavy checking isn't always a spiral. Releases, migrations and security changes can need it. Keep the checks that earn their place: behavior tests, one review, the release rehearsal, and checks on money, data, credentials and users.

## The skill

I wrote this up as a skill you can drop into your own agent setup: [proof-spiral.md](https://gist.github.com/imaurer/79c1b9f3bef3fea0f4c99f9342905a5c). It covers how to notice, diagnose, address and prevent a spiral. It also warns about itself. The skill must not become one more layer of rules.

## Also: introducing ThinkThen

I recently introduced ThinkThen. It answers typed questions about text and returns `true`, `false`, a label or a number. A failed call never looks like an answer. Use it to gate a script, label records, or grade answers in an eval.

```sh
thinkthen decide 'Does the customer ask for money back?' < message.txt
```

The command prints `true` and exits 0 for yes, 1 for no and 3 for not sure. A shell `if` can branch on it. It has ten functions, such as `decide`, `choose`, `tag` and `score`. They run across 25 surfaces: the command line, a Rust crate, language bindings from Python to COBOL, and SQL extensions for DuckDB, SQLite and PostgreSQL.

<div class="video-slot">
  <iframe src="https://www.youtube-nocookie.com/embed/YbzrlpAyCV4" title="Introducing ThinkThen" allowfullscreen></iframe>
</div>

[Watch on YouTube →](https://www.youtube.com/watch?v=YbzrlpAyCV4)

Read the docs at [thinkthen.dev](https://thinkthen.dev). The code lives at [github.com/botassembly/thinkthen](https://github.com/botassembly/thinkthen).
