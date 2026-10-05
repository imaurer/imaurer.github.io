# Red, Green, Remove: Outside-In Tests for Coding Agents

2026-10-05 · https://www.imaurer.com/writing/red-green-remove-outside-in-tests/

![Three onions of nested layers, from function in the middle out to the interface. In build, many scaffolding tests pile up in the inner layers. In move outward, they thin out and a behavior ring starts at the interface. In land, a full behavior ring remains with a few kept tests inside.](/images/red-green-remove-outside-in-tests.png)

The OpenClaw team reported deleting around 400,000 lines of their own tests without much change in code coverage. That number stuck with me. Models love writing a test for every tiny change, and nobody cleans up after them.

OpenClaw published the [test-audit skill](https://github.com/openclaw/openclaw/blob/main/.agents/skills/test-audit/SKILL.md) behind that cleanup. It gates new tests with four questions and sweeps the existing pile for junk. It's useful, and I borrowed its questions. But it reacts. The better move is to stop making the pile.

## Test sediment

Test-driven development works well for agents. Write a failing test, make it pass, move on. The trouble comes after green. Each step leaves a small test behind. I call the pile test sediment.

Sediment slows every build, and agents run the suite constantly. It breaks on refactors that keep behavior. Worst, it can lock in wrong behavior. A bug fix then means defending the old wrong answer first.

## Describe behavior first

My approach starts outside the code. Describe the behavior in the user's words. Grow tests red-green. Keep what states behavior, and remove the rest before landing.

I've found BDD with Cucumber powerful for the first step. Given a refund request, when the agent reads it, then it answers yes. Cucumber's example tables become edge-case tables. The shape matters more than the tool. Glue code between the plain-language steps and the system can become sediment too, so keep it thin or skip the tool. A brief that lists behaviors this way hands an agent its outside-in tests.

## Think in layers

Software nests like an onion. Functions serve modules, modules serve libraries, libraries serve the core, and the core serves the app. The user meets the outermost layer: a command line, an API or a screen.

Test each behavior at the outermost layer that can state it. Care little about the one or two layers below. They may change while the behavior holds. Give each behavior one owning test. A bug gets one regression test at the layer that owns it. Don't repeat it at every layer the bug crosses.

## Red, green, remove

1. Write the behavior as an outside-in test. Watch it fail for the right reason.
2. When a step is hard, drop to unit tests. They are scaffolding for the work in progress.
3. Make it pass.
4. Before landing, keep a test only if it is one of the four kinds below. Delete the rest.

The four kinds that stay:

- **Behavior tests** through the real entry point.
- **Edge-case tables**: boundaries, empty input, bad input and limits in one table.
- **Contract checks** on what others depend on: schemas, output formats, secrecy, releases.
- **Regression tests** that failed on the code before the fix.

## What about deleting all your unit tests?

A lot of people now talk about deleting their unit tests to speed things up. They're mostly right, but deleting all of them overcorrects. An edge-case table for a parser is one of the best tests you have. Delete with evidence. Mutation testing shows which tests catch mistakes nothing else catches. Never delete the only test of a behavior. Write the outside-in test first, then delete.

## The skill

I wrote this up as a skill you can drop into your own agent setup: [outside-in-tests.md](https://gist.github.com/imaurer/ac31f596bcfd7f46afe1c7dceedcba21). It pairs with OpenClaw's test-audit. Theirs cleans up the pile, and this one keeps it from forming. It also pairs with my earlier post on [coding agent proof spirals](/writing/coding-agent-proof-spirals/).

When someone says "we deleted all our unit tests and nothing broke", ask how they would know.
