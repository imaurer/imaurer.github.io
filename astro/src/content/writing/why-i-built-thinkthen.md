---
title: "Why I Built ThinkThen"
description: "Jev gave code a cheap, fast way to ask a question about text and get a probability back. ThinkThen wraps its three classifiers in ten plain functions, a command-line tool and 24 bindings. This post covers why I built it, what it gets wrong, and where it fits in cancer care."
date: 2026-10-07
category: building
tags: [ThinkThen, Jev, decision models, Rust, DuckDB]
draft: false
image: /images/why-i-built-thinkthen.png
---

![The ThinkThen launch card. The Beatles go in, ten functions come out, and each row shows one recorded answer with its probability.](/images/why-i-built-thinkthen.png)

Code sees characters. A program can hold the string "Abbey Road" and never know that Abbey Road is an album, that "Octopus's Garden" is on it, or that Ringo Starr sings it. Search matches letters. A model knows things.

On September 15 TypeSafe released [Jev](https://typesafe.ai). Two weeks later I recorded a talk about it and about ThinkThen, the library I built on top of it. You can [watch the talk](https://www.youtube.com/watch?v=YbzrlpAyCV4) or read the [transcript](/talks/introducing-thinkthen/). This post is the short version, with the parts I would stress if you asked me about it in person.

## What Jev changed

Jev is three classifiers: a single classifier, a multi-class classifier and a multi-labeler. We have had models like that for a long time. TypeSafe did three things differently.

They told a good story. They explained what the model is for, how it differs from a chat model, and why predictive decisions are a job LLMs do badly. They hosted it, so it is available, fast and easy to call. And it is zero-shot. You ask a question and it answers with near-frontier intelligence, around the level of the flash models. No labeled data, no training, no inference hosting. The activation energy drops to almost nothing.

Ask Jev who sang "Octopus's Garden" and the choose call comes back in about 60 milliseconds for a fraction of a cent, with the right answer. That is the four-minute mile. Someone showed it could be done, and competitors came pouring out of the woodwork inside two weeks: Liquid AI's d1, Ollama's local models, and OpenAI's announced Decisions API.

## Why I needed more than three endpoints

I wanted Jev in our software right away. The question was how to operationalize three primitives into something a program can use.

I also could not start with our own data. We deal with healthcare information, and I can't send it to a new service without a stack of signed paperwork. So I built [Beatles Bench](https://github.com/botassembly/beatles-bench): strings for songs, albums, singers and running times, with every answer harvested from Wikipedia and Wikidata. It is public. Use it to test your own setup.

## Ten functions with plain names

ThinkThen means your software can think, then act. Think, then decide. Think, then filter. The ten functions wrap Jev's classifiers in names a programmer already knows.

- **decide** answers yes, no or not sure. The probability is Jev's. The threshold is yours. Ask "is this a love song?" and "Taxman" is a clear no, "She Loves You" is a clear yes, and "Yesterday" sits at 0.56. A band such as 0.3 to 0.7 turns that middle into not sure. That is how you build a human-in-the-loop gate that acts only when the model is confident.
- **choose** picks one option. It got four of five lead singers right and stumbled on the duet.
- **tag** applies every label that fits, each with its own threshold.
- **score** places text on levels you name, up to 20 of them. Linear minutes work. So do five buckets from very short to very long. The description of each level drives the answer.
- **filter** keeps the records above your bar. **rank** sorts by probability. **find** picks one answer out of many, such as which song they released first.
- **recognize** finds named entities in text. Under the hood it classifies each word as the beginning, middle or end of a name, bundles the words, labels them, and then finds relationships. **relate** runs that last step on its own. Give it people, songs and albums plus the rules that connect them, and it returns the edges.
- **annotate** asks a saved set of questions of every record and streams the records back out with the answers attached.

None of these answers is perfect out of the box. That is not the point. The functions are there, the model is as good as it is, and the business rules are yours.

## Answers are exit codes

A stored question file holds the question, what true and false mean, the threshold, and which fields to read. The descriptions change the score. The exit code makes this usable from DevOps scripts and bioinformatics pipelines: yes exits 0, no exits 1, not sure exits 3, and a Bash case statement takes it from there.

ThinkThen is written in Rust, so it is fast, memory safe and easy to port. It runs in 24 languages, from Python, TypeScript and Ruby, through C headers, out to Zig, C++ and even COBOL. The same ten names work as functions inside Postgres, SQLite and DuckDB, and over Polars, pandas and R data frames. Getting into databases was my top priority, because that is where the labeling, extraction and counting work lives.

## Where Jev breaks

Jev has blind spots. It fades on obscure songs. Tricky wording fools it: ask for the first song on the album Yellow Submarine and it answers "Yellow Submarine". And it does not do multi-hop. It will not connect a song's release month to an Alaska earthquake on its own. A large language model would.

The fix is the one we already know from retrieval-augmented generation. Go to your database, pull the relevant facts, and put them in the context. I call it retrieval-augmented decisions. On Beatles Bench, handing Jev the song catalog in the text moved it from 68% to about 97% on the 1,075 questions the catalog covers. The [open-book report](https://github.com/botassembly/beatles-bench/blob/main/reports/open-book.md) has the runs.

Two tools help you see this. `audit` grades a run against a benchmark and prints precision, recall and F1. `diff` shows only the answers that changed between two runs, so you can tell whether adding context fixed things or broke them.

## What I would use it for

Diogo Almeida, TypeSafe's CEO, wrote a post on decision models inside agent harnesses, and several items on my list come from it. Permissions. Tool choice. Which model gets this step. Whether two tasks can run at once. Whether the agent is spinning in circles. Whether it is done. Each one is a cheap question with a probability behind it.

Ops and security: grep by meaning instead of by keyword. Hand the command-line tool to a coding agent and let it find the relevant files, then the relevant lines, because everything in agents is about saving context. Did the build fail because of a bug or a flaky test? Is this alert suspicious? You could always ask an LLM these questions. It was slow and expensive. At a fraction of a cent and 60 milliseconds, the economics change.

Data science: labeling, extraction and counting inside the database you already have.

Retrieval: keyword search and vector search both work, and both miss meaning. Use search to narrow the set and a classifier to judge what is left.

## The bench, honestly

On Beatles Bench Jev scores 70.5% overall and leads the decision models. Liquid d1 is close behind. Ollama's local Nimble sits lower. GLM-5.3 Flash, a chat model with reasoning turned off, scores 96.7%. The [model report](https://github.com/botassembly/beatles-bench/blob/main/reports/models.md) has the table. That result is fair. These are trivia questions, and trivia is not what I would fine-tune a decision model for. Precision oncology is, and that is what GenomOncology will do.

Bring your own backend. `thinkthen check` tests whether a server speaks the System One API, and [Awesome ThinkThen](https://github.com/botassembly/awesome-thinkthen) collects the ones that pass. OpenAI just announced a Decisions API. Whatever format it uses, I plan to make ThinkThen work with it.

## Where this fits

I spend most of my time on biomedical agents. [BioMCP](https://biomcp.org) retrieves evidence from over 70 sources. [BotAssembly](https://github.com/botassembly/botassembly) runs a folder of Markdown files as an agent workflow and leaves a record of every run. ThinkThen lets a program ask a model to decide, choose or score. The goal is agents a hospital can run in-house: HIPAA compliant, respectful of patient privacy, and able to scale to whole genomes.

ThinkThen is open source, from me and my company, GenomOncology. Version 0.1 is alpha. Don't run it in production yet. Test it, and open an issue when a binding breaks.

- Install: [thinkthen.dev/install](https://thinkthen.dev/install/)
- Code: [github.com/botassembly/thinkthen](https://github.com/botassembly/thinkthen)
- Launch article: [Introducing ThinkThen](https://thinkthen.dev/blog/introducing-thinkthen/)
