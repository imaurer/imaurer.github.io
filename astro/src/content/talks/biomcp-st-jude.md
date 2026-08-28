---
title: "BioMCP: Biomedical Model Context Protocol"
description: "A language model connected to trusted tools and curated data beats a stand-alone chatbot for biomedical research. This talk introduces BioMCP and demos live trial search, literature review, and variant interpretation. It closes with a look at validated agents running behind hospital firewalls."
date: 2025-10-23
category: bioinformatics
tags: [BioMCP, mcp, agents, precision-oncology]
event: "St. Jude Children's Research Hospital"
eventDate: 2025-10-23
summary: "The most useful path for AI in biomedical research is not a stand-alone chatbot: it is a language model connected to trusted, well-designed tools and curated data. This talk introduces BioMCP, an open-source Model Context Protocol (MCP) server and Python library that gives assistants and agents access to biomedical sources such as ClinicalTrials.gov, PubMed/PubTator, genomic-variant databases, and FDA adverse-event data. Demos show how this approach supports literature review, trial discovery, variant interpretation, and structured research workflows. The talk closes by connecting BioMCP to rapidly improving coding agents and a future of privacy-preserving biomedical agents that run behind an institution's firewall, use validated workflows, and retain appropriate human oversight."
takeaways:
  - "LLMs are powerful prediction systems, but they need grounding. Models become more useful and reliable when they retrieve relevant information and invoke tools rather than answering from memory alone."
  - "Biomedical AI needs both curated knowledge and flexible language models. Curated knowledge graphs are explainable and traceable but expensive to maintain; the practical direction is a hybrid of curated sources, models, and tools."
  - "MCP standardizes tool access, and trust matters: an MCP server, its dependencies, and its downstream data sources must all be trusted, because tool output and prompt injection create real risk."
  - "BioMCP is a focused biomedical tool layer: a Python library, CLI, and MCP server over ClinicalTrials.gov, PubMed/PubTator, MyVariant.info, cBioPortal, OncoKB, and FDA adverse-event data."
  - "Research agents should follow an explicit workflow — decompose the question, plan searches, gather evidence, synthesize a cited brief, and critique the output. The goal is a better starting point for expert work, not an unverified answer."
  - "Coding agents point to the next interaction model: bounded tasks, planning, schemas, validation, and context management — techniques that transfer directly to biomedical work."
  - "Long-term biomedical use cases require privacy and validation: locally deployable models and tools behind an institution's firewall, with human review for high-stakes clinical use."
chapters:
  - { time: "00:07:07", label: "Introduction: GenomOncology and precision oncology" }
  - { time: "00:10:01", label: "The pre-training era" }
  - { time: "00:14:58", label: "Prompting techniques and RAG" }
  - { time: "00:20:13", label: "Post-training and reasoning models" }
  - { time: "00:26:59", label: "Knowledge graphs meet language models" }
  - { time: "00:33:33", label: "Model Context Protocol" }
  - { time: "00:38:54", label: "What BioMCP is" }
  - { time: "00:42:59", label: "Demos: trials, literature, variants" }
  - { time: "00:55:40", label: "The biomedical research assistant" }
  - { time: "01:00:20", label: "Coding agents and what comes next" }
---

> Timestamps refer to the original recording, not the published cut. They will be rebased against the YouTube video once it is posted.


## Introduction: GenomOncology and precision oncology

[00:07:07] but let's get into it. so, i'm ian. uh, i lead a company called GenomOncology. we've been around for about 13 years. uh, my colleague annab
[00:07:18] is actually on the call, too. she's a senior developer that's actually now working on BioMCP pretty much full-time. so, you'll see her name a lot in the github repo, which is great. um and then you know what we do is really we
[00:07:29] generate molecular reports right so about 70, 000 this year and so those reports have knowledge on it up until now we've been doing stuff the old school way what they call good oldfashioned ai with knowledge graphs
[00:07:40] and you know basically generating reports that say you know what are the variants what do they mean what are the uh clinical trials and therapies etc and our software is actually onrem we don't take data rights we don't do any of that
[00:07:51] kind of weird trading of data for software uh and you know uh and obviously large language anguage models are a part of our strategy long term and i can talk about that at the end. so in
[00:08:01] general what's why is this important right now? uh large language models, they're generative ai. they're next token predictors, right? and i'm going to get into like, you know, next token prediction versus pre-training versus
[00:08:13] post-training versus reasoning. um but basically, you know, especially in a complex domain like precision oncology, which is my focus, right? and i'm just going to say precision oncology. um is
[00:08:24] that they're they're good, but they're just making up what sounds like a good answer, right? and it's pretty good, but it's better when they use a tool. and this paper from june uh in nature talked
[00:08:35] about you know integrating gpt4 which is actually like an old dumb model at this point. um integrating it with a a tool set just greatly improves its accuracy and we're seeing that across the board
[00:08:46] and and i'm going to talk about coding tools as well. you might have heard of claude code. i'm sure people have heard of cursor. uh the new coding agents that are coming out and there's actually literally one every week that comes out.
[00:08:56] uh the coding agents are actually just a really powerful paradigm for how to do software development and i'm actually seeing exactly how that's going to translate to my work and my work is you
[00:09:06] know structuring unstructured data uh you know using that data to then you know drive decision support drive trial enablement and a bunch of other downstream use cases for our clients and you know i think that that clawed code
[00:09:18] kind of you know agent in a loop or llm in a loop calling tools i think has a lot of legs and u and BioMCP is is kind of my onboarding uh tool set for people
[00:09:29] to kind of get get their feet wet, but then to do this stuff seriously, we're going to we're going to need a new set of tools, and i'll explain what i mean by that later. so, this is why i'm excited, right? llms plus tools. uh and
[00:09:40] i'll talk more about my history with like my attempts at this uh over the last three years. and so, i'm going to go over pre-training, then post-training. i'm gonna, you know, do a deep dive on model context protocol,
[00:09:51] what it is, what BioMCP is. um, and then coding agents and biomedical agents kind of in this kind of this history like my errors tour effectively of of large

## The pre-training era

[00:10:01] language models generative ai. so the pre-training error, right? um, this this happened basically three years ago. why did it happen now, not 10 years ago? it's really because of these four
[00:10:11] things, right? we have the scaled compute. we got the gpus from nvidia. we've got the data. we've been collecting data on the internet for, you know, a couple decades at this point. the transformer architecture came out in
[00:10:21] 2017 or so. and then the self-supervised learning uh modality, which i'll explain in a minute, uh really unlocked the ability to train these models at scale. uh and then people just saw the pattern
[00:10:32] and then they threw a bunch of compute and a bunch of dates data at at compute and got you know first it was gpt 3. 5 and then four and then we were off to the races. so you know transformer is
[00:10:44] basically the technical architecture that underpins all of this. it's a neural net architecture deep learning architecture. i'm not an expert at this. i do understand the difference between an encoder and a decoder, right? i i was
[00:10:56] using encoders a few years ago to do classification uh you know named entity recognition and basically the way that you train an an encoder as you do this masking right
[00:11:07] you're basically hiding words and then you ask the during the training exercise you're asking the model to kind of predict the the missing word and then based on whether it gets it right or wrong it you know changes the the the
[00:11:19] model's weights with gradient descent decoders are basically on the other end the generative part and they they are basically trained using next token prediction and all that really means is
[00:11:29] you know if you have the the lazy dog and you know you ask it to predict the next word it's going to predict jumped right or whatever and if it gets it right it gets you know it gets a point it gets it wrong get loses a point
[00:11:39] that's not technically how it works but you get the gist um and the basic deal is they basically predict the next token for every word on the internet or every yeah every token on the internet and at
[00:11:51] the end you have this pre-trained model using using uh the using the internet's uh corpus and what that unlocks this just this capability of predicting the
[00:12:01] next word has just unlocked a a crazy amount of different capabilities right there's you know obviously you see it with like translation and in context learning and and that just allows you to
[00:12:13] then do uh prompt based tasks right before when you wanted to make a mo like to actually do something with ai quote unquote or machine learning you had to get a bunch of data you had to label
[00:12:24] that data and then you train the model and then that model did that thing really well. with large language models, you kind of don't need to do that, right? you get a smart enough model and you can write a good enough prompt and there's other tools as well to like tune
[00:12:36] the what's called tuning the prompt. you eventually you get to a point where then that model is basically doing any task for you. you just need to uh figure out a way to uh point it at a bunch of data and then have a way of improving it
[00:12:48] improving that prompt and now you have a you know a task specific um pipeline and so one of those prompting techniques that was figured out early on and and this is probably even before chat gpt
[00:12:59] was chain of thought prompting right so chain of thought prompting is the idea that if you just say uh i have a question and give me an answer and even if you show an example right in this
[00:13:09] example we're do we're actually showing an example where we say here's here's the question, here's the answer, another question, here's another answer. and now, obviously, this is with older, much smaller models, it might get it wrong.
[00:13:20] now, we wouldn't get it wrong. um, but but what they figured out was if you give the model the ability to kind of like think it through, quote unquote, think it through, like explain itself, explain its logic, uh it just does a
[00:13:31] much better job of like of of answering the question. and the reason why is the same reason why when we solve a hard harder problem is we break it down into smaller problems, right? that's how you do it. you you you take big hard
[00:13:42] problems, break them down into smaller problems. that's what i do all day making software, right? i don't try to write the whole uh big giant software at once. i try to figure out what's the smallest component that i could that i know how to build and then i go build
[00:13:53] that and then i assemble them together. uh and then another technique is called fshot prompting. and that that idea is you're giving it examples, right? so you can either say zero shot, which means you don't give it an example, you just
[00:14:04] ask it for an answer. and then there's one shot where it's like here's an example. uh now give me give me an answer to my question and then there's fshot where you're giving it multiple examples once again this is just you
[00:14:14] know basic what they call prompt engineering and there's tons of uh articles and and documentation online on that and that's the idea of like how do i take this how do i take this chatbot
[00:14:25] and make it do a specific task for me um and so there's lots of you know lots of great uh prompting techniques that are available great for your everyday use with a chatbot that you you know whether
[00:14:35] it's chatgpt or claude or whatever one you prefer uh and i highly recommend you you you kind of learn this as a skill. like it's it's definitely a skill for for 2025 that's still relevant. people say that it's prompt engineering's out.
[00:14:46] no, you still need to know how these large language models quote unquote think. once again, sorry for the anthropomorphizing. you need to learn how they think so that you can use them effectively and get get the results that you're looking for. um, another

## Prompting techniques and RAG

[00:14:58] technique that folks talk about is rag. so that stands for retrieval augmented generation. this is a great paper that you know was specific to the the medical domain where they showed uh how you take
[00:15:08] a question, you take that question, you turn that into either a semantic query or a keyword query or you com combine them a hybrid query and you retrieve the
[00:15:18] the relevant information and then you put that relevant information right in the llm and and as an output and this was really important in the days when the context windows were like 4, 000
[00:15:29] words or 8, 000 words and now it's you know you 750, 000 words or what have you for some of these bigger models. and what that allows you to do is just basically stick the whole pdf in something. before you were basically
[00:15:40] limited to like 10 or 15 pages of a pdf. and so what people would do is slice things up and and try to feed it to the lm. and the reason why you do this is because the large language model just
[00:15:50] does way better when it's been kind of grounded in some in some text. and there's definitely some interesting theories online on like why this is. it's but it's basically, you know, kind of shaping, you know, if you think of
[00:16:02] what these these models are, these uh just there just an infinite number of of combinations that can happen with these these models and the weights. what you're basically doing with by putting
[00:16:13] stuff in the context is you're kind of shaping those weights so that the next tokens that they're predicting are gerine to the content that was provided. it's just just how they work. and and once again, a lot of people don't really
[00:16:24] even know really or i say lots of people, we don't really know how they work, right? like we have guesses. there's mechanistic interpretability. people are, you know, tweaking these things all the time to to show that they
[00:16:34] can break them or show that they can make them think that they're the golden gate bridge. there's there's lots of weird things that you see online, but the basic gist is sticking stuff in the context, right? putting stuff in the
[00:16:45] chat window itself just makes these models way better at answering questions. and that's what rag is doing. it's doing it in an automated way where you're asking a question, retrieving content, putting in the llm, and then
[00:16:55] spitting out the answer. and then over here you even see the calculator. so the calculator is giving it tools. like this was an early version of someone giving something tools in this case like the med md calc, which is a really great
[00:17:05] website uh where they're kind of integrating it all together. and then there's the idea of fine-tuning, which has kind of gone in and out of fashion. uh it's kind of coming back a little bit now that uh reinforcement learning is is a big deal.
[00:17:17] and i'll talk about what reinforcement learning is, but this is the idea of taking a large language model. and this is really, you know, what people were hoping would work really well a couple years ago with small models like these small models that came out called llama
[00:17:27] from meta and and a few others. mistral was a a group company out of france that had some small models that people were fine-tuning on. and the idea of fine-tuning is you take the base model and then you give it examples, maybe a
[00:17:39] thousand if you have them. and you can even create those examples with a big smart model like gpt4 at the time. and you would basically have inputs and outputs and then you'd fine-tune the model. and then what happens is that model just gets better at your type of
[00:17:50] thing. and it was really good for things like format, like if you wanted it to generate a certain kind of json output, man, it was really good at like making sure that it generated the right fields and all that stuff. and it just cut down
[00:18:00] on the amount of context you needed to provide to the model uh so that you could save your space for other other stuff that you were actually working on. this kind of phased out because the the context windows got bigger. so people
[00:18:11] didn't need this as much and the models just got smarter and and and there's there's always this tension where the models just keep getting smarter and smarter that you that you're kind of like throwing away this work. so that's why i think that they it it fell out of
[00:18:23] favor. it it might come back with reinforcement learning. uh we'll see. but as long as there's kind of continuous improvement of the models, i'm actually down a little bit on on fine-tuning as being an approach. i'd
[00:18:33] focus more my efforts on, you know, creating the the scaffolding and the structure uh that actually let your uh lets the kind of the big bad models actually do their work. um and then this
[00:18:47] was all premised on this idea of the this paper called chinchilla paper, but it's called the scaling laws. and there's a great book called the scaling laws by um uh sorry this podcaster guy,
[00:18:58] his name evades me, but there's a scaling uh the scaling era is the name of the book. so you can google that. um, but basically it talks about the idea that there's this magic triangle of
[00:19:08] flops, the amount of compute, right? the number of gpus that you're throwing at something and the the number of parameters in your model, like how s how the big the model is, right? is it a 7b
[00:19:18] model? is it a 100b model? is it a one trillionb model? and the number of tokens. uh, and before there were, you know, new things like mixture of experts and and the reinforcement reasoning
[00:19:30] stuff. this was basically the iron triangle that everything was stuck to where you were basically trying to figure out what's the the maximum or the ideal number of tokens to train a model with the given flops and given
[00:19:41] parameters. and it just showed that if they could just throw more data at more compute and have a bigger model, you'll just get smarter results. that's basically what happens. and that continues to be true. the problem is
[00:19:52] there's diminishing returns just due to the cost, right? just and because there might be, you know, shortage of data as well. and so pre-training kind of hit a wall. so about a year ago, a little bit
[00:20:03] over a year ago at this point, i was actually a little bit down. i was like, well, i think this llm thing might have just peaked. and that's okay. like i think i can do a lot of good with what we've got, but doesn't seem to be

## Post-training and reasoning models

[00:20:13] getting better in 2024 seemed like kind of a down year. and then uh then basically what happened is the post-training era started. and it started with a model called 01 from uh
[00:20:23] gpt from the um from openai and then deepseek happened in like december or january and everyone kind of freaked out. so what is this thing? what what
[00:20:33] are we talking about? so these are reasoning models and what is a reasoning model? basically the chain of thought trick from earlier where you ask the model to explain itself and then you
[00:20:43] take those those trace what they're called traces of chain of thought and then you use those to basically fine-tune the model to post-train the model and what's happening is they're using math and they're using code and
[00:20:54] the reason why is because there there's a lot of verifiable data sets that are out there and they can obviously you know verify math uh separately so you can basically generate a lot of training data and code obviously can run and and
[00:21:06] pass unit tests. and by using those types of examples, uh we can then figure out what chain of thought leads to the best answer. and they do other tricks like, okay, yeah, these these two traces
[00:21:18] both ended up with the right math answer at the end, but this one did it in like half the steps. so, let's choose that one because if they're if they're thinking it through and they're thinking it through more efficiently, that'd be
[00:21:29] better for the model uh to be more efficient. so, that's the basic process, right? you're basically collecting these chain of thoughts and then you're fine-tuning the model to do that step and they're actually making it separate
[00:21:39] steps. they actually have a thinking step and then they have the output step. and some of the models show you what the thinking is and some of the the open source models uh definitely show you that the thinking process. some of them show you like a summary of the thinking
[00:21:50] process. but it's that thinking process that actually just got us a big boost uh in performance. and there's a you know a deepseek uh paper that so basically what happened is uh 20 2024 there's a bunch
[00:22:02] of vague posting and other things online where people were kind of talking about strawberry was the was the keyword that opening i was throwing about throwing around and sam alman got fired for a
[00:22:12] minute and that was all about this 01 model that came out in september october and 01 was was kind of cool and kind of impressive. i i played with it and got access to 01 pro and i saw that that was
[00:22:24] definitely a big leap and then deepseeek came out and the the great thing about deepseek it's a model from uh china open source is that they kind of explained how it all works right like they they used a technique called grpo for doing
[00:22:37] their uh fine-tuning but they basically opened up the recipe and then all the other labs basically copy the recipe and so everybody has a reasoning model now and so the reasoning
[00:22:47] models you know just broke through right so gp gpt40 was kind of the best pre-train only model and then you could see here even 01 was was jumping right right ahead of gpt40 and then since that
[00:22:58] time we've had 03 and we've had now gpt5 which is kind of a an amalgamation model of of all these things and and everything's just kind of gotten way better um uh since that time period. so
[00:23:09] now and and we're talking about 2025, right? so basically on the right is all the pre the non-reasoning models. you know, i put the gpt 3. 5 in there. and these are this is artificial analysis.
[00:23:21] so, take these with a grain of salt. these are all just what are called benchmarks if you're not familiar with this. the benchmarks are are kind of like an iq test for uh llms, right? and you can see that the that they're, you
[00:23:33] know, they're not perfect, but they're pretty good indicative. they're pretty indicative of like the quality of the model. um, and so you'll see here that, you know, the the non-reasoning models hit a limit, and over on the left is all
[00:23:44] the reasoning models, and it's just kind of going up. and i'm showing just the openai ones because, you know, you can kind of see the over time. but there's other models from the other providers. so there's gpt5, grock, which is the,
[00:23:55] you know, the twitter guys, uh, model, and then claude 4. 5 and gemini 2. 5. uh, and you, and once again, i kept the 40 and 35 in there just for context.
[00:24:06] and so the other big benefit though of these reasoning models is they're actually making them smaller. now the the labs don't necessarily tell us how big these models are, but we can tell that they're that they're smaller because they're faster and they're
[00:24:17] cheaper, right? those are the two things that the the the so when you you train a model and then you run the model or in what's called inference of the model. inference is the actual act of chatting
[00:24:28] with it. and one of the big downplays on llms is that when you're chatting with these things, they don't actually learn right right then. you have to actually collect the data and then retrain uh later. so they are collecting the data,
[00:24:38] they are retraining. so, make sure you know who what models you're using and what the agreements are with that. so, you you know, make sure you're aware of that. um, some some companies are better at uh disclosing what they do and some
[00:24:49] are worse. uh, but you can see here that the prices are just getting way cheaper. so, gpt4 here, this is just the most expensive one. this is the old model and the reason why it was so expensive is because it was more expensive for them
[00:25:00] to run, right? they want to make these things as cheap as possible because they're in competition with each other. and gpt5, right? this is a really good model. you can see here that the it's just way cheaper. now, you're going to
[00:25:11] pay a little bit more than what this says because there's the reasoning tokens as well. so, you know, as it, you know, when it's doing that step where it's explaining the math to itself to then give you the answer, those are
[00:25:22] called reasoning tokens. those are priced i think just the same as regular tokens. but you can see that the prices are getting better and the speed is getting better. right? once again, o you know gpt4 compared to gpt5, right? the
[00:25:34] speed is just completely uh different. and that once again, it's just because the models are smaller and the fact that they're smaller and don't lose any smarts, if not gain smarts, that to me
[00:25:44] is the the the major light bulb as to why 2025 here has been a a really successful year as far as getting getting better around these tools. and then this is kind of what they call the
[00:25:55] paro um frontier of like what the best models are from a price perspective. and these guys are just jumping each other all the time, right? anthropic is uh they're kind of like the artisans of of the llm
[00:26:06] world. you know, people people pay a little bit more for them. uh and maybe their models don't necessarily get represented by the intelligence as well as how they perform in the field. um and they always just charge a little bit
[00:26:17] more. uh gemini, which is the the google model, and openai's models, they kind of just leaprog each other. so, we're expecting gemini 3 to come out and it'll be, you know, up here uh in the next
[00:26:28] couple weeks. so that's kind of just some background of like where we are from a pre-training and post-training and and it's just critical to make sure everybody understands that stuff at least at a
[00:26:39] high level to understand that there's this thing called reasoning models and the reasoning models are good at what's called tool use and and if you and i know that this is a fact they weren't good at it two or three years ago
[00:26:49] because i've been i've been trying this stuff myself. um, and i've been excited about the idea of tool use since the beginning when chat gpd came out because this paper was was pretty early in llm

## Knowledge graphs meet language models

[00:26:59] days. and it's basically talking about knowledge graphs, which is what my company has, and large language models and how they complement each other. and you can see it right here in the pros and cons, right? where, you know,
[00:27:10] knowledge graphs are great. like you, a knowledge graph, if you're not familiar, is the idea that you have these nodes and they're connected to each other through relationships. so in our system we have diseases and drugs and genes and biomarkers and trials and therapies and
[00:27:22] eligibility criteria that tie them all together with complex boolean logic. right? that's our knowledge graph. and i can actually run a what's we call an algorithm we call match where we say go ahead and take a patient the patient's
[00:27:33] the query match them to trials or therapies. and that bas that algorithm basically takes the patient makes a little mini uh graph graphs that onto
[00:27:44] the larger graph and then does a a re uh quotequote reasoning in the old school way of you know walking through the graph and then generating results.
[00:27:54] awesome. like it works perfectly. it's white box. i can tell you exactly why i matched what i matched. um the challenge is it's expensive honestly. right. we have a team of of of folks that are with phds like reading the clinical trials,
[00:28:05] reading the fda, reading the nccn esmo guidelines, too. we do all the european guidelines. we're reading all those guidelines and codifying them in our knowledge graph. it's awesome. i can tell you exactly why and i can highlight
[00:28:16] even the sentence in a trial, for instance, why you match this trial or you don't match to this trial. the problem is it's expensive and it's not complete. like there's a long tale of
[00:28:26] lab results and you know other con conditions and coorbidities that i don't have time to curate like our team can't do everything. uh so what we have to do is we have to do the 20 % that matters
[00:28:37] right and so by curating that 20 % we're able to do a you know a really good job of making great reports and helping people with trials. the problem is there's a gap and that last gap and that gap you know you see it with the
[00:28:48] self-driving cars going from 80 % to 90 % is kind of easy. then you go every percentage point above that is re basically gets twice as hard and then
[00:28:59] eventually you get to the point where you're like trying to add 0. 1 % uh reliability and you're doubling the costs. so you know that's just from a human effort. same thing on the large
[00:29:09] language model side but the large language model side is i i get the benefit of these large labs pouring billions of dollars into making these models and the large language models have capabilities my graph doesn't
[00:29:20] right. it has this general knowledge and has language processing where in my language processing world i'm you know i'm using old school bert models and i'm doing reax and all this other ugly stuff that is hard to maintain a large
[00:29:31] language model will you know basically do that stuff uh easily very easily at this point but the problem is it's it can hallucinate it it is a black box we don't know exactly how it works but if
[00:29:43] we can make those two things work together that to me is the goal right the goal is let's use large language models as intent processors as language processors. you know, the thing from
[00:29:53] star trek, right, where you say, " hey, computer, go do the thing. " the computer's just interpreting what the question is and then bundling that into a a structured query and then exercising these these downstream tools. so, that's
[00:30:05] the goal. that's what i've always been excited about. and so, tool usage looks something like this, right? i got, you know, a user asks a question about the temperature in new york. uh, even vaguely, you know, do i need a jacket?
[00:30:16] and now it turns that into a get temperature call because it knows get temperature is one of its tools and it can chain together multiple calls or it can even chain together you know you know a workflow of calls right where
[00:30:26] it's getting a temperature at a location from a hotel name. so like th that's tool that's what i mean by tool calling. and now one thing to be aware of is the large language models don't actually
[00:30:36] know how to call tools. it's not how it actually works. what what they know how to do instead is generate structured outputs. and usually it's json, right? it's a format with curly brackets and quotes and stuff and they've been
[00:30:48] they've read bajillion lines of json. so they know what json is and they can generate json. so what you do is you say i have a set of tools. here's their
[00:30:59] names. here are their arguments. go ahead and you know if you want to call one of these tools just generate the json and then then the the controller right the thing that's actually calling the llm can parse that json out and then
[00:31:11] turn that into a tool call get the result and then stick it back into the into the chatbot and that was actually a pattern called react back in you know two or three years ago and so tool calling has been around since the
[00:31:21] beginning it's the problem is they weren't good at it they just weren't good at it because they just weren't smart enough to to recognize how to call those tools or generate that json and i know they weren't good at it because i've been trying. so, chatgpt plugins
[00:31:33] came out in march 2023. i built a plugin for our precision oncology platform back in the day trying to get the thing to call the right stuff to make, you know, matched trials or do therapies or even
[00:31:44] variant analysis and it was just super hard. uh i tried i tried lots of different things. the other big problem with htp plugins was that the technology was flaky. there was, you know, not a
[00:31:54] lot of support from openai and they actually ended up canceling that thing. uh there were function calling which is what i described earlier which is basically generating json and one of the key outputs of that or you know outcomes
[00:32:06] of that was actually people figured out that they could use that to generate structured outputs uh and i actually have a a github awesome list that you know is still valid i guess but not as
[00:32:17] interesting that you can actually you know do this with basically all the models and all the there's a bunch of libraries that do this for you. so you can, you know, give it some unstructured text and it'll spit out some json and
[00:32:28] like, you know, one of my favorite libraries is called instructor. you just define a model in a language called py uh in a library called pyantic. you call instructor and it gives you back a json
[00:32:38] uh output that gets turned into a python object for you. so function calling's cool. it it it kind of sort of worked, right? especially with gbt4, it just was expensive and slow. um,
[00:32:50] but then having it figure out how to then chain multiple tool calls together was still difficult. there was an another initiative called gpt, custom gpts. openai is really bad at naming
[00:33:00] things. i i i have trouble keeping track of it all, but custom gpts is this idea that you can uh create a gpt, give it a name, uh give it a, you know, custom instructions, maybe some pdfs, and then
[00:33:12] you can tie it to what are called actions, which actions are basically, you know, the, you know, model context protocol v0ero effectively. it's a it was a wrapper around the open api spec
[00:33:22] and you could actually have it call actions and i had it working like i could do a demo where it would call my precision oncology platform and bring bring back trial recommendations. once again it was you had to like coach it

## Model Context Protocol

[00:33:33] though through the process and a normal person uh probably just wouldn't have the patience to actually do that. but then model context protocol comes out in november 2024 and i'll be honest i saw
[00:33:44] it and i was like yeah that's great. it's open. it's an open standard. anthropic is not making it so you have to use anthropic to to use model context protocol. so i was like that's good. that's a big win. but it hadn't really
[00:33:55] dawned on me yet that both claude sonnet with 3. 5 which had just kind of come out and the 01 tool calling would actually make this better. like it just didn't
[00:34:06] click to for me. um, and so what ended up happening is like a month or so later, people were like getting really excited about model context protocol on twitter and i was like, " okay, maybe i
[00:34:16] should look at it again. " and then i had a colleague ask me about it and i was like, " okay, if this guy's knows about model context protocol, maybe i should really think about this. " and so i dove in and i said, " okay, let me let me think about it. " and at the time i was
[00:34:29] considering building an mcp around GenomOncology's stuff, but but honestly, we're so early. um not everyone's ready for this this type of work yet. so i thought wouldn't it be more interesting
[00:34:40] to do something kind of open source and let people play with it and understand and learn what's going on here and why this is actually exciting. and so that's what you know the brainchild was called BioMCP. uh so BioMCP is what's called an
[00:34:52] mcp server and it calls backend servers right and actually BioMCP is really kind of the collection of all these things right and in this case it's actually all
[00:35:03] of them are not local all of them are all remote so BioMCP is basically a collection of remote servers clinical trials. gov fda, pubmed. i'll talk about i'll talk about all the specific servers
[00:35:14] in a moment. but basically what happens is you create a server and the server represents the data uh behind it. and the server has tools and that's what you know model context protocol has more
[00:35:25] things than tools, resources and prompts. honestly, nobody uses anything else like they just use the tools. and i actually just saw a conversation about this on twitter yesterday which is yeah tools work. nobody wants to do anything
[00:35:36] else. none of the clients support anything else. it's really all about tools. so that's fine. i i actually think the rest of the protocol is interesting. it's just not being represented by what are called the
[00:35:46] clients. so the client in this case is the chatbot. so you're you know you're using or an agent and i'll get into what an agent is later. uh but a chatbot has
[00:35:56] model context protocol and you know all these different servers that can it can connect to and you can actually in your chatbot you can connect to a bunch of different mcp servers. if you go to this mcp, there's a bunch of like mcp
[00:36:08] directories. i've seen at least 5, 000 of these mcps, so they're out there. now, just be aware if you're running this thing locally and you've got an mcp server you don't trust, don't do that.
[00:36:20] like, you need to fully trust that mcp server. so, i'm here talking to you. hopefully, you can you can write to me and hopefully you trust me. you can look at the code. uh the code is what's up on pippi, which is the way we distribute
[00:36:31] the code. um you know and we're just basically uh proxying data to these backend servers. if you don't trust any of those backend servers like clinical trials. gov etc. don't use bcp either.
[00:36:42] the reason is those things are sending back content in these large language models can get tricked. it's called prompt injection and i can get into what prompt injection is if you're
[00:36:53] interested. but the idea is the large language model can be used to then exfiltrate information where it can you know especially if you're giving it access to your local server like you know your local computer like cloud code
[00:37:04] it can actually look for tokens or you know api tokens or whatever and send them up to uh remote servers. so, it is it is a security risk. uh, and that's another big reason why i'm we're going
[00:37:16] to be we're investing time right now into building local uh tools, local mcps and and command line tools for llms. can you guys can hear me? okay. still,
[00:37:27] i'm just taking a a quick break. yep. great. um, anybody completely lost? happy to like take a take a beat and
[00:37:37] like answer any pressing questions. all right. so, more slides. we will have plenty of time at the end for questions. i'll i'll i'll answer all the questions i can and i'll stay late if you guys
[00:37:48] need me to. um, okay. ai research assistant, ai research agent. i just wanted to define these two terms real quick. these are my terms. there's a lot
[00:37:58] of different terms out there. you know, people people will call agents lots of things. it's it's kind of kind of crazy how many different definitions of agents i've seen. but in my terms, ian's terms,
[00:38:09] assistant means it's a synchronous thing. you're talking to a chatbot effectively, right? it can invoke tools. uh, usually asking for explicit permission, right? cloud desktop will always ask me, no matter how many times
[00:38:20] i say always allow, it's just going to keep asking me, do can i use BioMCP? that's fine. um, but it's basically one single conversation and it's back and forth. where an agent is more asynchronous,
[00:38:32] meaning you give it a goal and it goes off and does the does a thing, right? it might take a minute. it might take 30 minutes. it may take 30 days. it's not not 30 days yet, but i'll talk more about what i mean about that in a in a
[00:38:44] moment. um, but they manage the context and state over long running tasks and they're using reasoning to kind of to do stuff. so, those are my definitions. so,

## What BioMCP is

[00:38:54] an assistant and an agent can be given BioMCP. you know, they're basically a set of tools. and what BioMCP is is it's a library, a python library that has a
[00:39:05] bunch of python functions that have been decorated with a tool decoration is what it's called, but it basically says, hey, this is a BioMCP tool. expose it as a
[00:39:15] public interface. and that tool has a description and it has arguments, meaning like here's what it expects, like here's the input uh fields i expect and then here and then hopefully the
[00:39:26] description tells you why you'd want to call it. and that is then used dynamically by the assistant or the agent to do the right calls. right now, it's different than writing programs.
[00:39:37] when you're writing programs, you're just saying, " i got these functions. i'm going to call these functions in this order and get the answers back. " well, that's not an agent or an assistant. that's just programming. BioMCP is meant
[00:39:47] to be dynamic in that you're going to ask it a a question or give it some data or whatever it is and then it's going to figure out through an iterative looping process what calls to make and then by
[00:39:59] reading those results make more calls. right? that's the that's the whole beauty of this whole llm based uh way of programming and it's kind of a mind bender if you're not used to it. but so
[00:40:10] bmcp is really, you know, a pro what i call a proxy to backend systems and there's way more now. these were the first three i did and now annab's on the team and she's knocking out uh new apis
[00:40:20] all the time. if you have apis you that you know that exists, uh send them to us on github and we'll we'll put those in as as well. we we'll take code contributions, but we're honestly going to be very selective about that because
[00:40:31] of the security issues that i'm concerned about. um so, you know, we got clinical trials uh. gov, right? right. and i'll i'm going to do a deep dive into clinical trials. gov. my variant
[00:40:41] info was the first api that we did for genomic variants, but we got more now. there's c bio portal. there's ankle kb. uh, and there's more. uh, my variant info actually has like 20 or 30 databases embedded in it, right? db and
[00:40:54] sfp, which actually is another 20 or so databases inside of it. cad and clinvar. it has an old version of cosmic. uh, a bunch of stuff like that. and then there's research articles like uh we use
[00:41:05] a service called pubator, which i'll talk about. and there's 35 tools, maybe 40 tools. i actually don't even know what the number is. i need i need an updated number from annabye. but, you know, these tools are all made available
[00:41:17] to the llm as part of the mcp server. part of what you need to do is you actually need to turn on and off tools based on how you want to use them to be honest because they take a lot of context. the context meaning context is
[00:41:30] the working memory of the lm. it's the number of tokens that it understands. claude, for instance, is a 200, 000 token window, i think. and i think even that probably gets bumped down to 175, 000
[00:41:40] based on the system prompt. so then you're that's your that's your ram basically, right? in the old school programming days when you'd actually care about ram, uh that's how much ram you have. and now your context window is
[00:41:53] going to get not polluted, but it's going to get uh absorbed by the the functions and their arguments and their description. the bigger those are, the more there are, the more context you're
[00:42:03] kind of you're squeezing out. and that becomes important especially if you're trying to do a long conversation where where you ask multiple things that you're going to get that warning at you're gonna get that error basically at the end that i i always regret which is
[00:42:15] i'm i've ran out of space. go ahead and start a new chat. it's like ah i i just started to get to the thing that i cared about. so just be aware. so you turn on and off tools. you can do that in claw
[00:42:25] desktop. i'll show you that in a moment. so claude desktop it's uh you just download the app. it's, you know, i think i think there's still cloud free version, but you don't get very much
[00:42:36] usage if you have a free free account. if you have the $ 20 a month account, i'm pretty sure you can use claw desktop and you can turn on BioMCP. you can turn it on locally using the BioMCP uh program
[00:42:48] from github. uh there's steps on how to do that. and then there's our remote server as well. and so let's go through a quick example and what why this is powerful and why this is useful, right?

## Demos: trials, literature, variants

[00:42:59] and the first is clinical trials. gov rest api. so, if you've ever been to clinical trials. gov, i have quite a bit, um, you'll know that they their their website, their search engine, their
[00:43:10] content is immense, right? and the website's way better than it was 5 years ago. uh, it's it's a really good search engine. uh, as far as search engine goes from a power perspective, right? they
[00:43:20] have so many fields. if you look at the api, you'll see how many fields there are. uh, they have the not only do they have all these fields, but then they have these expression syntaxes, right? where you can do complex kind of boolean
[00:43:31] queries. you can do things like latitude and longitude stuff. they have enumes like these um you know these flag based values and that's this is just the four first four fields. there's probably you
[00:43:43] know 10 pages of this stuff. um, and basically what i did was me and i think it was chat gpt at the time, uh, we worked through this whole thing and figured out what was the critical stuff
[00:43:53] that we wanted to expose and then how did we want to shape a query so that we could do this in a simpler way so that the lm didn't get overwhelmed, right? i could have certainly just given the llm
[00:44:03] this full rest api, but man, that would have consumed a lot of um, that could have consumed a lot of context and it might have confused the llm to actually know what to do. so that was part of what bomcp is about. it's about curating
[00:44:15] these tools so that they're effective and useful and that they don't spit back so much context that the llm gets overwhelmed and you can't even uh use it for any uh reasonable tasks. so there's
[00:44:26] the rest api. there's a picture. i actually drew it in powerpoint or google google slides a few months ago. uh find active pero trials like i was making a little demo slides and then i said, " oh,
[00:44:39] actually let me just copy and paste this thing rather than typing it and paste it right in the thing. " and and go ahead and see if it'll actually respond. and at the time that was really cool because images weren't really a thing yet. and i
[00:44:51] was like, wow, it actually parsed the picture and then turned it into this query. so, let's look at the query active. active is a keyword and it gets translated by the llm. i don't i don't
[00:45:03] have a mapping, right? there's no python dictionary or anything that says active means open. it figured out that oh yeah, this means open and pembro is pembroluzamab and kitruda and oh yeah there's a there's an experimental name.
[00:45:14] i didn't know that experimental name and it's not certainly in a database that i'm exposing this thing to. uh we do have um as a database commercial uh and that's part of you know some of the tools we built for agents. um so
[00:45:26] interventions right it mapped pembro to this and then it mapped conditions nclc to non small cell lung carcinoma and then also threw in the acronym as well and then latin long right it figured out
[00:45:37] cleveland ohio you know good enough let's you know pick a pick a point and we'll do 100 miles by default and so then it comes back and it brings back you know it posts that query and then BioMCP is what responds back with as
[00:45:50] tight of possible text right i tried to do a little bit of like indenting and stuff so it you know is it can understand the structure of the output but i tried to do it in such a minimal
[00:46:00] way that i'm not consuming tokens recklessly where i'm you know basically consuming everything and then the other trick i had to do was actually for clinical trials because they are so big and there's so much content i split it
[00:46:11] up into multiple queries so there's a searcher which basically returns back you know search results like you were you know searching for trials and you got back a page of 10 or 50 or whatever the number is uh here's the search
[00:46:22] results and then you can deep dive right. oh, let me go ahead and deep dive on the locations based on the nct ids that i'm seeing from uh the search and then it can look
[00:46:33] through the locations and and and get the answers out from there. there's other optimizations we could do to bmc, right? if you were to build if i were to build something that was like more production ready that i had a narrow focus on, i would then make the tool
[00:46:46] filter for me, right? i would basically say, " oh, yeah, go ahead and don't show me this thing in alabama. i know that i want the i want only things in ohio, right? so these are like little optimizations i know we could add and
[00:46:57] maybe we'll add that one. that's a pretty simple one. but you know over time um what you want to do is you just want to minimize the amount of information that comes back but minimize
[00:47:08] the number of tokens but you also need to have the other tension here is we can't have too many functions, right? because then if we have too many functions then the llm gets confused on what to do. and i'm kind of explaining
[00:47:18] this to you guys because the strategy by which i'm built i built BioMCP. you might be wanting to build your own set of tools for llms, right? and that's part of what we do as well. so if you're, you
[00:47:28] know, interested, i can certainly help there. um, and then it comes back with a report. and so the report is like, hey, here's here's the active trials. i didn't tell it how to make this report. it came up with it. it read the data and
[00:47:39] it decided this was a good report. now, i could say, oh, well, give me a table or show me something else. and that's the great thing about large language models that they're kind of infinitely adaptable in context of a of a chat
[00:47:50] experience. and then so that's clinical trials. that's just one of the tools. the other uh key tool is uh pubmed articles. and for pubmed, i'm a big fan
[00:48:00] of this one researcher. he's done a lot of great work um at the ncbi or nih. and one of his projects is called pubtater. and pubater is basically a semantic
[00:48:14] search engine for pubmed. what does that mean? means they've taken all the abstracts from pubmed. i even the full text articles from the pmc, the free versions, right? the pubmed central uh
[00:48:25] versions of the documents. they've taken all that text and they've done named entity recognition on four entity types, genes, uh drugs, diseases, variants. and
[00:48:36] so they've highlighted all those. so all these like little boxes here, these all tie to one of those four entity types. and when you do a a search in this tool, you'll notice that it actually does an
[00:48:47] autocomplete and it then turns it into like an entity based uh query. so this little at symbol chemical is the is the label and it's now doing an entity based
[00:48:57] search and it just improves the relevancy of the search. so i like that so much that i actually baked it right into BioMCP. so BioMCP behind the scenes you don't do this uh behind the scenes
[00:49:08] uh you ask a question uh the BioMCP actually does have four buckets it has a bucket for uh genes drugs varants whatever uh and a keyword one so if if
[00:49:19] one of your keywords doesn't fit in the four buckets it puts it in keywords and then what i do is i take those four buckets and quickly par in parallel i think you know call the the entity uh
[00:49:30] resolver from pubater get the four entities back and then i use those in the search to pub to pupater and it just dramatically makes the the search engine better. it just brings the the higher
[00:49:41] relevant stuff to the front. uh because you really want it to be in those top 10 or 20 results. otherwise, you're going to get, you know, you know, a long tale of garbage. and in pubmed's paper, they'll even say, " hey, this thing's
[00:49:52] like uh 90 % precision. " and precision in this case means like how many of the top 10 things showed up in the top 10. uh and it's just better than pubmed itself and and google scholar.
[00:50:04] so, those are, you know, some of the original ones and my variant info is out there as well. uh, but we added uh anko kb this week. uh, thanks to annab. uh, you can see here that it's and it was
[00:50:14] excited. claude was super excited that it was added because i i actually was trying to get it to work on my computer and i said, " try again. try again. try again. " and then it worked. i was like, " oh, okay. " because you have to hook up the right things inside of the inside of
[00:50:25] the json. and it finally was working and it was super exciting. um, and so this only works for three genes. uh bfe, uh tp53, and ros one i think are the three
[00:50:35] demo genes. um the rest of the genes you need an kb license. i'm sure you guys have a an kb license. i don't because we're a competitor. um and then there's oh g
[00:50:51] is another collection of tools. so we're adding we're basically uh mimicking those tools. um i don't know how we'll give them credit because we're not i don't think we're using gget in our code. um, but we're we're we're replicating some of their their tools
[00:51:02] that they have. and there's, you know, uh, and then there's another paper called gene agent that has like another 15 tools uh, that i want to replicate. and so, we're just going to keep adding more and more tools to it. uh, once
[00:51:13] again, because i don't think this is about curation. i'm not trying to curate the perfect 10 tools. i'm trying to just basically show, you know, here's 50 tools or 100 tools, whatever we can get in there. it'd be great. and then people
[00:51:24] can use what they want, right? choose the tools you care about inside of claude or choose the tools you care about inside of your agent, do win your hackathon, uh prototype something, proof of concept, and then you then take that
[00:51:35] information and say, " okay, great. let's do this for real. " and to do it for real, we'll either host something behind our firewall, which is what we're working on, or you can just, you know, uh copy paste from bmcp and choose just
[00:51:47] the the parts you care about, um because it's all open source. so, let's do a quick demo. so, let's see. uh just because i don't want to fail, i'm going to show you real
[00:51:58] quick. um you know something that h right now there's a there's these things called instructions which aren't working in cloud desktop and i don't know why but you know what does bomcp uh say that
[00:52:09] uncle kb says about bref600 and i can see here that it you know this is what i was doing yesterday right and it kind of brings the results back. so what's happening first? you can see that it
[00:52:20] does a search, right? in this case, it's doing a search uh and it's bringing back search information. and then i'm doing a get and it's bringing back more detailed information. you can see all these different codes, right? like all these
[00:52:31] codes are from um sorry, i'll make my screen a little bigger just because my eyes aren't that good. um yes. oh yeah, i just did that. is it better now? can you guys see? okay. um
[00:52:44] yeah, it looks good. all right, great. um, so you can see here, let's see, it's actually figured out. okay, here's the variant id. so that's the variant id for my variant info is the the proper g dot
[00:52:54] or i guess that's maybe not the proper g dot, but it's close enough. um, and you can see that it brings back cad, right? brings back uh all these different fields from cad. uh, another database
[00:53:08] that i'm not familiar with, another one i'm not familiar with. but once again, these are all up on uh my variant info and you can look up where these sources are from um and what the information is,
[00:53:18] right? so there's, you know, position information, there's prediction information, there's frequency information, you know, all the typical stuff. um different scores, etc. and polyfen. oh yeah, here's a here's, you
[00:53:29] know, here's a prediction, right? deliterius. obviously, we know this a famous gene, so everyone same famous variant, so everyone knows what this stuff's about, right? but you can see down here uh
[00:53:40] sifting through it. i could i couldn't find it, right? i don't see anything about uncle kb. and this is where i'm in the background like now, you know, you know, fixing my uh it was actually i think the the root cause was i didn't
[00:53:51] install the latest version of BioMCP. i had to like i had to like clear it out and then reinstall it. um and then and and oh, here's a funny thing.
[00:54:02] i asked it for uncle kb stuff and it says i can't find anything about uncle kb, but let me go do a web search, right? because i had the web search turned on. so, it's going off and doing the web search. so, these are things that these chat bots will do uh that you
[00:54:14] might not expect, right? so, you have to know if you want to just be using BioMCP and you just want to be using my variant info, you have to turn off the web searcher or else it'll go rogue and and start searching stuff. uh hopefully i
[00:54:25] don't swear at it after this. um can you try again? right, this is me just trying again and once again i think it failed again. okay, try one more time. i just updated the server and now it gets super excited. right, so that was funny to me.
[00:54:36] um, and you can see down here that, you know, somewhere is the anko kb stuff. i'm not going to make you all look through it, but you can tell then it goes through and gives you the results of an kb. um, and you know, other
[00:54:47] information. let's see. i now i typed this in before i left. let's see. uh, okay. now, it's going to look for tp53 variant searcher. great.
[00:54:57] uh, variant getter. okay, it found stuff. so, it found ankob classifications for tp53 and it found a ros one, right? right. so, those are the three demo genes. so,
[00:55:07] and uh we're working through with one of the developers at memorial sloan kettering how to make sure that the the tokens work. he couldn't get the tokens to work last night. so, hopefully today we're going to try to figure it out
[00:55:18] together uh what the issues are. so, so that's kind of like how you use it in in cloud code. um if i had the oh, wait.
[00:55:29] there's so one of the big things i want to show is this idea of like a deep research thing and so i got a half an hour left and only a few more slides.

## The biomedical research assistant

[00:55:40] um, but there's a there's resources here and one of the resources i've created is a is a research assistant and this is basically a prompt and i'm actually working on a system uh that i'll be open
[00:55:52] sourcing in a couple weeks that does this more um more deliberately and you'll see what and you'll i'm excited to show it to people and i'll i'll send
[00:56:02] it to the team of folks i'm i'm emailing with when i when it's done. but the basic gist is this unlocked a lot of of of capabilities that i wasn't didn't really impact me until i played with
[00:56:14] this in april, i believe, uh, and made this work. and basically what the the biomedical research assistant does is it's really a giant prompt that says, " here's all the tools. use this thing
[00:56:26] called sequential thinking, which is another mcp that we actually just baked right into BioMCP. " and what it does is it forces the llm to think through and use a thinking process, step-by - step
[00:56:38] process. and you'll see when it's using BioMCP that it actually might say, " oh, i'm going to do i'm going to think for five steps or i'm going to think for 10 steps or think for 20 steps. " and as long as you don't run out of context, it's going to keep it'll keep doing the
[00:56:48] steps. it's basically a noop that doesn't really do much other than say, you know, keeps track of how many steps you've done. and and then what this deep research prompt does is it kind of shows
[00:56:59] you what's possible, the art of the possible with regards to, you know, a prompt based program here. and what i what i'm doing is saying, hey, first take the user's question and then first
[00:57:09] come up with a framework, right? figure out what's the right way to answer this person's question. and then it does that by saying, okay, yeah, if it's a therapeutic question, use pico, right? what have you? and then here's the
[00:57:21] different tools. and then it says go ahead and do a broad web search and then do focus searches right and then it's asking and it's basically trying to bring back relevant information and then it synthesizes it and then you know
[00:57:32] self-critique right once again these large language models are better if you ask it to like critique itself like just you know point out what's wrong and then fix it and then make a and then make a
[00:57:43] brief right and here's the the rules around the brief if you were to go to um yeah, i have i i have another BioMCP
[00:57:53] examples website uh github repo and i've only done one example. uh i probably should do more, but this example i'm saying what are the emerging treatment strategies for head and neck cancer and
[00:58:04] so at the time uh when i first did this uh chat gpt had already come up with deep research. gemini had actually beaten them and had a deep research first and then there was an ai thing
[00:58:15] called manis and then claude had just come out with their deep research. and so i was really into like this idea of deep research. and the deep research is basically it's going off searching a bunch of stuff and then synthesizing it
[00:58:25] and analyzing it. and so i said, well, what if i could, you know, how do i make it to compare BioMCP using my prompt? how does it compare to these other four things? and and basically i use that
[00:58:37] information to then eval. so i got the prompt after like 25 iterations of this thing. and i was like, it keeps getting better, so i'm going to keep iterating. um it finally
[00:58:48] came up with you know and said oh yeah this this version you know BioMCP plus sequential thinking plus web search gives us this output and you can see
[00:58:58] here that it's basically a very robust you know whether it meets your needs you know uh tbd but you can always change the prompt um and it just goes through and and synthesizes a great report and
[00:59:09] hopefully i'm not going to lie and i think that there's um you know there's charts and all this tables and stuff and then there's references, right? forcing uh claw to get it to print out the
[00:59:20] references was the hardest part actually. um but they're all references in here. and obviously what you want to then do is give it another agent or or actually a pure python program or whatever language you like and have it parse out these references because they
[00:59:32] will hallucinate references, right? even though they're doing web search, even though they have a url and they're bringing back content from the url. um, and i should have forced it to put the url in here if i could. but another
[00:59:44] thing you could do is use that, you know, uh, doi or whatever these are called and search for them and make sure that the title matches and the authors match and that it's actually a valid thing. uh, that's just another great way
[00:59:55] of like getting getting some corrections around this stuff. and then once again, that's not this isn't a finished product, right? what you want to do is you use this as a researcher to save you time, right? save you five hours of
[01:00:06] googling or 10 hours of googling and now it's a a much better launching point for for whatever research question you have. so, okay. so, and then oh lastly, um

## Coding agents and what comes next

[01:00:20] BioMCP also, so here's my so this is like the predecessor to my whole cloud code thing that i'm going to talk about in a moment. i actually have this is actually codeex which is the opening
[01:00:31] product on the left and on the right is a demo slide. well, once again, demo, sorry, demo markdown that i asked uh codeex to make for me. i said, " hey, i'm
[01:00:41] doing a demo uh today about BioMCP. can you go ahead and make a demo? " right? and i and i told it, make sure that all the clis work right in the command line
[01:00:51] tool, generate the output, and then make a markdown file for me. uh and and and so i can show people how it works, right? and i can give you guys this demo file if it's interesting. um, but basically it, you know, walks you
[01:01:03] through like how to do help, right? and then it walks you through like how to do health check. oh, so there's a health check part, right? if you're using BioMCP and something's not working, uh,
[01:01:13] it can give you back, uh, an error mode, right? so, hey, hey, annab, i don't know what's going on with clinical trials. gov, but i'm getting 403s here in the health mode. maybe maybe check that out. um, and then you can see, but here
[01:01:24] it actually works. so, there's something goofy with the health check, probably. um, so you can go, you know, do a clinical trials. gov gov query and in this case it shows BioMCP command line tool trial search condition melanoma
[01:01:38] status open page size 5 and you can see that it gives you back results and i asked the snippet so it wasn't too long so you can see it here so the point is there's actually three modes for using BioMCP you can go look at the code and
[01:01:49] use the python library so we tried to design it in such a way that the python library itself is pretty useful so you can now import bmcp and then use the trial fetcher or the variant searcher
[01:01:59] whatever they're and then there's the command line interface. and i honestly built the command line interface for one reason only to make automated testing easier,
[01:02:09] right? i didn't want to try to figure out how to do automated testing against um mcp tools. i was worried that that was going to be hard. so i said, " oh, i'll just make a cli as well, thankfully i did because it's quickly turning out
[01:02:21] that cli might actually be the new mcp where people are very excited about command line interfaces because the these large language model um things know how to use clis really well as you
[01:02:33] can see i made this demo in a few minutes um and then here's some more right get a specific trial in this case it's actually specifying the format of json right so naturally but you know uh
[01:02:44] the default output not natural the default output is markdown but you there's a flag in here for json if you want to get json format. uh, and then there's searching across pubmed, right? and then once again, i'm it's asking for
[01:02:55] json and you can see the different fields. um, getting getting articles from BioMCP, you get the full article, uh, variance by rsid. so, searching of
[01:03:06] variance, searching for variants, retrieving variants, fda adverse effects, right? so, the fair's database is in here. uh, you can search them for pembro and it gives you back uh, the results there. so this is once again
[01:03:18] just another way of interacting with BioMCP and and then the last way is really using these agents right like i can actually build um you know whether you use lang chain or langraph or
[01:03:29] pyantic ai or one of these you know one of the ai type safe uh sorry typescript ai platforms or use my platform which is going to come out in a couple weeks you'll be able to build agents and give
[01:03:40] it BioMCP and you can tell it to use BioMCP as an mcp server quote unquote or you can give it to as a cli i and you just say here's the cli and then claude code actually now has a new thing called
[01:03:51] skills and you can create a skills uh file. oh and this would be fun to build a skills thing for BioMCP. so you can say hey let's go ahead and um add a BioMCP skill and you can then use BioMCP
[01:04:02] to do all these different things whether it's you know investigate for trials or what have you. so uh hopefully that's enough of a demo for you guys. um, but i'm happy to come back to to to to more
[01:04:13] demo mode later. and just to wrap up my slides, i got a few more slides. uh, so coding agents are a thing. and the reason why is because all these
[01:04:23] labs have really put a lot of time into improving coding skills. and the thing that's really interesting to me is what you know, once again, these indices are are are kind of whatever. um, but claude
[01:04:34] 3. 5 sonnet was really the first model that everyone was freaking out about their coding skills. and that's when cursor became a big deal. everyone was like cursor is so great. well, not really. claude 3. 5 sonnet was so great.
[01:04:45] like that was really the trigger point for for why coding became a thing. uh and then the models are just getting better and better. like all these companies are now heavily investing. uh even the there's a free version uh from
[01:04:57] xai uh that you can use with an open - source um cli called open code uh which is really nice little uh cli tool. so, if you want to try ajetic coding for real and you have permission to do it
[01:05:08] and or your personal computer, like i'm not trying to tell people at st. jude what to do. um, you can install open code and use grock 4, i think is what it's called, or grock coding fast. it's
[01:05:19] a free version from a from a a platform called open router. uh, and you can go burn some some of elon's tokens for him. uh, they will train on your data though, so just be fully aware of that. uh, and
[01:05:30] then there's a deep seek model, which is one of the open source ones. and then i just signed up for this glm company from zai. i'm watching them. like i hadn't heard much about that, but their library, their models are are really
[01:05:41] good and they have really cheap coding um uh plat uh options out out there as well. so, you know, i'm honestly spending way too much money on these things. i got codeex, i got claude code.
[01:05:52] uh it's super fun. uh there's a platform there's a library called ader which is kind of like the original old og chatbot uh that in the command line and they've been tracking how good these models are
[01:06:04] and you can see that it started at like you know a four 4 % on these 225 most uh difficult coding skills that would it'll cost you 32 cents all the way up to now
[01:06:15] 88 % accurate on getting these 225 most cod uh coding problems done that cost you almost 30 bucks and if you use one of the most expensive models it's like almost $ 150. $ 50 just to solve these 225
[01:06:26] problems. um, and you can also see that this ader project is doing a nice job of keeping track of how much code is being written by ai versus the the person or team that uh creates and maintains the
[01:06:36] ader. and then coding, you know, when it started was really like this ghost tag, this ghost coding stuff, right? you go into cursor or, you know, copilot or all
[01:06:47] these different uh wind surf and it would do this ghost to code where you can do autocomplete. this is powered by an llm. the llm is predicting the function you want based on what you've
[01:06:57] seen ahead of time, what the code it's, you know, in context of, and then you hit tab or whatever the key keystroke is for your editor, and it generates the code. that was kind of like, you know,
[01:07:07] uh, you know, state-of - the-art uh llm coding a year ago. and then uh it got got so good that this guy andre caparth who's a really big deal in in the ai
[01:07:18] space. i'm sure you all know who he is. uh invented or or coined the term vibe coding. and now there's a book called vibe coding which i have on my desk here. uh and basically what vibe coding
[01:07:29] is is you know the idea that you're not looking at the code. well that's not really what people are doing that are serious about that. you can vibe code like prototypes, but really what you're doing is you're using the agents to help
[01:07:41] you craft the code. and it's just working at a higher level of abraction. sort of like how we went from, you know, hand coding machine code to using assembly to using c to using python,
[01:07:52] right? like we're now at a new level, which is how do i tell an llm how to create my c or my python? and cloud code came out maybe in march or april. uh i
[01:08:02] didn't use it right right away, but i was intrigued. well, i did use it right away. it cost me like $ 8 to do one thing. and i was i freaked out. i'm like, i i can't be spending this much money. uh but then they offered it for
[01:08:13] for for free with your $ 20 a month account. and then at the end of like an hour or two of using it, i was like, " okay, i'm in. " and so i had to go, you know, get approval to get the full uh max account. um and so but basically it
[01:08:25] can run for 20 or 60 minutes, you know, if you if you structure it right. so, i have this whole uh process, you know, i have like this whole thing where i've got a developer and an architect and, you know, a command line thing and i
[01:08:37] have like this whole sdlc. i wrote it down for myself just just so i could show you guys, but basically, you know, i'm i'm using i have a product owner with claude and we're building up sprints and then i'm giving the sprints
[01:08:47] to my codeex developer and it's running all the code and running all my tests and then i look at the code and i yell at the developers and then i end up throwing away all of it and then starting over and i've done that on one project a couple times now. and that's
[01:08:58] okay. like that's, you know, it's actually a more efficient way of kind of building some of these things than trying to do it all by hand uh where you end up throwing it away anyways, right? i've i've i've had many times where i've
[01:09:09] thrown away projects and started fresh once i've actually learned some stuff. uh yeah, and vibe coding is this book. that's the one on the right. it's pretty good. oh, yeah. vibe engineering is what simon willis, who's one of the bloggers
[01:09:20] that i i read all the time, uh that he that he he's trying to coin, which is the idea of like you're using agentic clis to code, but just more efficiently, but not but you're still looking at the code. all right. and then tomorrow, so
[01:09:32] this will be hopefully real brief. the tool calling has also gotten better, right? coding's gotten better. tool calling's gotten better. that's really what comes into what making an agent is is tool calling. and so and and one of
[01:09:43] the other things we're seeing is that these agents or these, you know, these loms are getting better at staying on task. so this is really the real exponential that i'm interested to see if it continues to play out where every
[01:09:54] seven months they get more and more accurate and they and they stay on task longer and longer. and so, you know, gpt3 was able to do a task for a half a second and it stopped. and then gpt4 was
[01:10:04] able to do it for, you know, maybe a minute or whatever. and now we're up to, you know, 20 25 minutes with 80 % accuracy. that's the future, right? so, it's like, how do you construct these agents to do tasks, right? they don't do
[01:10:17] jobs, they do tasks, right? we we now need more radiologists than we ever have. uh, there was a big freak out 10 years ago about radiologists. well, that didn't pan out. now, we need more. um but we need to figure out how do we use
[01:10:28] these llms put them in a loop with tools and have them have them do uh useful work and uh one of the challenges is going to be context windows. so that's what emerged this phrase called context
[01:10:40] engineering which is really just the idea of like if we're going to have an llm do work how do we design the system in such a way that the context window doesn't become a a limitation and that's
[01:10:52] the other key thing that my little framework that i'm working on uh solves. um, and then there's computer use. so, this is brand new. you know, people are using uh, you know, they're actually
[01:11:02] giving the llm's vision so that they can actually read the whole screen and click the browser and do stuff. it doesn't work at all right now. i assume in a year it will work really well and it'll be super fast and people freak out and
[01:11:14] that's that's just how things are going. um, and then there's this idea of deep agents, which is really just the idea that an agent is an lm in a loop that makes a plan and then does the plan and
[01:11:24] has access to files and reads and writes stuff and then has access to sub aents. sub sub aents are just a strategy for context engineering. you're breaking up a task and you're doing smaller and smaller chunks uh in the sub aent that
[01:11:37] consumes tokens and then return the result. the result is just, you know, the smaller piece of information. and then this is this is kind of the enthropic view view of what an agent is, right? a human asking an llm to go in a
[01:11:49] loop using with an environment using tools, right? they're doing tool calls and then they stop once they make uh stop making tool calls. this is kind of how i'm doing it, right? which is i got a goal. i've got a step checklist and a
[01:12:03] schema. you ask the lm to do the thing. it gets the results back. it rejects the output if it doesn't validate against the schema. and then you stack them. that's what i'm building. this is this is a preview of the uh open source thing
[01:12:14] that i'm building. um and so basically an agypt is really just these steps. um and they work in a sequential manner. it's really a workflow, but that's okay. whatever term people like.
