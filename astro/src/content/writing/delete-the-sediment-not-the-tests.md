---
title: "Delete the Sediment, Not the Tests"
description: "Coding agents write a small test for every step and never clean up. Deleting every unit test fixes the pile but throws out some of the best tests you have. This post separates test sediment from the tests worth keeping and links a skill for both."
date: 2026-10-05
category: agents
tags: [coding agents, testing, skills]
draft: false
image: /images/delete-the-sediment-not-the-tests.png
---

![Three onions of nested layers, from function in the middle out to the interface. In build, many scaffolding tests pile up in the inner layers. In move outward, they thin out and a behavior ring starts at the interface. In land, a full behavior ring remains with a few kept tests inside.](/images/delete-the-sediment-not-the-tests.png)

A lot of people now talk about deleting their TDD tests. Some delete every unit test to speed things up. My reaction: mostly right, but deleting all of them overcorrects.

## The problem is real

Test-driven development works well for agents. Write a failing test, make it pass, move on. The trouble comes after green. Each step leaves a small test behind, and the agent never cleans up. I call the pile test sediment.

Sediment costs more than build time. Tests pinned to internals break on refactors that keep behavior. Some lock in wrong behavior, so a bug fix means defending the old wrong answer first. Tautological tests assert what their own setup made true. They pass forever and tell you nothing. Speed matters more with agents, too. They run the suite constantly.

OpenClaw is the example I keep coming back to. They deleted around 400,000 lines of their own tests with little change in coverage. Their [test-audit skill](https://github.com/openclaw/openclaw/tree/main/.agents/skills/test-audit) shows how they did it.

## Where deleting everything goes wrong

The problem is redundant and tautological tests. Unit tests are not the problem. An edge-case table for a parser is one of the best tests you have. It packs boundaries, empty input and bad input into one place, and it runs in milliseconds.

So delete with evidence. Don't delete by category. Mutation testing gives the evidence. Tools like cargo-mutants for Rust and mutmut for Python change the code and see which tests notice. A test that catches no mutant the rest of the suite misses can go. Never delete the only test of a behavior. Write the outside-in test first, then delete.

A fast suite has other sources too. Run tests in parallel. Replay recorded responses instead of calling live services. Split load tests into their own job.

Keep TDD itself. Red-green is scaffolding. Take it down before the change lands.

## Think in layers

Software nests like an onion. Functions serve modules. Modules serve libraries, libraries serve the core, and the core serves the app. The user meets the outermost layer: a command line, an API or a screen.

Write each behavior test at the outermost layer that can state it, in the caller's terms. Care little about the one or two layers below. They are free to change while the behavior holds. Test an inner layer directly only when it owns behavior worth stating on its own, such as a parser or a pure calculation.

## The four kinds that stay

- **Behavior tests** through the real entry point.
- **Edge-case tables**: boundaries, empty input, bad input and limits in one table.
- **Contract checks** on things others depend on, such as schemas and output formats.
- **Regression tests** that failed on the code before the fix.

Before a change lands, turn each red-green test into one of these four or delete it.

## The skill

I wrote this up as a skill you can drop into your own agent setup: [outside-in-tests.md](https://gist.github.com/imaurer/ac31f596bcfd7f46afe1c7dceedcba21). It covers growing tests red-green, four questions to ask before adding a test, the signs of sediment, and how to clean it up. It pairs with my earlier post on [coding agent proof spirals](/writing/coding-agent-proof-spirals/).

When someone says "we deleted all our unit tests and nothing broke", ask how they would know.
