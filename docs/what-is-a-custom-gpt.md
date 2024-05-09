# What is a Custom GPT?
###### Jan 8, 2024

Custom GPTS are a configurable, shareable chat experience available to ChatGPT plus subscribers. Custom GPTs were [announced on November 6th, 2023](https://openai.com/blog/introducing-gpts) at their inaugural [Dev Day event](https://devday.openai.com/) and the [GPT Store was announced on January 10th, 2024.](https://openai.com/blog/introducing-the-gpt-store)

![what-is-a-custom-gpt.png](images%2Fwhat-is-a-custom-gpt.png)

In this article:

*   [What makes up a Custom GPT?](#what-makes-up-a-custom-gpt)
*   [Product Announcements Leading up to GPTs](#product-announcements-leading-up-to-custom-gpts)
*   [Key Benefits of GPTS](#key-benefits-of-custom-gpts)
*   [Key Risks of GPTS](#key-risks-of-custom-gpts)
*   [Why create a GPT?](#why-create-a-custom-gpt)
*   [Further Reading](#further-reading)

### What makes up a Custom GPT?

Custom GPTs have the following properties configurable by its creator directly in the [GPT Editor](https://chat.openai.com/gpts/editor):

*   Name
*   Logo
*   Description
*   Custom Instructions
*   Conversation Starters (max. 4)
*   Knowledge Retrieval
    *   Maximum 10 files
    *   Maximum 512MB per file
*   Optional Access to OpenAI "Capabilities":
    *   Web Browsing
    *   DALL-E Image Generation
    *   Code Interpreter
*   Actions
    *   Schema (via OpenAPI specification)
    *   Authentication Setup (OAuth or Token-based)
    *   Privacy Policy URL (for shared GPTs with Actions)
*   Sharing
    *   Publish: Only you, Anyone with Link, Everyone
    *   Public, Shareable URL for non-private GPTs

### Product Announcements Leading up to Custom GPTS

**ChatGPT Plugins** ([March 23, 2023](https://openai.com/blog/chatgpt-plugins)): Plugins allowed ChatGPT to call REST API endpoints which demonstrated a very powerful paradigm of language model "tool usage". Unfortunately, the discoverability and usability of plugins for both developers and users of plugins was subpar, leading to a [lack of product-market fit](https://matt-rickard.com/chatgpt-plugins-dont-have-pmf). Plugins have been refashioned as [Actions in GPTs](https://platform.openai.com/docs/actions).

**Code Interpreter** ([March 23, 2023](https://openai.com/blog/chatgpt-plugins#code-interpreter)): Originally released as a plugin, the code interpreter is a sandboxed version of the Python interpreter that enables the creation and running of scripts. Ideally suited as a low-code data analysis tool, it is still available as a GPT capability and as a standalone GPT called [Data Analyst](https://chat.openai.com/g/g-HMNcP6w7d-data-analyst).

**Web Browser** ([March 23, 2023](https://openai.com/blog/chatgpt-plugins#browsing)): Originally released as a plugin, this enabled ChatGPT to search the open web and bring back content for analysis. This capability remains in all standard chats, as a GPT capability and as a standalone GPT called [Web Browser](https://chat.openai.com/g/g-3w1rEXGE0-web-browser).

**ChatGPT app for iOS** ([May 18, 2023](https://openai.com/blog/introducing-the-chatgpt-app-for-ios)): The native ChatGPT app was released to iOS in May and rolling out to Android customers starting in July.

**Custom Instructions** ([July 20, 2023](https://openai.com/blog/custom-instructions-for-chatgpt)): Custom instructions allowed a user to provide information about themselves and direction on how they want the chatbot to respond. Originally released as a beta feature, they are now a core setting. In the announcement, it was casually mentioned that custom instructions could improve the experience working with plugins which appears to be a critical insight into the development of GPTS.

**See, Hear and Speak** ([September 25, 2023](https://openai.com/blog/chatgpt-can-now-see-hear-and-speak)): Powered by [GPT-4V(ision)](https://openai.com/research/gpt-4v-system-card) for seeing, [Whisper](https://openai.com/research/whisper) for hearing and [Text-to-Speech (TTS)](https://platform.openai.com/docs/guides/text-to-speech) for speaking, these multi-modality capabilities make the mobile experience especially feel much more powerful. Having a conversation your phone about pictures you take feels straight out of the [movie Her](https://www.imdb.com/title/tt1798709/).

**DALL-E 3** ([October 19, 2023](https://openai.com/blog/dall-e-3-is-now-available-in-chatgpt-plus-and-enterprise)): OpenAI's image generation model was embedded directly into ChatGPT. The model has been trained to not create images in the style of living artists and to not violate copyright. However, users quickly identified hacks to get around these safeguards.

**Assistants API** ([November 6, 2023](https://platform.openai.com/docs/assistants/overview)): Launched on Dev Day with GPTS, the Assistants API allows developers to create assistants within their own application. The API include threads for handling the context of a long conversation along with hosted knowledge for retrieval augmented generation (RAG). Assistants can also access the code interpreter and return function calling JSON responses.

**Actions** ([November 6, 2023](https://platform.openai.com/docs/actions)): OpenAI simplified and renamed Plugins as Actions and made them available within GPTs. Like Plugins, Actions are defined by an OpenAPI specification and support multiple authentication approaches. Actions can be declared to be "consequential" or not by the developer and this flag is used to inform the user before any consequential actions are taken.

**Custom GPTS** ([November 6, 2023](https://openai.com/blog/introducing-gpts)): Actions were then bundled into a shareable, re-usable "chat template" configured by Custom Instructions and augmented with the OpenAI tool suite of browsing, image generation, code interpreter, vision, speech recognition, and text-to-speech.

### Key Benefits of Custom GPTS

Some of the key benefits of the Custom GPTS over standard GPTs and Plugins.

*   Custom Instructions
    *   Available at the "chat template" level rather than global, account-level.
    *   Empowers user to switch model context without managing a system prompt library.
    *   Enables developer to direct model on how to best call a mix of custom Actions.
*   Sharable
    *   Custom GPTs can be private but also shared with via URL.
    *   OpenAI GPT store should drive discoverability and thus increase both demand and creation of higher quality GPTs.
*   Easy to Start
    *   No coding experience required to build a basic GPT without actions.
    *   Editor includes a chatbot where you can build the Custom GPT through conversation.
    *   DALL-E can generate a custom icon for your Custom GPT based on your name and description.
*   Cost Model
    *   No additional cost to developing and using Custom GPTs for ChatGPT plus subscribers.
    *   Unlike building a typical "AI application", there is no escalating usage-based fees.

### Key Risks of Custom GPTs

Here are some of the key risks I am considering with regards to building a Custom GPT:

*   Platform Risk
    *   Sherlocking: OpenAI could adopt your features into the platform.
    *   Exclusion: OpenAI could [ban your GPT](https://twitter.com/PatrickJBlum/status/1743699766620668401) for whatever reason.
    *   Abandonment: OpenAI could abandon this initiative if it doesn't achieve [product-market fit](https://web.archive.org/web/20230531203946/https://humanloop.com/blog/openai-plans).
*   Adversarial Prompting
    *   [Prompt Injection is still an unsolved problem](https://simonwillison.net/series/prompt-injection/).
        *   Don't build anything that takes non-revokable and consequential actions.
        *   Assume if your Action's API has valuable data and a security hole, someone will be able to convince the chatbot to exploit that hole.
    *   Anything uploaded to OpenAI currently can be downloaded by other users.
        *   Custom Instructions are easily extracted, there are [multiple](https://github.com/linexjlin/GPTs) [GitHub](https://github.com/lxfater/Awesome-GPTs?tab=readme-ov-file) [repositories](https://github.com/LouisShark/chatgpt_system_prompt) sharing the techniques and the actual prompts used by GPTs
        *   Knowledge files uploaded to Custom GPTs have reportable been directly downloaded and directly quoted directly in chat.
*   No Moat
    *   OpenAI, like the other large, centralized, frontier model providers may [have no moat](https://www.semianalysis.com/p/google-we-have-no-moat-and-neither).
    *   Algorithmic and data quality improvements discovered by open-source die hards will continue to chip away at lead that the frontier models started with in 2023.
    *   Small, decentralized, fine-tuned, open-source models that can run locally or even on-device may win due to their task-specific accuracy, cost/compute profiles and data sovereignty benefits.
*   LLM Reliability
    *   Building a product inside of an [autoregressive chatbot](https://www.linkedin.com/posts/yann-lecun_i-have-claimed-that-auto-regressive-llms-activity-7045908925660950528-hJGk/) is a fundamentally dubious proposition at this point given their current levels of reliability.
    *   GPT-4, the most capable model, hallucinates and is susceptible to [prompt injection](https://simonwillison.net/series/prompt-injection/).
    *   Improved models that hallucinate less may simply emit harder-to-detect errors that only benefit those with domain expertise in the first place.
    *   Frontier models may have plateaued in their capabilities due to scaling limits and/or costs of the current architecture.

### Why create a Custom GPT?

Given the above benefits and risks, there are still some risk-less opportunities to consider when trying to decide whether to create a GPT. To name a few:

**Task-specific, No-Code Custom GPT for Personal Use:** It's very easy to create a custom GPT tailored for a very specific problem. If you use the GPT a few times to solve a specific problem more efficiently, then there is a chance you will have broken even with your time investment.

**Retrieval Augmented Generation (RAG) Prototyping:** Developing a RAG-based application seems easy until you actually try it. If all your application does is split up documents into paragraphs, embeds them into a vector and uses cosine similarity to retrieve documents based on a question, then either it's not going to work or it wasn't a very difficult problem to begin with. Using GPTS to do a quick prototype might save you some time and it's a cheaper approach than having a developer build something with LangChain or LlamaIndex. It also doesn't cost anything to host the knowledge files unlike the Assistants API which costs 20 cents per GB per day. (Note: OpenAI has provided very little detail thus far about how knowledge chunking, indexing and retrieval actually works and if you have a more advanced use case, their current default approach probably won't help you much)

**Focus Effort on Actions:** Recognize that all of the information uploaded to OpenAI can be exfiltrated via prompt hacking. If you concentrate on creating value behind your API, then that value will be both controllable and transferrable to other products or projects. In the future, something like what people are calling "agents" will be a thing and those things will like to call APIs like yours to solve problems. Use GPTS to figure out how this might work for you in the future.

**Collect Users via Authentication:** Custom GPTs support authentication, which allows you to collect user information such as an email address. Gathering contact information of people interested in your (potential or actual) product and/or service is a no brainer.

**Plan an Open Source Migration:** There is [Dify.AI](https://dify.ai/), which has an [Apache 2.0 licensed code base on GitHub](https://github.com/langgenius/dify), and there will be others. So, if you build something cool and you want it to run on your infrastructure, using the models you control, then there will likely be a reasonable escape hatch if your time with OpenAI ends badly.

**Have Fun Learning Something New:** When nothing is left, chalk it up to learning something new and move on.

### Further Reading

Prior to the GPT Store, there were so many Custom GPT directories that someone has made [a list of Custom GPT lists](https://tailgram.com/GVWyZOBM).

Simon Willison's [posted about Custom GPTs the week after they were announced](https://arc.net/l/quote/qrgpehnf) and per usual his initial notes and perspective hold up extremely well. I want to disagree with his initial take which is that GPTs are "not much more than ChatGPT in a trench coat fancy wrapper for standard GPT-4 with some pre-baked prompts." Unfortunately, most of the GPTs I have played with fit this description exactly.

Just this weekend, [Bram Adams](https://twitter.com/_bramses) asked "[Are GPTs are websites?](https://www.bramadams.dev/issue-42/)" in his newsletter. His ideas around "Smart Forms", "Local Information Load Balancer" and GPTs being a "subject matter expert layer" are all interesting to me.

[Nick Dobos](https://twitter.com/NickADobos) of [Mind Goblin Studios](https://mindgoblinstudios.com/) has created the best developer GPT I have tried called [Grimoire](https://twitter.com/mindGoblinStdio) definitely worth playing with even if you are not a developer. Nick has shares some insightful tweets about his work.