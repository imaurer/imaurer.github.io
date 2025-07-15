---
date: 2025-07-15
categories: ['Blog']
tags: []
authors: ['imaurer']
description: "Exploring a new class of AI tools that loop through reasoning and actions to complete complex tasks."
---
# I Call Them Loop Bots

I love creating software with [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview).

With the right Markdown plan, CC can reliably crank out work by finding, reading and editing files in a loop. Work done in 20-30 minutes that would have taken me at least half a day.

With less code to write directly, I'm getting better at making plans, reading code and [ai babysitting](https://changelog.com/friends/96) multiple projects at once.

##### AI-augmented memory vault

Claude Code also helps me do non-coding tasks in [Obsidian](https://obsidian.md/). I tell Claude what to do using Markdown [frontmatter](https://help.obsidian.md/properties), [tags](https://help.obsidian.md/tags), [callouts](https://help.obsidian.md/callouts) which triggers a simple monitoring script that fires [Claude Code slash commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands) to do edits. 

My document vault is synchronized across devices using [Obsidian Sync](https://obsidian.md/sync) which lets me collaborate with Claude using my phone from anywhere in a form-factor 100x better than chat.

This system is a [local first](https://lofi.so/), [file over app](https://stephango.com/file-over-app) long-term memory system for me to collaborate with AI on my work.

##### One-shot tasks with Gemini

[Gemini CLI](https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/) is a recent release from Google and it has 3 really great features:

- Very strong model (Gemini Pro 2.5)
- Super long-context window (1M tokens)
- Generous free tier

Google still has some work to do as Gemini isn't quite up to Claude's ability to use shell tools causing it to be less reliable of a coding partner as of today.

In the meantime, I really like using Gemini for long-context, single-shot tasks such as reviewing. 

I have a (soon-to-be open source) context-builder (`cb`) script that let's me pipe prompts, code bases and shell commands directly into Gemini or any other command:

```
cb +review src/ tests/ "git show -1" | gemini -p > review.md
```

In this example:

- `+review` is a prompt that gemini "runs"
- `src/` and `tests/` are the folders is concatenated
- `"git show -1"` is the last commit to my repo

I find this pattern super powerful for my workflow and am thinking about architectures where a software like Claude Code or Gemini CLI replaces a standard LLM API call.

##### Naming is hard

But what do we call these new things like Claude Code and Gemini CLI? Current naming is a mess.

I have seen:

- Coding CLI
- Coding Agent
- AI Coding Agent
- Lightweight Coding Agent
- [Terminal Agent](https://simonwillison.net/2025/Jun/25/gemini-cli/)

Quick facts:

- It's not just about coding
- It's not just about the terminal or command line interface
- These are not agents

##### ReAct as a CLI

Just like "Reasoning Models" are an instantiation of the [Chain of Thought paper](https://arxiv.org/abs/2201.11903), I see this class of software as an instantiation of the [ReAct paper from 2022](https://arxiv.org/abs/2210.03629):

1. **Prompt** – User question provided with examples.
2. **Thought** – Model writes a brief reasoning snippet setting it's next sub‑goal.    
3. **Action** – Model issues a structured tool call (e.g. Read File).
4. **Observation** – System executes the call and adds output to context.
5. **Loop** – Decide whether to return to Thought (step 2) or go to Finish (step 6).
6. **Finish** – Model outputs final answer to the User.

If you break this down, you realize that reasoning and tool calling are not the interesting bits about this flow. Ordinary chatbots have had both of those capabilities for a while now.

What's left?

It's the looping, of course:

- Observing a result,
- In the context of a goal and
- Deciding whether to continue or exit.

That's the interesting bit about these tools.

And that's why I call them **Loop Bots**.

Kind of a dumb name and it probably won't stick.

But so was "Chatterbot" when it was [coined in 1994](https://www.interlogica.it/en/insight-en/chatbot-history/).
