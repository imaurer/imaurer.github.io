---
title: "Introducing ThinkThen"
description: "Ian introduces ThinkThen, an open-source library that turns System One decision models like TypeSafe's Jev into ten plain functions. The talk walks through each function on Beatles questions, shows ThinkThen in Bash, 24 languages and three databases, and covers blind spots, retrieval-augmented decisions and use cases."
date: 2026-10-02
category: building
tags: [ThinkThen, Jev, decision models, Rust, DuckDB, Postgres]
event: "GenomOncology"
eventDate: 2026-10-02
youtubeId: YbzrlpAyCV4
summary: |
  Ian Maurer introduces ThinkThen, his open-source library for System One decision models. TypeSafe released Jev on September 15. Jev is three classifiers served as a hosted, zero-shot API. A choose call takes about 60 milliseconds and costs a fraction of a cent. Ian compares it to the four-minute mile. Liquid AI, Ollama and OpenAI followed within two weeks.

  The middle of the talk walks through the ten functions on Beatles questions. decide returns yes, no or not sure, and thresholds and bands set where each answer starts. choose picks one option. tag applies labels. score places text on named levels. filter, rank and find work over many records. recognize finds names in text, and relate connects them through rules. Stored question files, annotate and exit codes let a Bash script act on the answers. The Rust core runs in 24 languages and inside Postgres, SQLite, DuckDB, Polars, pandas and R.

  The last third covers limits and uses. Jev misses obscure facts, falls for tricky wording and cannot connect two facts on its own. Putting the relevant facts in the context fixes much of that, and Ian calls this retrieval-augmented decisions. audit and diff grade runs and show what changed. Use cases include agent harness guardrails, ops and security triage, data science inside databases, and retrieval. Ian built Beatles Bench because healthcare data cannot go to a new service without paperwork. Jev leads the decision models on it, and a chat model still wins at trivia. GenomOncology will fine-tune decision models for precision oncology. ThinkThen 0.1 is alpha.
takeaways:
  - "Code sees characters. Decision models like Jev let a program ask what text means and get a probability back in about 60 milliseconds."
  - "Jev is hosted and zero-shot, so there is no labeling, training or inference hosting to set up first."
  - "ThinkThen wraps Jev's three classifiers in ten functions: decide, choose, tag, score, filter, rank, find, recognize, relate and annotate."
  - "Thresholds and bands turn a probability into yes, no or not sure, and exit codes let a Bash script act on the answer."
  - "The same functions run from 24 languages and inside Postgres, SQLite, DuckDB, Polars, pandas and R."
  - "Jev has blind spots. Adding the relevant facts to the context, which Ian calls retrieval-augmented decisions, improves accuracy."
  - "ThinkThen 0.1 is alpha. Test it, keep it out of production, and open issues."
chapters:
  - { time: "00:00", label: "Code sees characters, not meaning" }
  - { time: "00:34", label: "Jev and System One models" }
  - { time: "02:59", label: "Why I built ThinkThen" }
  - { time: "04:22", label: "decide, choose, tag and score" }
  - { time: "07:44", label: "filter, rank and find" }
  - { time: "08:56", label: "recognize and relate" }
  - { time: "10:41", label: "Stored questions, exit codes and annotate" }
  - { time: "12:06", label: "ThinkThen in Bash" }
  - { time: "12:40", label: "Rust, 24 languages, databases and data frames" }
  - { time: "13:54", label: "Blind spots and retrieval-augmented decisions" }
  - { time: "15:00", label: "audit and diff" }
  - { time: "15:49", label: "Use cases: agent harnesses, ops, data science and retrieval" }
  - { time: "20:02", label: "The field: Liquid d1, Ollama and OpenAI" }
  - { time: "20:50", label: "Beatles Bench results and bring your own backend" }
  - { time: "22:14", label: "GenomOncology, BioMCP and BotAssembly" }
  - { time: "24:03", label: "Try it and open issues" }
---

> Timestamps come from YouTube's caption track. Only proper nouns were corrected, such as ThinkThen, System One, GLM-5.3 Flash and BotAssembly. Two phrases stay as the captions heard them: "GPT uh 6 L" near the start and "I ThinkThen it'll be a way of hosting" in the field chapter.

## Code sees characters, not meaning

[00:00:00] Hello, my name is Ian Maurer. I'm the CTO of GenomOncology and I'm here to introduce ThinkThen, my new library for interacting with System One models like Jev. Uh when dealing with strings, programs or code sees just characters, right? They don't actually have the understanding of the underlying meaning of those characters. For instance, they might see the word Abbey Road, but they don't know that Abbey Road is an album or the song Octopus's Garden appeared on that album or Ringo Starr was the singer of it. Um, and models like Jev, so Jev

## Jev and System One models

[00:00:34] from TypeSafe was just announced two weeks ago on September 15th or so. And what that what Jev is is a collection of three classifiers, a single classifier, a multiclassifier, and a multilabler. And that uh API that they provided is extremely low cost, extremely fast, and really unlocks a variety of of use cases. Now, while it's very similar to machine learning algorithms and and models that we've had for a long time, uh they've done a couple things uh really interesting. One, they've told a good story. Like they've actually explained to people what the value of it is, how it contrasts with with LLMs uh and they've made it clear that, you know, these types of predictive decision

[00:01:15] making is that, you know, LLMs aren't as strong at as as, you know, a competing classifier like Jev. Uh, they've also, compared to the, you know, prior generations of of classifiers, they've made it very easy to use by having a hosted service, you know, with high high availability and and and high and very performant and very easy to use. And it's zero shot meaning that you can basically ask it questions um and it'll start answering with you know basically near frontier level of intelligence right I would say it's you know the GPT uh 6 L level of intelligence or some of the flash models it's around that level of intelligence um and that means with

[00:01:57] being zero-shot that does means that you don't have to do what you'd have to do in the past with machine learning models which is label data train a model uh and and do set up inference and hosting So it really just reduces the, you know, the activation energy and the the level of expertise you need. And so you can see here that taking some text like Octopus's Garden and asking Jev, you know, who sang it, uh, it can do the the choose operation in 60 milliseconds for, you know, a fraction of a penny and get happens in this case happens to get the right answer. And now, you know, I'm comparing it here to the four-minute mile because, you know, they've kind of done something that hadn't been done before, but really set to the market, hey, this is something that's

[00:02:37] interesting. Uh people have rallied behind it and competitors honestly have just kind of come pouring out of out of the woodwork already to compete with Jev. Uh including, you know, OpenAI who just announced their decisions API two days ago. So you know I'm was very interested in Jev and wanted to incorporate it into our software and I saw a need. The need is you know

## Why I built ThinkThen

[00:02:59] basically how do we operationalize this stuff around something more than just these three primitives. Uh I started with a data set to start playing with uh because we we deal with a lot of healthcare information. I can't start sending that to a a new service like Jev uh without a bunch of paperwork being signed. And so I created a data set called the Beatles Bench which basically has strings in it right for songs and albums and and singers and and and times and that's up on a public website if anyone wants to leverage it for their testing. And so I used it to test uh this new this new functionality that I've created 10 functions. Uh the idea is that it's called ThinkThen

[00:03:39] which means you know that your software can ThinkThen take an action right ThinkThen decide ThinkThen filter rank etc. Uh each of these functions has a variety of options which I'll talk about. There's some tools as well to help with, you know, benchmarking and and caching and and some other nicities. And the the library has been written in Rust and been ported to, you know, 24 different languages. And there's a a command line interface as well that's useful for, you know, both humans creating scripts for DevOps and bioinformatics. And then there's also extensions that work directly in databases like Postgres and SQLite and and DuckDB as well as you know Polars and pandas and other you know other

[00:04:19] tools that data scientists use.

## decide, choose, tag and score

[00:04:22] So you know what are these functions right? So you know as I said Jev really has three underlying functions uh that are called classifiers. My functions are kind of like 10 plain English uh functions that are just a little bit easier to understand. So in this case we've got the first function is called decide which gives you an answer of either yes no or or not sure and it's all based on your threshold. So if you call is this a love song with these four songs you know Taxman comes out with a clear no She Loves You comes out with a clear yes and Yesterday and Michelle are kind of in the middle th those scores 0.56 and 73 are the actual probabilities coming out of the Jev classifier. You

[00:05:02] know you could say confidence or or likelihood uh that that's the right answer. And so by setting your threshold at 0.5, you get all three as yeses. But for your business rules, you might say, "No, no, uh yesterday is not is not a love song. Therefore, we should look at, you know, setting a band a different threshold. Maybe moving it up to 7 or maybe even creating a bar in the middle, like an uncertainty bar in the middle where anything in between, you know, maybe 0.1 and 0.9 or 3 and 7 actually register as as a as an unknown answer." And that can be used with human in the loop when you're trying to, you know, make decisions and you want the computer to only take action when it's very

[00:05:42] confident in the in the answer that it's rendering. Uh there's also the capability called choose. In this case, I'm choosing who the lead singer was on on these five songs. You can see that it's, you know, very good at, you know, four of the songs. Uh and then the one that happens to be a duet, it it it struggles a little bit. And and this is just because the model wasn't for these questions. Obviously, uh it was it seems like it was trained pre-trained on, you know, the corpus of the internet like large language models were. So, it does have some of this this world knowledge baked into it. Uh and as you as I'll tell you later, you know, you can improve uh the the performance that Jev has on some of these questions by just

[00:06:23] providing it more context as well. Uh there's also a tag function, right? Tag means you can apply one or more labels uh to your question, right? In this case, you know, tagging a tagging these songs with, you know, categories or labels like love song or sad or psychedelic, uh, you know, give you different results. And you can see that, you know, once again, thresholds can be used here, uh, to, you know, appropriately, uh, know when to include or not include a specific label for a given uh, entity. And then there's a scoring function. So score is basically uh, the way that, you know, our system works is that there's just levels, right? So you can do zero, one, two, as many up to 20 levels at this point. Uh

[00:07:05] and you can use those levels to be linear, right? In this case, it's it's how you describe the the levels is what matters. In this case, I'm just doing a linear scale of minutes. So, hey, given this song, how long do you think it is? And it does a pretty decent job of guessing the length of the song um in minutes. You can also give it a nonlinear scale where you say, "Oh, yeah. What I want you to do is to kind of bucket or bin uh the time of the songs into into five categories from zero to four." Um, and you know, the agent does a you know, once again, pretty decent job at this. And there's and and there's more tricks you can do to to get higher results rather than just trying to ask it trivia questions

## filter, rank and find

[00:07:44] about Beatles songs. And then filter is a function that lets you, you know, basically given a list of of of data elements, keep the ones that are above a a certain threshold or bar. And so here you can ask it what songs are on Abbey Road and it will, you know, give you those songs back to you. And then rank is uh sort order. So you're ask given that same list of songs, you can say, you know, which which one's the big biggest hit? And it would then it would then sort them based on on that uh and comparing that information. what's you know what Wikipedia says about these songs. Uh it it does pretty good at you know at least by eyeballing it. Hey Jude and Help! uh seem to be some of their

[00:08:25] biggest hits. Um you know find is you know finding one of of out of many. So you know which song did they release first? In this case the the highest probability song or highest probability score is is the one that's the you know quote unquote the best choice. And you can see once again the the uh the probability kind of ties to the the answer. Love Me Do and Please Please Me I believe are the two first songs that they did did release at least in the UK.

## recognize and relate

[00:08:56] Uh recognize is a the ability to actually find named entities within text. So an entity is a person, place, a thing. There's you know lots of types of entities that you might want to find in text. And this is really useful when you're trying to do, you know, knowledge extraction or data extraction from unstructured text. And this this process this this function really does three steps kind of behind the scenes. Uh the first is to actually find the individual uh you know nouns or or things in the in the in the actual underlying text. And it does that using a framework, a classification framework for finding the beginning and the middle and the end of words. And each word gets

[00:09:36] basically classified uh with confidence and then the system you know figures out which what are the words bundles them together and then labels the words right in this case we're labeling things you know person or a song or a place or an album and then it's finding relationships right wrote Octopus's Garden and Octopus's Garden uh was on the album Abbey Road so that relation step is actually also available separately so you can so you can call this function given a set of entities people, songs and albums and rules, right? What are the rules for actually connecting them? I can then find find those relationships based, you know, tying a subject and object through their

[00:10:16] through their predicate. And you can see on the right the the accuracy that that it does on on some of these songs. So, but once again, it's not perfect, right? It's not getting these answers perfectly. Uh that wasn't that's not the point. The point is, you know, the the functions are there, the model's as good as it is kind of out of the box, and then you're it's up to you to try to figure out how you want to actually use it and apply it to your business rules. Uh the some nicities for ThinkThen,

## Stored questions, exit codes and annotate

[00:10:41] right, there's the ability to store questions. So the qu this case, you can store a decide question and you know, put descriptions to the true and false. You know, the actual description here uh influences the answer, right? it influences the score that the model gives back to you. And in this case, I'm asking it for a threshold and I'm telling you telling it which fields from the input document to include and and so when you pass in, you know, one or more titles and albums, uh, it'll then give you a an answer and an exit code. And that exit code is really important for people that are doing, you know, uh, programming, right? So if you're building out DevOps scripts or or some other you know other programs where

[00:11:22] you're trying to react to data as it comes in live uh you can use those exit codes in your Bash scripts to you know do do workflow automation and then annotate is kind of a a catchall structured multi-step uh function. So given some you know given the set of questions in this case I'm ask actually asking you know four questions right who's the singer how would you tag it is it on Abbey Road and is it one of their biggest hits and then you can send the data through and then it gives you answers for all four of those questions right there in your data set so you can you know basically stream in you know stream in your data and it'll output your data with those

[00:12:02] additional fields attached to it and so you can then use this for Bash

## ThinkThen in Bash

[00:12:06] right so you can write a Bash script like this where you have a function saying did is this an original song. It returns true if it was it returns false if it was a cover and then you can then react to it and then you pipe in information and then the the script can can basically generate the answers. You can use that to uh to basically do a switch statement or a case statement to take some action and then the exit code is also useful. Right? some some Bash scripts you want to actually just use the exit code as part of your you know your logic as you're as you're doing

## Rust, 24 languages, databases and data frames

[00:12:40] uh you know ThinkThen was written in Rust so it's high performance and you know fast and you know memory safe and easy to port to other languages right it's a really great systems language uh and has lots of great paths for porting it to Python and TypeScript and Ruby and you know a variety of other uh scripting languages and then and then if you can get it and then wrapping it with C headers allows it to then just be sent out to a v another variety of systems programming languages like Zig and C++ and etc etc even got it working with COBOL and uh some other programming languages so um you know once again it's a it's there in scripting it's there in

[00:13:20] systems form and it's also in databases right so this is really helpful if you're you know dealing with large amounts of data and you want to you know classify classify data or extract uh um score things, apply labels. Once again, all available through uh you know, a namespace of functions that go along with those 10 function names that I that I've been talking about this whole time. And and it works with Polars and pandas and R data frames as well as you know these the databases SQLite, DuckDB, and Postgres.

## Blind spots and retrieval-augmented decisions

[00:13:54] Jev does have some blind spots when it comes to working with this information as you'll see, right? Like, you know, it doesn't doesn't do as well with some of the obscure songs or the tricky wording, right? It doesn't know, it gets confused when you say, "What's the first song on Yellow Submarine?" It thinks it's Yellow Submarine. And it doesn't do multihop, right? It basically is a oneshot thing. It's it doesn't try to tie two concepts together. In this case, like, you know, did the song Can't Buy Me Love come out in the same month as an Alaska earthquake, right? like it doesn't have that ability to to do that connection out of the box where a large language model would be able to you know make that make that query and and find that but you know one of the things you can

[00:14:34] do and I don't know if this is a term or not but retrieval augmented decisions right so we've had retrieval augmented generation before uh the concept is you go to a database you bring in the relevant content and you stick it in your context and then you can ask questions to it well we can do the same with with decisions out of System One models like Jev to give it more context and it just greatly improves its its accuracy on that information. Uh and then there's some additional

## audit and diff

[00:15:00] tools available. So there's an audit tool uh and it'll it understands if you give it benchmark information you can run your outputs against that and it'll give you you know your true positives, false positives, false negatives, your F1 score, precision, accuracy, recall that type of stuff. Like all that's available through audit and then diff uh lets you do you know before and after type grading right so you so you run you run your script once maybe add context later and now we can just show the the lines that only change right that go from you know a bad result or a no to a or an unknown to a different answer.

[00:15:38] It'll show you what what answers actually change whether those changes are good or bad they'll show up in the And so then taking these functions how do you apply them right what are the use

## Use cases: agent harnesses, ops, data science and retrieval

[00:15:49] cases so the first set of use cases and this is actually some of it was informed by a blog post from the CEO of of Jev's company TypeSafe, Diogo, uh and he put out a document and so some of these are actually harvested from that uh but you people are excited about agent harnesses and how prediction models or decision models like like Jev could be used uh to to to make make them more efficient, right? or make them more effective or have guardrails like permissions or tool choice or context like what should we how do we summarize things or hide things uh which model to use people are very excited about the idea of like doing model selection should I use a

[00:16:30] smart model or or a cheap model for this particular work and you can do you can do those types of work with a classifier that's that's how you make those decisions quick and cheaply um but you can you know parallelize work and check to see if something's uh safe uh is you know is the agent spinning out of control is and is is the agent done right or is and then is the answer better or worse or what have you. These are all good uses of a of a classifier like Jev used in a you know a set of functions like ThinkThen and so then you can also write ops and security scripts as well right so triage of alerts and failure routing grep is a

[00:17:11] you know classic Unix command you can basically do grep by meaning instead of grep by keyword or even vector grep I've seen before this is now a way of grepping your your or searching your a file for the lines that are the most important. In an LLM, you can actually give this tool to an LLM. It's a command line tool. You can say, "Hey, use ThinkThen to search these files. Find the files that are most relevant for me based on this question and then within those files, find me the the lines or of text that are most relevant because everything in agents are is about saving context. Um, you know, reducing the amount of text that they actually load into their memory and their into their working into their working memory. And then, you know, you and DevOps and

[00:17:52] security there's lots of things around you know looking at logs and assessing you know something suspicious or not uh looking at you know you know did did Jenkins fail did your tests fail and is that failure due to a bug or is that just a flaky test these are the types of questions and meaning that you could ask a you know a System One model that's in a cheap manner right you could always do this with a large language model it just was slow and expensive with Jev it makes it a lot a lot faster and a lot easier to to to do when something is costs a fraction of a se of a cent and and takes 60 seconds 60 milliseconds to run and

[00:18:32] then data science right so that's why getting this embedded into SQLite and Postgres and DuckDB and and Polars and pandas that was a top priority for me is because this this has a world of of value for for folks there those 10 functions just to get started can can help you with a variety of things with regards to labeling your data, extracting information, structured information out of unstructured information and you know counting things or whatever it is. So um you know data science is is is a great use for uh System One models like Jev and and ThinkThen hopefully makes that easy for people to do. And then you

[00:19:12] know retrieval I talked about retrieval earlier like the classification and meaning. Um I I see Jev as basically a new way of doing retrieval or a new way of making your retrieval better. Right? So we've had keyword-based retrievable TF-IDF BM25 for years and they're very effective semantic vector search is was very exciting three or four years ago. I think people are a little bit uh a little bit less excited about it. uh they've also tried hybrid, right, where you're combining both both techniques to get a little bit better results. This this result, this capability could potentially bring in the the meaning that that the people with using vector search were hoping they could get uh just from semantic similarity. Um so,

[00:19:54] you know, really, you know, look to use all three or four of these these concepts together. And then, as I said, you know, Jev was out two weeks ago.

## The field: Liquid d1, Ollama and OpenAI

[00:20:02] There's already competitors. Uh there's a lab called Liquid AI. They have a competitor called d1 that just came out a couple days ago. I already tried it. Works pretty works pretty great actually. Uh fairly competitive. And then Ollama has their first model called Nimble and tev1 as well. Uh so you can actually host this locally. There's going to be lots of ways of hosting this stuff locally. I ThinkThen it'll be a way of hosting models as well in in the next version of it. And there's open models up on JevBench. and then OpenAI just released their decisions API. Uh I'm pretty sure no matter what that API format is, I I'll make sure that ThinkThen uh will

[00:20:42] support it if it's at all possible. So once we get that API actually available to folks, I'll be adding that to the next version of ThinkThen. And so for

## Beatles Bench results and bring your own backend

[00:20:50] Beatles Bench, you know, you know, right now Jev is doing the best at like the answering of hard questions and even in the easy questions as well. Uh d1 was fairly competitive. Uh you know, Nimbles a little bit lower on the on the ranking and and there's other models as well up on on JevBench. And just for comparison purposes, you can see here GLM-5.3 Flash, even without the reasoning turned on, uh you know, just does way better at these this type of of trivia. Right? Once again, these are trivia questions.

[00:21:22] They're not uh they're not decisions and they're not and it's not really something I would fine-tune to to make decisions for you where Jev is, you know, in System One models like this. uh we're gonna we're going to do a lot to fine-tune these uh special in my case, especially in the cases of precision medicine and precision oncology. That's what my company's going to be doing uh to to roll out these decision tools to to folks. Uh you can bring your own backend. So if you do have a model or you do have an API, uh I'm collecting those here on an awesome list. U basically would ThinkThen there's a a checker. So you can run the checker against your API and it'll make sure that it's you know got all the API endpoints that the that the System One

[00:22:03] API is looking for uh or you know once the decisions API comes out from OpenAI will support that that uh that specification or schema as well. And so

## GenomOncology, BioMCP and BotAssembly

[00:22:14] ThinkThen is you know a new open source project from my myself and my company If you're interested, we also have a a project called BioMCP, which is basically a proxy server for over 70 different sources and allows you to search and get entities, genes and variants and articles uh for doing biomedical agents. And so building verifiable medical biomedical agents with BioMCP is, you know, you can reach out to me if you're if you're working on those types of problems. I also have a a new framework, I guess, for lack of a better term, for building agents. Uh I pause releasing the fir very first version of that for Jev and we'll be

[00:22:54] introducing Jev to handle some of the control flow decision making and some of the other you know kind of places where judgment or decisions should be done uh more cheaply uh and then GenomOncology itself that that's my company we do precision oncology we have a what's called a pathology workbench which is generating uh reports for oncologists for their patients to help them find clinical trials and therapies uh for based on genomic markers. Our our precision oncology platform is actually good oldfashioned AI. It's a knowledge graph that lets you match patients to therapies and trials and and helps you with annotating and and interpreting variants. And then for biomedical

[00:23:35] agents, that's kind of where I spend most of my time these days, which is how do we take tools like ThinkThen and BotAssembly and BioMCP and help people bring this stuff all inhouse into agents that they can control that are HIPAA compliant that respect patient privacy and can scale to whole genome and and and handle all the all the great information that we have now available to help patients uh with cancer and rare diseases and you know other afflictions.

## Try it and open issues

[00:24:03] So, please reach out if you have any questions about ThinkThen or any of or my company or any of my other projects. Uh, thinkthen.dev is live and the the very first version of the the project. It's alpha quality at this point, right? It's 0.1 release. Um, so, you know, don't use it in production yet. Fully test it. You know, you know, if you're testing one of the surfaces, one of the the language bindings I'm using, uh, be sure to open up issues if you run into any challenges with uh using ThinkThen uh in your test cases.

