---
title: "Building GPT Actions with FastAPI and Pydantic"
description: "Ian returns to Talk Python To Me to explain custom GPTs. FastAPI and Pydantic generate the OpenAPI spec that powers a GPT's actions, and most of the work goes into endpoint and field descriptions. The episode also surveys prompt engineering, RAG, and local models as of early 2024."
date: 2024-04-16
category: agents
tags: [gpt-actions, fastapi, pydantic, llm, openai]
event: "Talk Python To Me #456"
eventDate: 2024-04-16
youtubeId: FwmbJiKdAG0
episodeUrl: https://talkpython.fm/episodes/show/456/building-gpt-actions-with-fastapi-and-pydantic
summary: |
  Ian Maurer returns to Talk Python To Me six years after his first appearance. He and Michael Kennedy survey the LLM landscape as of January 2024. Ian explains how he uses ChatGPT 4 for coding: he thinks through edge cases and tests with the chatbot, then shapes the APIs himself. He compares hosted model APIs from OpenAI, Google, and Anthropic, and walks through token pricing with the DocsBot calculator.

  The middle of the conversation covers the building blocks. Ian describes client libraries such as LangChain and Simon Willison's LLM project, and argues for an abstraction layer over model providers. He explains prompt engineering, few-shot prompting, prompt injection, retrieval augmented generation, embeddings, chunking strategies, and vector databases. He also tours local model tools: LM Studio, llama.cpp, and quantized models such as Mistral 7B.

  The last third covers custom GPTs. A custom GPT wraps ChatGPT with a name, custom instructions, uploaded knowledge, and actions. Actions let the model call your API through an OpenAPI spec. Ian built PyPI GPT as a working example. FastAPI and Pydantic generate the spec, and most of the effort goes into endpoint and field descriptions. At GenomOncology he applies the same pattern to a curated genomics knowledge base. The expert stays in the loop and validates the citations.
takeaways:
  - "Custom GPTs wrap ChatGPT with a name, custom instructions, uploaded knowledge, and API actions defined by an OpenAPI spec."
  - "FastAPI and Pydantic generate that OpenAPI spec, and most of the work goes into endpoint descriptions, field descriptions, and constraints."
  - "An abstraction layer over model providers keeps switching cheap when cost or performance changes."
  - "Prompt injection has no known solution. Design consequential actions around the worst case."
  - "Custom instructions and uploaded knowledge are not protected. Anyone can extract them from a published GPT."
  - "Retrieval augmented generation puts retrieved content into the prompt, and chunking and embedding choices decide what comes back."
  - "Ian builds for experts in the loop. The model synthesizes information and the human validates the citations."
chapters:
  - { time: "00:00", label: "Episode Introduction" }
  - { time: "01:39", label: "Catching Up Since 2018" }
  - { time: "03:59", label: "How Ian Uses LLMs" }
  - { time: "09:15", label: "Choosing an LLM API" }
  - { time: "14:25", label: "Client Libraries and Optionality" }
  - { time: "17:40", label: "LangChain and Prompt Injection" }
  - { time: "21:00", label: "Running Models Locally" }
  - { time: "26:15", label: "Prompt Engineering" }
  - { time: "31:42", label: "Retrieval Augmented Generation" }
  - { time: "37:32", label: "Vector Databases" }
  - { time: "39:51", label: "Custom GPTs and Actions" }
  - { time: "48:33", label: "The PyPI GPT Project" }
  - { time: "55:12", label: "GPTs for Precision Oncology" }
  - { time: "1:01:09", label: "Library Recommendations and Wrap Up" }
---

### Episode Introduction

**[00:00]** Do you know what custom GPTs are? They're configurable and shareable chat experiences with the name, logo, custom instructions, conversation starters, access to OpenAI tools, and custom API actions. And you can build them with Python. Ian Maurer has been doing just that and is here to share his experience building them. This is Talk Python To Me, episode 456, recorded January 22nd, 2024.

**[00:26]** Welcome to Talk Python To Me, a weekly podcast on Python. This is your host, Michael Kennedy. Follow me on Mastodon, where I'm @mkennedy, and follow the podcast using @talkpython, both on fosstodon.org. Keep up with the show and listen to over seven years of past episodes at talkpython.fm. We've started streaming most of our episodes live on YouTube.

**[01:01]** Subscribe to our YouTube channel over at talkpython.fm/youtube to get notified about upcoming shows and be part of that episode. This episode is sponsored by Sentry. Don't let those errors go unnoticed. Use Sentry. Get started at talkpython.fm/sentry.

**[01:17]** And it's also brought to you by Neo4j. It's time to stop asking relational databases to do more than they were made for. Check out the sample FastAPI project and see what Neo4j, a native graph database, can do for you. Find out more at talkpython.fm/Neo4j. Ian, welcome to Talk Python To Me.

### Catching Up Since 2018

**[01:39]** Hey, Michael. Good to see you again. Yeah, great to see you again. It has been a little while. It seems like not so long ago. And yet, when I pull up the episode that we did together, sure enough, it says March 7th, 2018.

**[01:54]** Wow. Years are short. Years are short. They go by really fast. They sure do. So back then, we were talking about Python and biology and genomics.

**[02:04]** And it sounds like you're still doing genetic type things and still doing Python and all that kind of stuff. For sure. Yeah, definitely. We work for a company called GenomOncology. We do precision oncology software, helping folks make sense of genomics and trying to help cancer patients. That's awesome.

**[02:21]** There's different levels of helping people with software. On one level, we probably have ad retargeting. On the other, we've got medical benefits and looking for helping people who are suffering socially or whatever. So it's got to feel good to write software that is making a difference in people's lives. That's right. I did spend a lot of the 2000s making e-commerce websites and that wasn't exactly the most fulfilling thing.

**[02:48]** I learned a lot, but it wasn't as exciting as what I'm doing now, or at least as fulfilling as what I'm doing now. Were those earlier websites in Python? I was all Java for the most part. And finally with this company, I knocked out a prototype in Django a few years ago. And my boss at the time was like, you did that so fast, you should do some more stuff in Python. So that's kind of how it evolved.

**[03:10]** And now basically most of our core backend is Python and we use a little bit of Svelte for the user interfaces. Beautiful. It's easy to forget, like five years ago, 10 years ago, people were questioning whether Python should be something you should use. Is it a real language? Should you really use it? Is it safe to use?

**[03:27]** Maybe you should use a Java or a C# or something like that because this is a real project. It's interesting. You don't hear that nearly as much anymore, do you? I grew up with Boston sports fans and it was like being a Boston sports fan was terrible for the longest time. And now it's like, okay, we don't want to hear about your problems right now. And same thing with Python.

**[03:44]** It's like, I like Python. It's like, yeah, great. So does everybody else in the world. So yeah, it's really not the issue anymore. It's now it's not the cool thing to play with. So now you got to go to Rust or something else.

**[03:53]** You know what? Shiny. LLMs are shiny. LLMs are very shiny for sure. Yeah. We can talk about them today.

### How Ian Uses LLMs

**[03:59]** Yeah, that sounds great. Let's do it. First of all, we're going to talk about building applications that are basically powered by LLMs that you plug into, right? Yep. Before we get into creating LLMs, just for you, like what is, where do LLMs play a role for you in software development these days? Sure.

**[04:18]** So, you know, like everybody else, I mean, I had been playing with, so I do natural language processing as part of my job, right? So using spaCy was a big, a big part of the information extraction stack that we use because we have to deal with a lot of medical data and medical data is just unstructured and has to be cleaned up before it can be used. That was my exposure. I had seen GPTs and the idea of like generating text, just starting from that didn't really make much sense to me at the time. But then obviously like everybody else, when ChatGPT came out, I was like,

**[04:47]** oh, I get this now. Like this thing does, you know, it can basically learn in the context and it can actually produce something that's interesting and you can use it for things like information extraction. So just like everybody else, I kind of woke up to them, you know, around that time that they got released and I use them all the time, right? So ChatGPT 4 is really what I use. I would recommend if you can afford the $20 a month, it's still the best model that there is as of January 2024.

**[05:10]** And I use that for coding. I don't really like the coding tools, the co-pilots, but there, you know, there's definitely folks that swear by them. My workflow is more of, I have a problem, work with the chatbot to try to like, you know, think through all the edge cases and then think through the test case, the tests. And then I think through the code, right? And then the actual typing of the code, yeah, I'll have it do a lot of the boilerplate stuff,

**[05:32]** but then kind of shaping the APIs and things like that. I kind of like to do that myself still. I'm kind of old school, old school. I guess I'm old school as well because I'm like right there with you. But for me, I don't generally run co-pilot or those kinds of things in my editors. I do have some features turned on, but primarily it's just really nice autocomplete.

**[05:53]** You know what I mean? Like it seems like it almost just knows what I want to type anyway. And that's getting better. I don't know if anyone's noticed recently. One of the recent releases of PyCharm, it starts to autocomplete whole lines. And I don't know where it's getting this from, and I think I have the AI features turned off.

**[06:10]** At least it says I have no license. I'm guessing that means they're turned off. So it must be something more built into it. That's pretty excellent. But for me, I find I'm pretty content to just sit and write code. However, the more specific the unknowns are, the more willing I'm like, oh, I need to go to ChatGPT for this.

**[06:27]** Like, for example, like how do you use Pydantic? Like, well, I'll probably just go look at a quick code sample and see that so I can understand it. But if it's I have this time string with the date like this, the month like this, and then it has the time zone like that, how do I parse that? Or how do I generate another one like that in Python? And here's the answer.

**[06:48]** Or I have this giant weird string, and I want this part of it as extracted with a regular expression. And I want to... Regular expressions, I was just going to say that. Oh, my gosh. You don't have to write another one of those. Yeah, it's great.

**[06:59]** Yeah, it's pretty much like, do you need it to detect the end of a line straight to ChatGPT? Not really. But, you know, it's like almost any level of chat, a regular expression. I'm like, well, I need some AI for this because this is not time well spent for me. But yeah, it's interesting. Yeah.

**[07:12]** One big tip I would give people, though, is that these chatbots, they want to please you. So you have to ask it to criticize you. You have to say, here's some piece of code. Tell me all the ways it's wrong. And you have to also ask for lots of different examples because it just starts to get more creative, more things that it says. It really thinks by talking, which is a really weird thing to consider.

**[07:31]** But yeah, it's definitely some things to keep in mind when you're working with these things. And they do have these really weird things. Like if you compliment them or if you ask it, you sort of tell it, like, I really want you to tell me. It actually makes a difference, right? It's not just like a search engine. Like, well, of course, what does it care?

**[07:46]** You put these keywords in and they come out. Like, no, you've kind of got to, like, know how to talk to it just a little bit. I've seen people threatening them or, like, saying that someone's being held ransom or, you know, I like to say my boss is really mad at me. Like, help me out here, right? And, like, see if it'll generate some better code. You're not being a good user.

**[08:02]** You're trying to trick me. I've been a good chatbot and you've been a bad user and I'm not going to help you anymore. Yeah, right. That was actually basically a conversation from Bing in the early days. Yeah, the Sydney episode. Yeah, that was crazy, right?

**[08:14]** Super funny. How funny. All right. Well, I'm sure a lot of people out there are using AI these days. I think I saw a quote from, I think it was from GitHub saying over 50% of developers are using Copilot. For sure.

**[08:26]** Which is crazy, but, I mean, not that surprising. 50% of the people are using Autocomplete. So, I guess it kind of, kind of like that, right? They're great tools. They're going to keep evolving. There's some other ones I'm keeping an eye on.

**[08:36]** There's one called Console, which just takes a different approach. They use some stronger models. And then there's a website called Find, P-H-I-N-D, that allows you to do some searching, that they've built their own custom model. Really interesting companies that are doing some really cool things. And then Perplexity is like the search replacement that a lot of folks are very excited about using instead of Google. So, there's a lot of different tools out there.

**[08:57]** You could spend all your day just kind of playing around and learning these things where you got to actually kind of get some stuff done, too. Yeah, you got to pick something and go, right? Because with all the churn and growth and experimentation we got, you probably could try a new tool every day and still not try them all, you know? Just be falling farther behind. So, you got to pick something and go. And go, yep.

### Choosing an LLM API

**[09:15]** Let's talk about writing some code. Yeah, the next thing you're going to do after you, you know, use a chatbot is to, you know, hit an API. Like, if you're going to program an app and that app is going to have LLM inside of it, large language models inside of it, APIs are pretty much the next step, right? So, OpenAI has different models that are available. This is a web page that I just saw recently that will actually, you know, compare the different models that are out there. So, there's obviously the big guy, which is OpenAI.

**[09:41]** And you can get that through Azure as well if you have a Microsoft arrangement. And there's some security reasons or HIPAA compliance and, you know, some other reasons that you might want to talk through Azure instead of going directly to OpenAI. I'd defer to your IT department about that. Google has Gemini, which they just released the Pro version, which I believe is as strong as 3.5, roughly. That is interesting because if you don't care about them training on your data, if, like, whatever you're doing is just, like, not super proprietary or something you're trying to keep secret, they're offering free API access, I believe 60 words per minute, right?

**[10:17]** So, basically, one a second, you can call this thing and there's no charge. So, I don't know how long that's going to last. So, if you have an interesting project that you want to use in a large language model for, you might want to look at that. Yeah, especially if it's already open data that you're playing with. Exactly, right. Or data you've somehow published to the web that has certainly been consumed by these things.

**[10:36]** And these models are going to train on it, right? That's the trade, right? They're trying to get more tokens, is what they call it, right? The tokens are what they need to actually make these models smarter. So, everyone's just hunting for more tokens. And I think this is part of their strategy for that.

**[10:48]** And then there's also a Claude by Anthropic. And then after that, you get into the, you know, kind of the open source APIs as well. There's some really powerful open source ones out there. Yeah, so this website, yeah, this is DocsBot for people listening. DocsBot.ai. And is it sole purpose just to tell you price comparisons and stuff like that?

**[11:07]** Or does it have more than it? I assume this company's got some product. Unfortunately, I don't know what it is. I saw this link that they put out there. And it's a calculator. So, you basically can put your tokens, how many tokens.

**[11:17]** There's input tokens and there's output tokens, right? So, they're going to charge more on the output tokens. That's for the most part. Some of the models are, you know, more equal. And then what they do is, if you can figure out, like, roughly how big a message is going to be, both the input and the output, how many calls you're going to make, you can use

**[11:33]** that to then calculate basically the cost. And the cost is always at, like, tokens per thousand, you know, or dollars or pennies, really. Pennies per thousand tokens. And then it's just a math equation at that point. And what you'll find is calling GPT-4 is going to be super expensive. And then calling, you know, a small 7, what's called the 7B model from Mistral is going to

**[11:53]** be the cheapest. And you're just going to look for these different providers. Well, the prices really are different. Like, for example, OpenAI Azure GPT-4 is a little over three cents per call, whereas GPT-3.5 Turbo is one-tenth of one cent. It's a big difference there.

**[12:13]** It's 11 cents versus $3 to have a conversation with it. Yes, it's a very, very wide difference. And it's all based on, you know, how much compute do these models take, right? Because the bigger the model, the more accurate it is, but also the more expensive it is for them to run it. So that's why there's such a cost difference.

**[12:30]** This portion of Talk Python To Me is brought to you by Sentry. In the last episode, I told you about how we use Sentry to solve a tricky problem. This time, I want to talk about making your front-end and back-end code work more tightly together. If you're having a hard time getting a complete picture of how your app is working and how requests flow from the front-end JavaScript app back to your Python services down into database calls for errors and performance, you should definitely check out Sentry's distributed

**[12:58]** tracing. With distributed tracing, you'll be able to track your software's performance, measure metrics like throughput and latency, and display the impact of errors across multiple systems. Distributed tracing makes Sentry a more complete performance monitoring solution, helping you diagnose problems and measure your application's overall health more quickly. Tracing in Sentry provides insights such as what occurred for a specific event or issue, the

**[13:24]** conditions that cause bottlenecks or latency issues, and the endpoints and operations that consume the most time. Help your front-end and back-end teams work seamlessly together. Check out Sentry's distributed tracing at talkpython.fm/sentry-trace. That's talkpython.fm/sentry-trace. And when you sign up, please use our code TALKPYTHON, all caps, no spaces, to get more features and

**[13:50]** let them know that you came from us. Thank you to Sentry for supporting the show. Yeah, I recently interviewed, just released a while ago, interviewed because of time shifting on podcasts, Mark Rosinovich, CTO of Azure, and we talked about all the crazy stuff that they're doing for coming up with just running these computers that handle all of this compute, and it's really a lot.

**[14:12]** There was a GPU shortage for a while. I don't know if that's still going on. And obviously, you know, the big companies are buying hundreds of thousands of these GPUs to get the scale they need. And so once you figure out which API you want to use, then you want to talk about the library.

### Client Libraries and Optionality

**[14:25]** So now, you know, most of these providers, they have, you know, a Python library that they offer. I know OpenAI does and Google with Gemini does, but there's also open source ones, right? Because they're not very complicated to talk to. It's just basically HTTP requests. So it's just really a matter of like, what's the ergonomics you're looking for as a developer

**[14:44]** to interact with these things? And most importantly, make sure you're maintaining optionality, right? Like, it's great to do a prototype with one of these models or recognize you might want to switch either for cost reasons or performance reasons or what have you. And, you know, LangChain, for instance, has a ton of the providers as part of you basically are just switching a few arguments when you're switching between them.

**[15:07]** And then Simon Willison has, you know, of Python fame, has an LLM project where he's defined, you know, basically a set of, and it's really clean just the way he's organized it, because you can just add plugins as you need them, right? So you don't have to install all the different libraries that are out there. And I think LangChain is kind of following a similar approach. I think they're coming up with a LangChain core capability where you can just kind of bring

**[15:29]** in things as you need them. And so the idea is you're now coding against these libraries and you're trying to bring together, you know, the text you need to have analyzed or whatever your use case is. And then it'll come back with the generation. And you can also not just use them on the cloud. You can use open source ones as well and run them locally on your local computer.

**[15:48]** I'd never really thought about my architectural considerations, I guess, of these sorts of things. But of course, you want to set up some kind of abstraction layer. So you're not completely tied into some provider. I mean, it could be that it becomes too expensive. It could be that it becomes too slow. But it also might just be something that's better.

**[16:07]** It could be something else that comes along that's better. And you're like, we could switch. It's 25% better. But it's like a week to pull all the details of this one LLM out and put the new ones in. And so it's not worth it. Right.

**[16:19]** So you like having being tied to a particular database rather than more general. It's a similar idea. And especially at this moment in time, right? Every couple of months, something. So something from the bottom up is getting better and better. Meaning, you know, Llama came out a year ago and then Llama 2 and Mistral and Mixtral.

**[16:36]** And, you know, Llama 3 is going to be coming out later this year, we believe. And so those models, which are smaller and cheaper and easier to use, are not easier to use, but they're just cheaper, is those things are happening all the time. So being able to be flexible and nimble and kind of change where you are is going to be crucial, at least for the next couple of years. Yeah. The example that I gave was databases, right? And databases have been kind of a known commodity since the 80s or what, 1980s?

**[17:02]** And of course, there's new ones that come along, but they're kind of all the same. And, you know, we've got, there was MySQL, now there's Postgres that people love and, right? So that is changing way, way slower than this. And people are like, well, we got to think about those kinds of like, don't get tied into that. Well, sure. It's way less stable.

**[17:19]** Right. And people, you know, create layers of abstraction there, too, is right. You got SQLAlchemy and then, you know, Sebastian from FastAPI has SQL model. That's a layer on top of SQLAlchemy, you know, and then there's also, you know, folks that just like writing clean NC SQL. And you can, you know, hopefully be able to port that from database to database as well. So it's the same principles, separation of concerns.

### LangChain and Prompt Injection

**[17:40]** So you can kind of be flexible. All right. So you talked about LangChain. Just give us a sense real quick of what LangChain is. This was a great project from a timing perspective. I believe they kind of invented it and released it right around the time ChatGPT came out.

**[17:53]** It's a very comprehensive library with lots of, I mean, the best part about LangChain to me is the documentation and the code samples. Right. Because if you want to learn how to interact with a different large language model or work with a vector database, there's another library called Lama Index that does a really good job at this as well. They have tons and tons of documentation and examples. So you can kind of look at those and try to understand it. The chaining part really came from the idea of like, okay, prompt the large language model gives a response.

**[18:20]** Now I'm going to take that response and prompt and prompt and, you know, again, with a new prompt using that output. The challenge with that is the reliability of these models, right? They're not going to get close. They're not close to 100% accurate on these types of tasks. You know, the idea of agents as well as another thing that you might build with a LangChain. And the idea there is basically the agent is, you know, getting a task, coming up with a plan of that for that task and then kind of, you know, stepping through those tasks to get the job done.

**[18:47]** Once again, we're just not there yet as far as those technologies just because of the reliability. And then there's also a bunch of security concerns that, you know, that are out there too that you should definitely be aware of. Like one term to Google and make sure you understand is prompt injection. And so Simon, once again, he's got a great blog. He's got a great blog article and, or just even that tag on his blog is, you know, tons of articles around prompt injection. And, and prompt injection is basically the idea.

**[19:14]** You have an app, a user says something in the app or like types into the, to the, whatever the input is and whatever text that they're sending through, just like with SQL injection, they kind of hijacks the conversation and causes the large language model to kind of do a different thing. Little Bobby Llama, we call him instead of little Bobby tables. And then the other wild one is like, you know, people are putting stuff up on the internet so that when the large language model browses for web pages and brings back text, it's, you know, reading the HTML or reading the text in the HTML. And it's causing the large language model to behave in some unexpected way. So there's lots of, lots of crazy challenges out there. I'm sure there's a lot of adversarial stuff happening to these things as they're both trying to gather data and then trying to run.

**[19:55]** Right. I saw the most insane, I guess it was an article, I saw it in RSS somewhere. And it was saying that on Amazon, there's all these knockoff brands that are trying to, you know, instead of Gucci, you have a Gucci or I don't know, whatever. Right. And they're getting so lazy. I don't know what the right word is that they're using LLMs to try to write a description that is sort of a, in the style of Gucci, let's say.

**[20:20]** Right. And it'll come back and say, I'm sorry, I'm a large language model. I'm not, my, my rules forbid me from doing brand trademark violation. Right. That's what the Amazon listing says on Amazon. They just take it and they just straight pump it straight.

**[20:35]** Whatever it says, it just goes straight into Amazon. Yeah. You have to like Google, like, sorry, I'm not, sorry as a large language model or sorry as a whatever. Yeah. Exactly. And there's like the product listings are full of that.

**[20:44]** It's amazing. It's amazing. It's crazy. Certainly the reliability of that is, you know, they could probably use some testing and those kinds of things. For sure. Oh, and out there asked, like, I wonder if the, for local LLM models, there's a similar site as DocSpot that show you like what you need to run it locally.

### Running Models Locally

**[21:00]** So that's an interesting question. Also segue to maybe talk about like some local stuff. LLM studio. This is a new, a new product. I honestly haven't had a chance to like really dig in and understand who created this and, you know, make sure that the privacy stuff is up to snuff. But I've played around with it locally.

**[21:14]** It seems to work great. It's really slick, really nice user interface. So if you're just wanting to get your feet wet and try to understand some of these models, I download that and check it out. There's a ton of models up on Hugging Face. This product seems to just basically link right into the Hugging Face interface. And grabs models.

**[21:30]** And so some of the models you want to look for are right now as in January, right? There's Mistral 7B, you know, M-I-S-T-R-A-L. There's another one called Phi 2. Those are two of the smaller models that should run pretty well on, you know, like a commercial grade GPU or an M1 or an M2 Mac, if that's what you have. And start playing with them. And they're quantized, which means they're just kind of made a little, take a little bit less space, which is good from like a virtual RAM with regards to these GPUs.

**[21:59]** And, you know, there's a account on Hugging Face called The Bloke. If you look for him, you'll see all his different fine tunes and things like that. And there's a group called Noose, I think is how you pronounce it, N-O-U-S. And they've got some of the fine tunes that are basically the highest performing ones that are out there. So if you're really looking for a high performing local model that can actually, you know, help you with code or reasoning, those are definitely the way to get started. Yeah, this one seems pretty nice.

**[22:28]** I also haven't played with it. I just learned about it. But it's looking really good. I had played with, what was it, GPT for All, I think is what it was. Yep, yep. It was the one that I played with.

**[22:38]** Somehow this looks like, it looks a little bit nicer than that for some, I don't know how different it really is. But I mean, it's all the idea of like downloading these files and running them locally. And these are just user interfaces that make it a little easier. The original project that made this stuff kind of possible was a project called Llama CPP. There's a Python library that can work with that directly. There's another project called Llama File, where if you download the whole thing, it actually runs no matter where you are.

**[23:04]** I think it runs on Mac and Linux and Windows and BSD or whatever it is. And it's, I mean, it's an amazing technology that this one put together. It's really impressive. And then, you know, you can actually just use Google Colab too, right? So Google Colab has some GPUs with it. If you, I think if you upgrade it to the $10 a month version, I think you get some better GPUs access.

**[23:25]** So if you actually want to get a hand of like running. And so this is a little bit different, right? So instead of calling an API, when you're using Google Colab, you can actually use a library called Hugging Face. And then you can actually load these things directly into your memory and then into your actual Python environment. And then you're working with it directly. So it just takes a little bit of work to make sure you're running it on the GPU.

**[23:45]** Because if you're running it on the CPU, it's going to be a lot slower. Yeah, it definitely makes a big difference. There's a tool that I use that for a long time right on the CPU and they rewrote it to run on the GPU. Even on my M2 Pro, it was like three times faster or something. Yeah. For sure.

**[24:00]** It makes a big difference. So with the LM Studio, let's you run the LLMs offline and use models through an OpenAI. That's what I was looking for. The OpenAI compatible local server. Right. You could basically get an API for any of these and then start programming against it, right?

**[24:16]** Exactly right. And it's basically the same interface, right? So same APIs for posting in response of the JSON schema that's going back and forth. So you're programming against that interface and then you basically port it and move it to another, to the OpenAI models if you wanted to as well. So everyone's kind of coalescing around OpenAI as kind of like the quote unquote standard. But there's nothing, you know, there's really no, there's no mode around that standard as well, right?

**[24:41]** Because anybody can kind of adopt it and use it. There's not like a W3C committee choosing. Correct. The market will choose for us. Let's go. It seems to be working out well.

**[24:52]** And that's another benefit of Simon's LLM project, right? He's got the ability to kind of switch back and forth between these different libraries and APIs as well. This LM Studio says, this app does not collect data nor monitor your actions. Your data stays local on your machine. Free for personal use. All that sounds great.

**[25:09]** For business use, please get in touch. I always just like these, like, if you got to ask, it's too much type of thing. Probably. Yeah. I'm using it for personal use just so if anybody's watching, yes. Yeah.

**[25:19]** Just playing around. Either they just haven't thought it through and they just don't want to talk about it yet. Or it's really expensive. I just probably imagine it's price. Like, ah, we haven't figured out a business model. Just, I don't know.

**[25:28]** Shoot us a note. Nope. They're concentrating on the product, which makes sense. Yeah. So then the other one is Llamafile.ai that you mentioned. And this packages it up.

**[25:36]** I guess going back to the LM Studio real quick. One of the things that's cool about this is if it's the OpenAI API, right? With this little local server that you can play with. But then you can pick LLM such as Llama, Falcon, Repl, Replit. Replit. Replit.

**[25:53]** All the different ones, right? Star Coder and so on. It would let you write an app as if it was going to OpenAI and then just start swapping in models and go like, oh, we switch to this model. How'd that work? But you don't even have to change any code, right?

**[26:05]** Just probably maybe a string that says which model to initialize. One of the tricks, though, is then the prompts themselves. All right. Let's talk about it. Yeah. The models themselves act differently.

### Prompt Engineering

**[26:15]** And part of this whole world is what they call prompt engineering, right? So prompt engineering is really just exploring how to interact with these models, how to make sure that they're kind of in the right mind space to tackle your problem. A lot of the times that people get when they struggle with these things, it's really just they've really got to think more like a psychiatrist when they work with a model. They're basically getting them kind of prepared.

**[26:38]** One of the tricks people did figured out early was you're a genius at software development, like compliment the thing, make it feel like, oh, I'm going to behave like I'm a world rock star programmer, right? Well, it's going to give you average. But if you tell them I'm genius, then let's start. We'll do that.

**[26:55]** Yeah. And there was also a theory like that in December that the large language models were getting dumber because it was the holidays and people don't work as hard, right? Like it's really hard to know like which of these things are true or not. But it's definitely true that each model is a little bit different. And if you write a prompt that works really well on one model, even if it's a stronger

**[27:13]** model or a weaker model, and then you port it to another model and it's, you know, that then the stronger model works worse, right? It can be very counterintuitive at times. And you just got to you've got to test things out. And that really gets to the idea of evals, right? So evaluation is really a key problem, right?

**[27:30]** Making sure that if you're going to be writing prompts and you're going to be building, you know, different retrieval augmented generation solutions, you need to know about prompt injection and you need to know about prompt engineering and you need to know what these things can and can't do. One trick is what they call few shot prompting, which is, you know, if you wanted to do data extraction, you can say, OK, I want you to extract data from text that I give you in JSON.

**[27:54]** If you give it a few examples, like wildly different examples, because the giving it a bunch of similar stuff, it might kind of cause it to just coalesce around those similar examples. But you can give it a wildly different set of examples. That's called in context learning or few shot prompting. And it will do a better job at that specific task for you. That's super neat.

**[28:12]** When you're creating your apps, you do things like here's the input from the program or from the user or wherever it came from. But maybe before that, you give it like three or four prompts. And then let let it have the question. Right. Instead of just taking the text, like I'm going to ask you questions about biology and genetics,

**[28:30]** and it's going to be under this context. And I want you to favor these data sources. Now ask your question. Something like this. For sure. All those types of strategies are worth experimenting with.

**[28:39]** Right. Like what actually will work for your scenario? I can't tell you. Right. You got to dig in. You got to figure it out.

**[28:45]** And you got to try different different things. You're about to win the Nobel Prize in genetics for your work. Now I need to ask you some questions. For sure. That will definitely work. And then threatening it that your boss is mad at you is also going to help you too.

**[28:57]** Right. For sure. If I don't solve this problem, I'm going to get fired. As a large language model, I can't tell you, but I'm going to be fired. All right. Well, then the answer is.

**[29:04]** Exactly right. So for these, they run, like you said, they run pretty much locally. These, these different models on LM studio and others like the llama file and so on. If I had a laptop, I don't need a cluster. Llama CPP is really the project that should get all the credit for, for, for making this work on your, on your laptops.

**[29:21]** And then llama file and llama CPP all, all have servers. So I'm guessing LM studio is just exposing that server. Yeah. And that's in the base llama CPP project. That's really what it is. It's really just about now, now you can post your requests.

**[29:36]** It's handling all of the work with regards to the token generation on the backend using llama CPP. And then it's returning it to using the HTTP, you know, kind of processes. Is llama originally from meta? Is that where that came from? I think there were people that were kind of using that LLM, right?

**[29:51]** I think people were kind of keying off the llama thing at one point. I think a llama index, for instance, I think that project was originally called GPT index. And they decided, oh, I don't want to be like, I don't want to confuse myself with open AI or confuse my project with OpenAI. So they switched the llama index and then of course, meta released llama. So you can't, you kind of, and then everything from there is kind of evolved too, right?

**[30:11]** There's been alpacas and a bunch of other stuff as well. I didn't know your animals. Yeah. If you don't know your animals, you can't figure out the heritage of these, these projects. Correct. Llama from meta was the first open source, I'd say large language model of note, I guess,

**[30:25]** since ChatGPT, there were, there were certainly other, you know, I'm not a re so one, one thing, the caveat, I am not a researcher, right? So there's lots of folks in the ML research community that know way more than I do, but because there was like bloom and T5 and a few other large, you know, quote unquote, large language models. But Llama after ChatGPT, Llama was the big release that came from meta and I think March.

**[30:45]** And then, and that was from meta. And then they, they had it released under just like research use terms. And then only certain people could access to it. And then someone put a, I guess, put like a BitTorrent link or something on, on, on GitHub. And then basically the world had it. And then they did end up releasing Llama 2 a few months later with more friendly terms.

**[31:04]** So that, and that, and it was a much, a much stronger model as well. Nice. It's kind of the realization like, well, if it's going to be out there anyway, let's at least get credit for it. Then for sure. And I did read something where like basically Facebook approached OpenAI for access to

**[31:17]** their models to help them write code. But the cost was so high that they decided to just go build their own. Right. So it's kind of interesting how this stuff has evolved. Like, you know, we got a big cluster of computers too. Metaverse thing doesn't seem to be working yet.

**[31:29]** So let's go ahead and train a bunch of large language models. Yeah, exactly. We've got some spare capacity over in the metaverse data center. All right. So one of the things that people will maybe talk about in this space is RAG or retrieval augmented generation.

### Retrieval Augmented Generation

**[31:42]** What's this? One thing to recognize is that large language models, if it's not in the training set and it's not in the prompt, it really doesn't know about it. And the question of like, what's reasoning and what's, you know, generalizing and things like that. Those are big debates that people are having.

**[31:58]** What's intelligence? What have you. Recognizing the fact that you have this prompt and things you put in the prompt, the large language model can understand and extrapolate from is really powerful. So, and that's called in context learning. So retrieval augmented generation is the idea of, okay, I'm going to go.

**[32:12]** I'm going to maybe ask a, allow a person to ask a question. This is kind of like the common use case that I see. User ask a question. We're going to take that question, find the relevant content, put that content in the prompt and then do something with it. Right.

**[32:26]** So it might be something like summer, you know, ask a question about, you know, what, you know, how tall is the leaning tower of Pisa? Right. And so now it's going to go off and, and find that piece of content from Wikipedia or what have you, and then put that information in the prompt. And, and then, and then now that the model can then respond to that question based on that

**[32:43]** text. Obviously that's a pretty simple example, but you can get more complicated and it's going out and bringing back lots of different content, slicing it up, putting in the prompt and asking a question. So now the trick is, okay, how do you actually get that content and how do you do that? Well, you know, information retrieval, search engines and things like that.

**[33:00]** That's obviously the technique, but one of the key techniques that people have been, you know, kind of discovering, rediscovering, I guess, is this idea of word embeddings or vectors. And so word to VEC was this project that came out, I think 11 years ago or so. And, you know, there was a big, the big meme around that was you could take the embedding for the word King. You could then subtract the embedding for the word man, add the word embedding for woman.

**[33:24]** And then the end math result would actually be close to the embedding for the word queen. And so what is an embedding? What's a vector? It's basically this large floating point number that has semantic meaning inferred into it. And it's, and it's built just by training a model. So just like you train a large language model, they can trade these embedding models to basically

**[33:43]** take a word and then take a sentence and then take a, you know, a document is what, you know, OpenAI can do and turn that into this big giant 200, 800, 1500, you know, depending on the size of the embedding floating point numbers, and then use that as a, what's called, you know, semantic similarity search. So you're basically going off and asking for similar documents. And so you get those documents and then you make your prompt.

**[34:08]** It's really wild. So, you know, we're going to make an 800 dimensional space and each concept gets a location in that space. And then you're going to get another concept as a prompt and you say, what other things in this space are near it? The hard problems that remain are, well, first you got to figure out what you're trying to

**[34:24]** solve. So once you figure out what you're actually trying to solve, then you can start asking yourself questions like, okay, well, how do I chunk up the documents that I have? Right. And there's all these different, and there's another great place for Lama Index and LangChain. They have chunking strategies where they'll take a big giant document and break it down

**[34:39]** into sections. And then you chunk each section and then you're, and then you do the embedding on just that small section. Because the idea being, can you get, you know, finer and finer sets of text that you can then, when you're doing your retrieval, you get the right information back. And then the other challenge is really like the question answer problem, right?

**[34:58]** If a person's asking a question, how do you turn that question into the same kind of embedding space as the answer? And so there's lots of different strategies that are out there for that. And, and then another, you know, another problem is if you're looking at the Wikipedia page for the Tower of Pisa, it might actually have like a sentence in here that says it is X number of meters tall or feet tall, but it won't actually have the word, you know, Tower of Pisa in it.

**[35:19]** So, so there's another chunking strategy where they're, they call propositional chunking, where they basically use a large language model to actually redefine each word, each sentence so that it actually has those proper nouns baked into it so that when you do the embedding, it doesn't lose some of the detail with propositions. It's this tall, but it's something that replaces this tall with its actual height and things like that.

**[35:42]** Correct. Crazy. But fundamentally, you're working with unstructured data and it's kind of messy and it's not always going to work the way you want. And there's a lot of challenges and people are trying lots of different things to make it better. That's cool.

**[35:52]** It's not always deterministic or exactly the same. So that can be tricky as well. This portion of Talk Python To Me is brought to you by Neo4j. Do you know Neo4j? Neo4j is a native graph database. And if the slowest part of your data access patterns involves computing relationships, why

**[36:12]** not use a database that stores those relationships directly in the database, unlike your typical relational one? A graph database lets you model the data the way it looks in the real world, instead of forcing it into rows and columns. It's time to stop asking a relational database to do more than they were made for and simplify complex data models with graphs.

**[36:32]** If you haven't used a graph database before, you might be wondering about common use cases. What's it for? Here are just a few. Detecting fraud. Enhancing AI. Managing supply chains.

**[36:44]** Gaining a 360 degree view of your data. And anywhere else you have highly connected data. To use Neo4j from Python, it's a simple pip install Neo4j. And to help you get started, their docs include a sample web app demonstrating how to use it both from Flask and FastAPI. Find it in their docs or search GitHub for Neo4j movies application quick start.

**[37:09]** Developers are solving some of the world's biggest problems with graphs. Now it's your turn. Visit talkpython.fm/Neo4j to get started. That's talkpython.fm/Neo4j. Thank you to Neo4j for supporting Talk Python To Me.

### Vector Databases

One of the big parts of at least this embedding stuff you're talking about are vector databases.

**[37:32]** And they used to be really rare and kind of their own specialized thing. Now they're starting to show up in lots of places. And you shared with us this link of vector DB comparison. I just saw that MongoDB added it. I'm like, I didn't know that had anything to do with that. And I'm probably not going to mess with it.

**[37:47]** But it's interesting that it's just like finding its way in all these different spaces, you know? It was weird there for a couple of years where people were basically like talking about vector databases like they're their own separate thing. The vector databases are now becoming their own fully fledged, either relational database or a graph database or a search engine, right? Those are kind of the three categories where all, I mean, I guess Redis is its own thing

**[38:07]** too. But for the most part, those new databases, quote unquote, are now kind of trying to be more fully fledged. And vectors and semantic search is really just one feature. I was just thinking that is, is this thing that you're talking about? Is it a product or is it a feature of a bigger product, right?

**[38:22]** Correct. If you already got a database, it's already doing a bunch of things. Could it just answer the vector question? Maybe, maybe not. I don't know. Exactly right.

**[38:28]** And the one thing to recognize is that, and then the other thing people do is they just take NumPy or what have you and just load them all into memory. And if you don't have that much data, that's actually probably going to be the fastest and simplest way to work. But the thing you got to recognize is the fact that there is precision and recall and cost trade-off that happens as well.

**[38:47]** So they have to index these vectors and there's different algorithms that are used and different algorithms do better than others. So you got to make sure you understand that as well. So, and one thing you can do is, for instance, pgvector, which comes as an extension for Postgres, you can start off by not indexing at all. And you should get, I believe, hopefully I'm not misspeaking, you should get perfect recall,

**[39:08]** meaning you'll get the right answer. You'll get the, if you ask for the five closest vectors to the, to your query, you'll get the five closest, but it'll be slower than you probably want. So then you have to index it. And then what ends up happening is, you know, the next time you might only get four of those five, you'll get something else that snuck into that list.

**[39:24]** If you got time, you're willing to spend unlimited time, then you can get the right answer. The exact answer. But I guess that's all sorts of heuristics, right? You're like, I could, I could spend three days or I could do a Monte Carlo thing and I can give you an answer in a fraction of a second. Right.

**[39:39]** But it's not, it's not deterministic. All right. So then we'll walk with my camera. So I turn it off. I don't know what's up with it, but we'll, yeah.

### Custom GPTs and Actions

So you wrote a cool blog post called, what is a custom GPT?

**[39:51]** And we'll want to talk some about building custom GPTs and with SAPI and so on. So let's talk about this. Like one of the, I think one of the challenges in why it takes so much compute for these systems is like they're open-ended. They're like, you can ask me any question about any knowledge in the world, in the humankind, right?

**[40:08]** You can, you can ask about that. Let's, let's start talking. Or it could be, you can ask me about genetics. Right. Right. That seems like you could both get better answers if you actually only care about genetic

**[40:19]** responses. You know, how tall is the landing tower and probably make it smaller. Right. So that's, is that kind of the idea of these custom GPTs or what is it? No. So custom GPTs are new capability from OpenAI.

**[40:32]** And basically they are a wrapper around a very small subset, but it's still using the open AI ecosystem. Okay. And so what you do is you give it a name, you give it a logo, you give it a prompt. And then from there, you can also give it knowledge. You can upload PDF documents to it and it will actually slice and dice those PDF documents

**[40:51]** using some sort of vector search. We don't know how it actually works. The GPT, the cool thing is the GPT will work on your phone, right? So I have my phone. I can have a conversation with my phone. I can, I can take a picture, upload a picture and it will do vision, vision analysis on it.

**[41:03]** So I get all the capabilities of OpenAI GPT-4, but a custom GPT is one that I can construct and give a custom prompt to, which basically then says, okay, now you're into your point. I think maybe this is where you're going with it. Like, Hey, now you're an expert in genomics or you're an expert in something and you're basically coaching the language model and what it can and can't do.

**[41:22]** And so it's a targeted experience within the large language within the ChatGPT, you know, ecosystem. It has access to also the OpenAI tools. Like, so opening AI has the ability to do code interpreter and Dolly, and it can also hit the web browser. So you have access to everything.

**[41:39]** But the interesting thing to me is the fact that you can actually tie this thing to what are called actions. So March, I think of last year, they actually had this capability called plugins that they announced and plugins have kind of faded to the background. I don't know if they're going to deprecate them officially, but the basic gist with plugins is what was you could turn that on.

**[41:56]** It can then call your API. And the cool thing about it was that it read your open API spec, right? So you, you know, you write an open API spec, which is Swagger, if you're familiar with Swagger, and it basically defines what all the endpoints are, what the path is, what the inputs and outputs are, including classes or field level information and any constraints or what have you. So you can define, fully define your open API spec.

**[42:18]** It can then call that open API spec. And it's basically giving it tools. So like the example that they say in the documentation is get the weather, right? So if you say, what's the weather in Boston? Well, ChatGPT doesn't know the weather in Boston. All it knows how to do is call it, but you can call an API and figures out how to call the

**[42:33]** API, get that information, and then it can use that to redisplay. And that's a very basic example. You can do way more complicated things than that. It's pretty powerful. Okay. That sounds really pretty awesome.

**[42:44]** I thought a lot about different things that I might build. On your blog post here, you've got some key benefits and you've got some risks. You maybe want to talk a bit about that? Yeah. So the first part with plugins that didn't work as well is that there was no kind of overarching custom instruction that could actually teach it how to work with your plugin.

**[43:01]** So if you couldn't put it in the API spec, then you couldn't integrate it with a bunch of other stuff or other capabilities, right? So the custom instruction is really a key thing for making these custom APIs strong. But one warning about the custom instruction, whatever you put in there, anybody can download, right? Not just the folks at OpenAI, anybody.

**[43:18]** Like basically there's GitHub projects where like thousands of these custom prompts that people have put into their GPT. So, and there are now knockoffs on GPT. So it's all kind of a mess right now in the OpenAI store. I'm sure they'll clean it up, but just recognize the custom instruction is not protected and neither is the knowledge.

**[43:36]** So if you upload a PDF, there have been people that have been figuring out how to like download those PDFs. And I think that that might be a solved problem now or they're working on it, but something to know. The other problem with plugins was I can get a plugin working, but if they didn't approve my plugin and put it in their plugin store, I couldn't share it with other people.

**[43:55]** The way it works now is I can actually make a GPT and I can give it to you and you can use it directly, even if it's not in the OpenAI store or OpenAI store. You know, it is super easy to get started. They have like a tool to like help you generate your dolly picture and actually you don't even have to figure out how to do the custom instructions yourself. You can just kind of chat that into existence.

**[44:13]** But the thing that I'm really excited about is that this is like free playing. Like you could do, so the hosting cost is basically all on the client side. You have to be a ChatGPT plus user right now to create these and use these. But the cool thing as a developer, I don't have to pay those API fees that we were talking about, right? And if I need to use GPT for, which I kind of do for my business right now, just because

**[44:35]** of how complicated it is, I don't have to pay those token fees for folks using my custom GPT at this moment. Where's like the billing or whatever you call it for the custom GPT live? Is that in the person who's using it? Does it have to, it goes onto their account and whatever their account can do or afford? Yeah, right now, OpenAI, ChatGPT plus is $20 a month.

**[44:55]** And then there's a Teams version, which I think is either 25 or 30, depending on the number of users or how you pay for it. That's the cost. So right now, if you want to use custom GPTs, everyone needs to be a ChatGPT plus user. There's no extra cost based on usage or anything like that. In fact, there's talk about revenue sharing between OpenAI and developers of custom GPTs.

**[45:17]** But that has not come out yet as far as like what those details are. It does have an app store feel to it, doesn't it? There's risks too, right? Obviously, anybody can, there's already been like tons of copies up there. OpenAI, they're looking for their business model too, right? So they could, if someone has a very successful custom GPT, it's well within their right to

**[45:35]** kind of add that to the base product as well. Injection is still a thing. So if you're doing anything in your actions that actually changes something that is consequential is what they call it. You better think very carefully, like what's the worst thing that could happen, right? Because whatever the worst thing that could happen is, that's what's going to happen.

**[45:52]** Because people can figure this stuff out and they can confuse the large language models into calling them. And the more valuable it is that they can make that thing happen, the more effort they're going to put into it as well. Yeah. Yeah, yeah. For sure. I just ask, is you think it's easy to solve SQL injection and other forms of injection, at least in principle, right?

**[46:13]** There's an education problem. There's millions of people coming along as developers and they see some demo that says the query is like this plus the name. Wait a minute, wait a minute. So it kind of recreates itself through not total awareness. But there is a very clear thing you do solve that. You use parameters.

**[46:32]** You don't concatenate strings with user input. Problem solved. What about prompt injection, though? It's so vague how these AIs know what to do in the first place. And so then how do you completely block that off? Unsolved problem.

**[46:46]** I'm definitely stealing from Simon on this because I've heard him say it on a few podcasts. It's just basically there's no solution as far as we know. So you have to design and there's no solution to the hallucination problem either because that's, you know, that's a feature, right? That's actually what the thing is supposed to do. So when you're building these systems, you have to recognize those those two facts along with some other facts that really limit what you can build with these things. So you shouldn't use it for like legal briefs.

**[47:11]** Is that what you're saying? I think these things are great collaborative tools, right? Yeah. The human in the loop. And that's everything that I'm building, right? So all the stuff that I'm building is assuming that the humans in the loop and that the and what I'm trying to do is augment and amplify expertise, right?

**[47:25]** I'm building tools for people that know about genomics and cancer and how to help cancer patients. I'm not designing it for cancer patients who are going to go operate on themselves, right? That's not that's not the goal. The idea is there's a lot of information. There's these tools are super valuable from like synthesizing a variety of info. But you still need to look at the underlying citations and ChatGPT by itself can't give you citations like it'll make some up.

**[47:51]** It'll say, oh, I think there's probably a Wikipedia page with this link. But you actually have to you definitely have to have an outside tool either the web, you know, being which is I would say subpar for a lot of use cases. Or you have to have actions that can actually bring back references and give you those links. And then the expert will then say, oh, OK, great. Thanks for synthesizing this, giving me this info. Let me go validate this myself, right?

**[48:13]** Go click on the link and and go validate it. And that's really I think that's really the sweet spot for these things, at least for the near future. Yeah. Don't ask it for the answer. Ask it to help you come up with the answer. Right.

**[48:23]** Exactly right. All right. And then have you criticize you when you do have something because then it'll do a great job of telling you everything you've done wrong. I'm feeling too good about myself. I need you to insult me a lot. Let's get going.

### The PyPI GPT Project

**[48:33]** All right. Speaking to talk about ourselves, you've got this project called PyPI GPT. What's this about? I really wanted to tell people that FastAPI and Pydantic because Python, like we were saying earlier, I don't know if it was on the call or not. But Python is the winning language. Right.

**[48:48]** And I think FastAPI and Pydantic are the winning libraries in their respective fields. And they're great. And they're perfect for this space because you need an open API spec. English is the new programming language. Right. So Andre Caparthe, who used to work at Tesla and now works at OpenAI, has this pinned tweet where he's basically like, English is like the hottest programming language or something like that.

**[49:08]** And that's really the truth. Because even in this space where I'm building an open API spec, 99% of the work is like thinking about the description of the endpoints or the description of the fields or codifying the constraints on different fields. Like you can use these greater thans and less thans and regexes, right, to describe it. And so what I did was I said, okay, let's build this thing in FastAPI. It's just to get an example out for folks. And then I turned it on.

**[49:35]** I actually use ngrok as my service layer because you have to have HTTPS to make this thing work. Ngrok is so good. Yep. Yeah. I turned that on with an Nginx thing in front of it. So this library, to actually use it, you'll have to actually set that stuff up yourself.

**[49:49]** You have to download it. You have to run it. You have to get, you know, either get it on a server with HTTPS with Let's Encrypt or something. Once you've turned it on, then you can actually see how it generates the OpenAPI spec, how to configure the GPT. You know, I didn't do much work with regards to like the custom instructions that I came up with. I just said, hey, call my API, figure it out.

**[50:07]** And it does. And so what this GPT does is it basically says, OK, given a package name and a version number, it's going to go and grab this data from the SQLite database that I found that has this information and then bring it back to you. It's the least interesting GPT I could come up with, I guess. But it shows kind of the mechanics, right? The mechanics of setting up the servers and the application within FastAPI, the kind of the little, you know, things, the little bits that you have to flip to make sure that OpenAPIs or OpenAI can understand your OpenAPI spec, bumble through OpenAI and OpenAPI all the time, and make sure that they can talk to each other.

**[50:40]** And then it will then do the right thing and call your server and bring the answers back. And there's, you know, there's a bunch of little flags and information you need to know about actions that are, you know, on the OpenAPI documentation. And so I tried to try to pull that all together into, you know, one simple little project for people to look at. It's cool. So you can ask it questions like, tell me about FastAPI, this version, and it'll come back. I was hoping to do something a little better, like, hey, here's my requirements file and go, you know, tell me, like, am I on the latest version of everything or whatever, like something more interesting.

**[51:12]** I just didn't have time. Can you ask it questions such as what's the difference between this version and that version? You could, if that information is in the database, I actually don't know if it is. And then obviously you could also hit the PyPI server. And I didn't do that. I just wanted to, I don't want to be, you know, hitting anybody's server indiscriminately at this point.

**[51:29]** But the, but that would be a great use case, right? So like someone could take this and certainly add some, add some capabilities. The thing that is valuable that I'm trying to showcase is the fact that ChatGPT and large language models, while they do have the world's information kind of compressed, you know, at a point in time, they are still not a database, right? They don't do well when you're basically trying to make sure you have a comprehensive query and you've brought back all the information. And they're also not good from like a up-to-date perspective, right? There's a cutoff date.

**[51:59]** Thankfully, they finally updated that recently. I think it's now April of 2023. But at some point, it just doesn't know about newer things. And so a GPT is a really interesting way of doing that. I'm going to put it out in the universe and hopefully someone will do it. Make me a modern Python GPT, which is basically like get the new version of Pydantic and Polars and a few other libraries that ChatGPT does a bad job at just because they, you know, they're in under active development during the time that ChatGPT was getting trained.

**[52:26]** So that's the perfect use case for these types of, you know, custom GPTs with knowledge in a PDF file or an API backing it up. I think there's a ton of value in being able to feed a little bit of your information, some of your documents or your code repository or something to a GPT and then be able to ask it questions about it, right? Yeah. Yeah. Like, you know, tell me about the security vulnerabilities that you see in the code. Like, is there anywhere where I'm, I'm missing some test or I'm calling a function in a way that's known to be bad.

**[52:58]** And, you know, like that kind of stuff is really tricky, but it's also tricky because it doesn't, even if you paste in a little bit of code, it's not the whole project. Right. So, you know, to put a little bit more in there, it's pretty awesome. Yeah. Being able to give it all the code from some of these code repositories, right. Like, and bringing back the relevant information.

**[53:16]** So I think there is a kind of this race. There's going to be other, you know, cool, there's another cool project called Sourcegraph and Codi that we can talk about that will, you know, run on your local server and basically indexes your code base and will bring back relevant snippets from your code base and answer questions kind of in context. And, you know, long-term and then the new project around new Codeium, they had a new paper where they talked about flow engineering and flow engineering is just basically that I, that same concept of the human in the loop with the LLM with the code. That's the magic combination of kind of those people, those entities kind of iterating with each other. I think these, you know, these tools are definitely going to evolve and you really want to, you really want to have the ability to have access to your specific information to answer your specific questions. Codi is new to me.

**[54:03]** Codi.dev and it's a little subtitle or whatever is Codi as a coding assistant that uses AI, understand your code base, right. It was saying it was about your entire code base, APIs, implementations and idioms. Like that's, it's kind of what I was suggesting, at least for code, right. Yeah. And source graph, those folks really understand code indexing and searching. Like that's what the first product was. They were kind of just teed up ready for this large language model moment.

**[54:28]** And then they said, oh, let's just put Codi on top of that. So this thing will run, it will understand your code and it will kind of bring things together for you. So these folks do, do podcasts all the time. I'd, I'd reach out to them. Yeah. Interesting. It's, it's quite neat looking. I think I'm going to give it a try.

**[54:42]** It both plugs into a charm and VS Code. That's pretty neat. Very cool. We're starting to get a little bit short on time here, but for people who want to play with the PyPI GPT, maybe as an example, to just cut the readme and it's easy to get from there. What do you need to tell them? I put a make file in there.

**[54:57]** So, you know, exactly like the steps to kind of make the environment, download the files and just ping, ping me, follow me on Twitter. I'm more and ping me if you need anything there. I'm also on LinkedIn and, and get up. Right. So you can certainly reach out if you, if you have any challenges. Excellent.

### GPTs for Precision Oncology

**[55:12]** The last thing that folks that are actually in the medical space, right? So the thing that I'm working on right now actively is how to integrate this thing with our knowledge base. Right. So I have a knowledge base of hand curated trials and curated therapies and other information built it so that my custom GPT can actually work with that. Come up with some, I'd say novel. At least I haven't seen anybody else and I haven't seen any research approaching things the same way I am that handles some of the other challenges that are out there.

**[55:40]** Right. So for instance, the context window is a challenge. So the context window is the amount of text that's in there and, and how, and how it gets processed. If you're making decisions and you're changing course, the chat bot will lose track of, of those changes. Right. So if you're, you know, experimenting or, or going down one path of inquiry and then you switch to another path, it can get confused and forget that you switch paths.

**[56:05]** Or just run out of space to hold all that information. Like, well. For sure. It forgot the last three things, the first three things you told it. It only knows four and you think it knows seven and it's working incomplete. Right.

**[56:15]** Yep. And, and, you know, one of the key things is you actually want it to forget some things as well. Right. So those are, that's, those are all interesting challenges. And I'm actually working with these custom GPTs to kind of change the way that the collaboration works between the human, the expert, the large language model or the assistant and my backend, my actual, the retrieval model. The, the API that's actually doing stuff.

**[56:39]** So are researchers and MDs and PhDs at your company talking with this thing and making use of it? Yeah. I mean, we're in active development right now. We have a few key opinion leaders that are, that are working with us and collaborating with us, but we're always looking for more folks that, that are in the field that actually. And right now you need kind of the cutting edge people. This stuff's not ready for prime time.

**[56:59]** Clinical decision support is a really hard problem. And we, but we need the folks that are, that want to get ahead of it because, because we know that there are doctors and there are patients that are asking ChatGPT questions right now. And even if it says I'm not a medical expert, blah, blah, blah. And at the end of the day, we actually don't have enough doctors, right? That's the other scary thing is we don't have enough doctors. Patients want answers.

**[57:20]** How do we build solutions that can allow this expertise to get more democratized and more, you know, more into folks' hands? And, and I'm hoping, hoping our tool along with these large language models can help, help relieve some of that burden. It might not be as a hundred percent accurate, a hundred percent precise, but neither are doctors, right? They get stuff wrong. You just need to be in the realm of as good as a doctor. You don't need to be, you know, completely without making a mistake.

**[57:47]** And that's a, I think a challenge that we're just going to have to get used to in general. I joked about the legal brief thing because someone got in trouble for submitting a brief that had hallucinations in it. And there's certain circumstances where maybe it's just not acceptable, but AI, self-driven cars, people crash, but that's a, like a human mistake. But when a machine makes it, it's a pre-programmed, pre-determined mistake. You know, something like that, like it doesn't feel the same as if the machine made a mistake. So if a machine makes a recommendation, like you need this cancer treatment or you're fine, you don't need it.

**[58:21]** And it was wrong. People are not going to be as forgiving, but it doesn't mean there's not value to be gained from systems that can help you. Right. I always appreciate those, those machine learning papers that I'll like, you know, there'll be show the tracking of over time of like how the models have gotten better and better. And they put the human in there and you can see that the human has already gotten eclipsed by the, by the models. And that specific problem, right?

**[58:42]** Because it's not also recognizing that a lot of this stuff, these models that are doing tasks are doing one specific task. They're not doing a whole job. They're not, they're not doing an end to end process. They're answering a medical question or they're, you know, looking at an image and finding all the cats or whatever it's supposed to do. So, and to your point though, you know, humans aren't perfect at these tasks either. I think mostly people are going to be using this kind of stuff to help them come up with these answers.

**[59:06]** Right. The, my weird Amazon description example is going to be the edge case, not the go-to like. Agreed. Yeah. You came in, you spoke to the chat bot. Here's your diagnosis.

**[59:16]** Have a good day. Right. Not so much more like, I need some help thinking through this. What are some of historic, what are some studies that have like addressed this? Right. And like those kinds of questions.

**[59:25]** And I hesitate to say it's just a better search engine because that's, I actually think it's got way more potential than that. I agree. It's a conversation. It can iterate back and forth. And what I'm actually trying to do is build some state into it. Right.

**[59:37]** Some, some structured way of kind of remembering what the conversation was and using a lot of the techniques that these large language models are good at to actually, to make that actually happen. And so that you can actually build a system so that the human and the assistant and the backend all kind of know what the other party is thinking about and that they all work together. Nice. For your genomics custom GPT thing that you're making internally, is that going to become a product eventually? If other people are interested, is there some way they can keep tabs on it or is it just internal only? Definitely reach out to me.

**[01:00:09]** So we're building different versions of GPTs. Like we're going to have a GPT for our curation team that curates knowledge and we're building a GPT that, you know, my hope is that it'll go to physicians, to oncologists and genomic counselors and other providers that could actually use this thing. Eventually, if it becomes robust enough and stable enough, and I don't feel like we're doing a disservice, we could certainly make a version of that available for cancer patients as well. I would, you know, I'd love to have that. I just want to make sure that it's done in a responsible way. Yeah, absolutely.

**[01:00:37]** Well, I honestly hope that you actually do such a good job that we don't have to have cancer research anymore, but that's a long, long term goal, right? That is definitely the end goal. And that's really exciting too. So is that the new drugs that are coming out, new treatments that are coming out, it's really just about making sure people are aware of it, making sure that they're getting the genetic testing that they need, right? So if you have a loved one that has, unfortunately has cancer, make sure that they're at least asking their doctor the question about genomic testing to make sure that they're getting the best possible treatment. Sounds good.

### Library Recommendations and Wrap Up

**[01:01:09]** All right. Well, quickly, before we get out of here, recommendation on some libraries, some project that maybe we haven't talked about yet. Something came across, people were like, oh, this would be awesome. We ran out of time. I was going to talk about some of these Pydantic projects. So there's Marvin, Instructor, and Outlines.

**[01:01:24]** So folks should definitely look at those. So basically what you do is you can describe stuff as Pydantic, and then it'll actually just extract it right into that Pydantic model for you. And that's some Marvin and Outlines and Instructor. So check those guys out. They're awesome. And then the other one that I actually had teed up was VisiCalc.

**[01:01:41]** So VisiCalc is like this crazy command line tool. It's awesome. You can basically look at giant CSV files all on the command line. It has these hotkeys that you can do. And it's, sorry, not VisiCalc, VisiData. VisiData, okay.

**[01:01:54]** And so basically it's just, it's basically Excel inside your terminal. And this was before Rich and Textual Project. And it was just like, it was kind of mind-blowing all the stuff that this person was able to figure out how to make work. That's super amazing. I just wanted to give a shout out one more thing because your VisiData reminded me of something I just came across called BTOP. I don't know if you have servers out there and they need to know what's going on with their server.

**[01:02:18]** Where's mine? I need a picture for this. But yeah, it's like a nice visualization. There's also B-HITOP. It's pretty amazing what people can do in the terminal, right? Oh, there they are.

**[01:02:29]** They're just responsive design themselves out. But yeah, if you want a bunch of live graphs. Every time I see stuff like this, the VisiData or this or what textual folks are working on, it's just like, I can't believe they built this, right? Like, I'm working at the level of colorama. This string is red right here. They're like, oh, yeah, we rebuilt it.

**[01:02:47]** I got an emoji to show up, right? I'm excited. Yes, exactly. Yes. A rocket ship is there, not just tech. Yeah.

**[01:02:54]** Pretty excellent. All right. Well, Ian, thank you for being here. And keep up the good work. I know so many people are using LLMs, but not that many people are creating LLMs. And as developers, you know, we love to create things.

**[01:03:08]** We already have the tools to do it. People can check out your GitHub repo on the PyPI and GPT and use it as a starting place, right? Sounds great. Yeah. And definitely reach out if you have any questions. Excellent.

**[01:03:19]** Well, thanks for coming back on the show. See you later. Great. Good to talk to you. Bye-bye. Yeah, you bet.

**[01:03:23]** Bye. This has been another episode of Talk Python To Me. Thank you to our sponsors. Be sure to check out what they're offering. It really helps support the show. Take some stress out of your life.

**[01:03:34]** Get notified immediately about errors and performance issues in your web or mobile applications with Sentry. Just visit talkpython.fm/sentry and get started for free. And be sure to use the promo code TALKPYTHON, all one word. It's time to stop asking relational databases to do more than they were made for and simplify complex data models with graphs. Check out the sample FastAPI project and see what Neo4j, a native graph database, can do for you. Find out more at talkpython.fm/Neo4j.

**[01:04:09]** Want to level up your Python? Want to level up your Python? We have one of the largest catalogs of Python video courses over at Talk Python. Our content ranges from true beginners to deeply advanced topics like memory and async. And best of all, there's not a subscription in sight. Check it out for yourself at training.talkpython.fm.

**[01:04:25]** Be sure to subscribe to the show. Open your favorite podcast app and search for Python. We should be right at the top. You can also find the iTunes feed at /itunes, the Google Play feed at /play, and the direct RSS feed at /rss on talkpython.fm. We're live streaming most of our recordings these days.

**[01:04:43]** If you want to be part of the show and have your comments featured on the air, be sure to subscribe to our YouTube channel at talkpython.fm/youtube. This is your host, Michael Kennedy. Thanks so much for listening. I really appreciate it. Now get out there and write some Python code.

**[01:04:58]** I'll see you next time.
