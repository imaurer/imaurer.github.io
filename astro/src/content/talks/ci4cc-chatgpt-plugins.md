---
title: "Grounding Medical Q&A using ChatGPT Plugins and Knowledge Graphs"
description: "A 2023 CI4CC community-call talk on why language models hallucinate on medical questions and how a curated knowledge graph, connected through ChatGPT plugins, grounds their answers."
date: 2023-06-19
category: agents
tags: [knowledge-graphs, llm, chatgpt-plugins, precision-oncology]
event: "CI4CC Community Call"
eventDate: 2023-06-19
youtubeId: PwbQb9rvXbg
summary: |
  Ian gave this talk to the Cancer Informatics for Cancer Centers (CI4CC) community in June 2023, three months after ChatGPT plugins launched. The topic is medical question answering. He explains why language models hallucinate on medical questions. They predict what an answer should sound like. They do not know when they do not know. They are not databases, and training freezes their knowledge at a cutoff date.

  He surveys the grounding strategies of the moment. NYU fine-tuned a small model on its own clinical notes. LangChain enriches prompts with vector similarity search and document compression. He also separates models from code. Python answered a simple math question about 118,000 times faster than GPT-4, so use code when you can codify the answer and a model when you cannot. Knowledge graphs hold the codifiable side for medicine. GenomOncology curators maintain one with a full audit trail behind every assertion.

  The demo connects ChatGPT to that knowledge graph through a plugin. Ian describes the API endpoints, fields, and responses in plain English, and ChatGPT reads the OpenAPI spec and calls them. The plugin annotates a VCF file, answers an FDA-approval question for BRAF V600E melanoma with source URLs, and breaks down a Genie patient cohort through Metabase. He then asks the same questions without the plugin. ChatGPT confuses stage III melanoma with metastatic melanoma and admits its knowledge cutoff.

  The closing section covers prompt injection, read-only tool access, human-in-the-loop review, OpenAI function calling, and the open-source model wave from the Hugging Face leaderboard to llama.cpp. He predicts capable models running behind hospital firewalls and asks cancer-center researchers to collaborate on grounded medical question answering.
takeaways:
  - "Language models predict what an answer should sound like. They fail to communicate uncertainty, and they are not databases."
  - "Grounding options in mid-2023: fine-tuning on institutional data, prompt enrichment with vector search, and tool use through plugins."
  - "Code beats models when the answer can be codified. Python answered a math question about 118,000 times faster than GPT-4."
  - "Knowledge graphs hold curated, auditable facts with an audit trail. Trustworthy AI pairs them with language models."
  - "English is the programming language of a plugin API. The endpoint and field descriptions in the OpenAPI spec steer the model."
  - "Without the plugin, ChatGPT confused stage III melanoma with metastatic melanoma. With it, answers carried source URLs from the knowledge base."
  - "Prompt injection was already a real risk in mid-2023. Keep tool access read-only and keep a human in the loop for dangerous actions."
chapters:
  - { time: "00:00", label: "Introduction and GenomOncology" }
  - { time: "01:32", label: "What medical QA is" }
  - { time: "03:47", label: "Hallucinations and why they happen" }
  - { time: "07:45", label: "Grounding strategies" }
  - { time: "11:16", label: "Models versus code" }
  - { time: "13:03", label: "Knowledge graphs" }
  - { time: "16:43", label: "ChatGPT plugins" }
  - { time: "18:25", label: "Demo of the knowledge graph plugin" }
  - { time: "26:24", label: "What the model does without plugins" }
  - { time: "30:40", label: "Closing thoughts on security and open models" }
  - { time: "33:52", label: "Next steps and collaboration" }
---

> This transcript comes from YouTube auto-captions, lightly grouped into paragraphs; expect missing punctuation and mis-heard words.

### Introduction and GenomOncology

**[00:00]** thank you I'm going to be talking today about grounding medical q a using chair gbt plugins and knowledge graphs before I get started a little bit about myself I'm Ian Moore I'm the chief technology officer for genome oncology genome oncology was founded in 2012 in Cleveland Ohio we serve over 40 clients including 17 NTI designated cancer centers our software is installed on premise or in private Cloud installations we're HIPAA compliant we don't take data rights meaning we don't package and resell patient data and when

**[00:31]** vendor agnostic meaning we work with a variety of devices and partners to help our clients with their clinical genomic data and using that data to match patients to clinical trials and Therapies of which is really the major challenge that our software solves right the number of biomarker-based clinical trials and FDA approvals and nccm guidelines and European guidelines are growing at a very fast rate uh software and knowledge base solves this problem for our clients by

**[01:06]** constantly curating this information and keeping it up to date and delivering it to our clients so that they can use this information to best help their patients uh for today I'm going to be talking about medical q a what it is hallucinations if you're not familiar with that term grounding strategies for reducing the number of hallucinations a quick uh commercial about models versus code knowledge graphs then chat plugins themselves if you're not familiar a demo and some closing thoughts

### What medical QA is

**[01:32]** so first what's medical q a so medical q a is a benchmark that's out there in data set that folks use to test models whether it's large language models or what have you to see how effective they are at answering medical questions uh one of the recent models is Palm 2 there's a med Palm 2 version of that that scored very well on the on this medical q a data set and Benchmark and then uh the group that uh openai and Microsoft I believe followed up with a chat GPT 4 version of it or gbt4 version of it and they demonstrated a you know

**[02:13]** on par performance and they pointed out they did you know kind of less tweaking to the actual calls but those tweaks right what providing Ned Palm 2 with additional information doing additional API calls and things like that that's those are grounding strategies so grounding is is what I'm going to be talking about which is you know how do we help these large language models perform better and reduce hallucinations another Gap though within large language models is that they don't have they're not a database right so one of the

**[02:45]** things that uh in the clinical genomics space is we deal with a lot of databases for genomics and genes and really other large sets of data there's a very clever paper called Gene Turing where they you know created a bench another Benchmark for asking large language models questions about genes and and things about DNA and genomics and you'll notice that you know they they don't do that well on things like snip and DNA alignment and the reason being is that Snips if you're not familiar with it are there's basically a database of IDs

**[03:20]** identifying different mutations in the human genome and you'll notice here our rs143 Etc that's you know 1.4 billion so there's a lot of a lot of these types of identifiers and things like that and since you know gpt4 is not a database it's not going to have all that information at the ready and and this is where I think like a Knowledge Graph can can help augment large language models performance

### Hallucinations and why they happen

**[03:47]** so first what are hallucinations right so you know one thing that you know folks like to say about GPT technology is that they're not you know telling the truth or lying they're and they're not because they don't actually know what necessarily the truth is but they're and what they're really good at is actually saying what the answer should sound like not actually what the answer is and this is a nice article by Rodney Brooks who's a themed roboticist in the field and then you know in the popular culture

**[04:18]** we saw a New York Times article where you know chechibiti was being used by a lawyer and you know had a bunch of citations in it that were basically non-existent and those are basically hallucinations so you know chat GPT at times will will be very confident in its assertions and and statements of fact when you know in fact it's actually hallucinating and that's something that folks need to be aware of so why do these llms hallucinate and llm stands for large language model is because they you know they struggle with

**[04:49]** ambiguous queries but more importantly they often fail to communicate their uncertainty right they don't know when they don't know something um under the covers there's actually prediction scores that are happening those might be tapped to make their responses you know couched a little bit better in the future I think that that'll be an interesting approach they have a limited understanding and reasoning right so this is a big debate right do they actually understand do they actually reason my assertion is

**[05:16]** that they don't they're the great at word prediction they're amazingly valuable tool I use them every day for software development and other purposes but I don't I don't believe they understand or Reason uh they they have limited training uh data limitations right so they're not they're Corpus of data collected from the internet and books and and other sources they don't have uh full databases you know when specialized Fields like genomics and they can't update their knowledge right so the training uh exercise is really

**[05:47]** where most of the knowledge is baked into the system and that happens once and then from there they do fine-tuning and other you know rhlf and other approaches to make the chatbot uh more usable commercialable product but that process is so expensive that they can't keep it keep up to date up to date over time uh there's no real-time interaction right so large language models can't interact with real-time live data um and you know by by themselves right now but I'm gonna actually be talking

**[06:18]** about plugins and plugins will actually alleviate some of this uh the verification and Source attribution so they don't actually have uh references directly inside of them they will generate a reference and if it's a common reference or something that's been you know written about a lot on the internet then it'll do a great job of citing that and then the last thing is really the context Windows right and what a context window is is basically a set of tokens in memory and so you'll notice that if you're working with a uh

**[06:47]** you know chat gpta or one of these large language models you'll notice that it'll start to lose the thread of a conversation once it gets past a certain number of words this number of words is growing right so gbt three had only 2.7 a thousand words roughly that it could support and then just put GPT 3.5 just came out with um their 16k tokens and a token is about 0.7 um sorry a word is about 0.75 tokens so that means it's about 22 000 words that GPT 3.5 uh the 60 DK version print

**[07:19]** support and then there's clawed by another large language model uh company called intropic that supports 100 000 tokens and the nice thing is this this number will keep increasing and that's and that's helpful uh in fighting hallucinations because it won't lose the thread as much when it's having a conversation but more importantly you can then use groundnut more grounding strategies where you're providing more information in context uh when you're asking questions and so let's talk about

### Grounding strategies

**[07:45]** routing strategies so you know the first grounding strategy that folks are aware of is you know pre-training and fine-tuning right so what you're trying to do is actually bake the information directly into the model and you do that by having you know either label data sets like this NYU solution is taking technical notes and I actually believe they're actually using this you know unsupervised learning of masking and things like that so it's not necessarily labeled data they're taking their own internal data running it

**[08:14]** through a pre-trading algorithm and then fine-tuning it off of that with some with some test specific labels and once again this is a great way of kind of baking knowledge in making your model more domain specific and therefore it will do better in that narrower domain and they're they're getting getting great improvements on accuracy using you know a much smaller model than chat gbt I think that's 109 million parameter model out of NYU so that's one approach to grounding but it's you know fairly expensive and and

**[08:48]** it might not be reusable by outside of NYU either for you know generalizability reasons right meaning it won't work at a different institution or also they might not be able to release it because they might have HIPAA data baked into it it might leak HIPAA data you know lots of things to be you know to understand before you make the make decisions like sharing a model like this another approach is prompt engineering right a common one is you know it's called enrichment and one of the techniques that do that enrichment is

**[09:20]** using similarity search so what happens is you store a Corpus of data you do what's called tokenization Vector you know embeddings off of those tokens and those those embeddings get sort of in a vector database and then what you're able to do is is ask questions embed the questions or convert the question into a set of numbers effectively a vector of numbers and then you can use those Vector of numbers to to retrieve similar documents and then you use those similar documents to then

**[09:52]** put context into the prompt before asking your question and what this does is it just allows the llm to to have more context and and hopefully respond in a more intelligent way and then there's a newer technique of this both of these are from the line chain project which is a very popular open source project but instead of just bringing back all the documents and and sticking the whole thing inside the prompt they're actually doing what's called doc compression and really this is basically asking the question twice right so they

**[10:24]** ask the question once the retrieve similar information relevant information and then they use the question to then kind of reduce the amount of the amount of text actually needed compressing it to actually populate the prompt right because the question itself can kind of filter down the paragraphs or chunks of text so once again another great rounding technique for you know hopefully making your llm hallucinate less and there's lots of great you know technologies that are out there this

**[10:53]** slide you know might be useful to you if you weren't getting started with looking at Technologies llama index is a great way of kind of interacting with different Vector stores and and they have some very uh great ways of chunking their data and looking at data in a way that's a little bit more sophisticated than than just splitting things up by you know paragraphs and text

### Models versus code

**[11:16]** so you know that's some grounding strategies uh and one other thing that I wanted to point out was models versus code right first if you if you were to take gpt4 and ask it a question like what is five plus five it's gonna get the answer right now it might not get the answer right if you take two five digit numbers and multiply them together um so that's that's kind of the one of the negatives of these tools is that they're not calculators right in this case they're not a numeric

**[11:44]** calculator but instead you know when I came back with the answer and came back in two seconds and then but if you were to ask Python and just say hey what's five plus five it would come back with 10 obviously and and it would be in 16 microseconds so I then asked you know how much faster is that it's 118 000 times faster to just ask python than it is to pass gpt4 and while this seems obvious the point of this is code is better when you actually know the answer right when you can actually codify it we

**[12:12]** use large language models because they're more generalizable and they and they're you know able to do things that you know with where writing code might be very difficult to do so use the tools that are best suited for the job and you know understand the fundamental difference between models and code right so models are statistical they're scalable and they're probabilistic though and they and their predictions and probabilistic just means you know you're not going to always get the same answer well code on the other hand is

**[12:42]** computable scalable deterministic and it's a calculation and so the scale the statistical model is scalable but it's going to be 10 to 100 000 times more expensive as we just saw and you probably want deterministic for for answers if possible right so just once again understand the difference between uh what a model brings you and what who it brings you

### Knowledge graphs

**[13:03]** so then let's get to knowledge graphs what are knowledge graphs so here's a quote from one of the team members on the Google Knowledge Graph team from a presentation I saw recently on on YouTube and then you know basically says you could machine learn Obama's birthplace every time you need it but it costs a lot and you're never sure it's correct right meaning you can keep trying to train a model all these types of facts uh you know by feeding in Triplets of information like you know what is Barack Barack Obama birthplace

**[13:32]** Honolulu but you know more effectively is you know that's stored in something like a Knowledge Graph what is a Knowledge Graph so Knowledge Graph is basically a set of entities and their relationships uh you know some are represented by what are called triples right so uh cows eat herbs right and so you know that's subject object predicate right so that's what you know makes up a Knowledge Graph and folks you know also refer to this as good old-fashioned artificial intelligence or symbolic AI where rules and logic are explicitly

**[14:05]** programmed into the system and you know neurosembolic AI there's Wikipedia page on this you know and it really breaks down the idea of maybe you know mirroring the human intelligence right whether system one and system two this is a great book called thinking past and slow by Daniel Kahneman and basically system one is a fast automatic intuitive and unconscious uh uh model and and it's used for patent pattern recognition right so this might represent what deep learning brings to to Bear while system two is slower step

**[14:37]** by step and explicit and that represents planning deduction and deliberate thinking right and I that's the reasoning that you get from a symbolic AI like a knowledge graph and so here's a quote from my tongue from diffbot and so they have a knowledge wrap that's that's their product and and basically I believe I agree with this quote right so future of trustworthy AI is the Synergy of these two things right knowledge graphs and large language models here's his approach that he described basically

**[15:07]** taking a query enriching it with the knowledge graph so this would be you know bringing bringing back additional information sort of like that prompt engineering uh Concepts from earlier you send it through the llm we're saying Transformer here because that's the underlying technology and then you've been validate the with the knowledge ref how you actually implement this is not you know specified in this blog article from what I remember but I think it is a good high level approach and then just recently I think two or

**[15:34]** three days ago I saw a new paper um unifying large language models and this does a great job of kind of breaking down the differences between large language models and knowledge graphs what you know what their strength relative strengths and weaknesses are to each other right so a knowledge graph is good at general you know is good at the you know handling structured knowledge and accuracy while a large language model is better at general knowledge and language processing and generalizability right and then they each have their own

**[16:01]** cons as well right so the cons of larger language models we talked about hallucinations and the fact that it's a black box because we actually don't know why the answer is that it says says What It Is Well knowledge graphs on the other hand you can actually point to a fact in a database or or a neo4j like a graph database you actually point to it and and show you know where that piece of information come from and and who created it in a system like ours where we actually have curators and those curators are continuously updating

**[16:32]** our knowledge graph and and there's a full audit Trail in history to every piece of knowledge in it and then here's an example of like an architecture where they're showing you know large language models and knowledge graphs working together

### ChatGPT plugins

**[16:43]** so chatgpt and its plug-in system is what I'm talking about next so what are chat GPT plugins right so there was a paper called tool former that's a great paper to check out and basically it describes the idea of giving large language models tools to use um so that they can actually you know solve problems like you know complex math questions or or things like that and then chat GPT plugins came out very soon after this paper so they must have been working on it before this paper

**[17:11]** came out and really and that's what we're going to talk about now so there's a plug-in store so this is available I was on the waiting list and got approved a few weeks ago but I believe this is rolled out to everybody at least with those who have the professional edition of jet GPT and there's lots of great tools so you can see here that I've got a couple around reading PDFs um and you know and Wolfram Alpha was kind of the first plugin that I kind of deep dived on and that's a great example of of a symbolic AI system that

**[17:41]** complements chechypt really well because this thing actually knows the distance between Tokyo and Cleveland under or whatever you're trying to figure out and then you know one example of using um ask your PDF which is a plugin that I really like that you can read the PDF and then respond to questions about those PDFs so you know I asked that about another paper about biomedical knowledge graphs that are coming out you know a week or so ago as well and you know it can read the paper it can understand your question and then it can

**[18:15]** ask the question using the context of the paper itself and so you can see here that describes the fact that knowledge graphs can enhance large language models Etc

### Demo of the knowledge graph plugin

**[18:25]** so now I'm going to do a demo of precision oncology the our knowledge graph and Knowledge Graph plugin uh let's see so so first a little bit about genome oncology and our knowledge graph so we have our set of ontologies right so things like genes from hgnc transcripts from the universal transcript archive diseases Etc these are all the building blocks or concepts that are related to each other right so diseases for instance is a very complicated ontology because you know

**[18:55]** there's parents and children and there's you know disease sight and disease histology and those and those ontologies are then used along with varying interpretations and and it's very variant annotations to then create what are called assertions so we have clinical trials and I have things like prior interventions there's complex eligibility criteria for these clinical trials our team is hand coding the eligibility criteria by both biomarkers and diseases to then basically curate what who's eligible or ineligible for a

**[19:30]** given clinical trial we do the same thing for FDA approved therapies and CCM guidelines breakthrough therapies priority review therapies European guidelines and a variety of other data sources so we curate all this knowledge and it's really the intersection of these ontologies along with some logic Boolean logically annuals and nuns and then we are exposed that Knowledge Graph with a series of apis so the first API you know is our match API and it takes in the patient's demographic information disease and Stage age gender

**[20:03]** zip code any multi-ohmic results and then prior interventions and then asks to interpret that and then match it and then choosing our knowledge graph we can then also integrate with our clients and their systems to do any filtering and augmentation of that information you know for instance clients have clinical trial Management systems that are more up to date than clinicaltrials.gov this in this information get augmented and used to provide more real up-to-date information then the recommendations come out the

**[20:33]** other end which include you know interpreting variants recommending therapies or guidelines trials nextbest tests diagnostic prognostic or clinical pathways and that information then gets filtered down to our user interfaces and workflows and and then also to integrate it to our clients ehrs and and their other systems and so to develop a plug-in the first step is you have to kind of have be approved on the waiting list and then you're gonna when I was developing and I used localhost and that's what

**[21:03]** this demo is actually is so so our plugin is not on the plugin store right now uh one of the key things we're trying to do is find Partners folks that are you know looking to investigate this this domain and and work with us because I don't I don't believe this type of solution is ready for prime time but you know with a solution like ours I think we can do some great research so I'm looking for um you know key leaders and and researchers that are looking to to work in this field so you know give it given

**[21:33]** a local host you then configure what's called a manifest file and the Manifest file points to your open you know your open API specification it's also called Swagger and this is what the the Swagger UI looks like or the open API user interface looks like when you're you know exploring your API and so let's do ahead go ahead and do a demo um so first here's here's what the plugin looks like this is a very trimmed down version of our API just to not confuse chat GPT at this point but we're going to be calling this thing the the

**[22:08]** main thing to point out is you know certain things are not read by judge EBT so I actually put a note there to remind myself but basically what the the main programming language here is English so I built this API uh kind of plug-in API it's basically a proxy to our full API and the main thing I did was really think through the English that I used to describe both the endpoints the fields and then the actual responses right so this is kind of a boring response so let's look at a more complex one so for instance you know getting a therapy back

**[22:41]** includes you know a list of diseases list of biomarkers assertion types that we're interested in sources that we're interested in but then here comes the response the response looks like this but then there's a schema and the schema is actually where I'm describing the specific fields and values that um that are you know being represented by our API and their responses so reads this document and then is able to respond to it so I now have my plugins turned on so if you were to you know open up chatgpt you can then turn on

**[23:16]** your plugins and you can then choose one I I haven't I have this one currently turned on the chatgpt one and let's go ahead and start asking some questions so the first question I'm going to ask is variant interpretation so let's see here so I'm going to take a VCF file and ask it to annotate and um interpret it so annotating is basically meaning read the read the specific lines of this file a BCF file is a genomics file it gets outputted by a tool called a variant caller the

**[23:55]** variant caller happens by um you know a device maker like a Illumina has their own bearing collars and things like that now what our system is doing is what's called tertiary analysis which is annotating it annotating the variants that came out you can see here here's what the query looks like so the query is it figured out what the pattern should be so I describe the pattern in my API spec it determined that based on the VCF file what the chromosomes start ref and all toward they then pipe delimited them for

**[24:26]** them for them just like I asked it to and then it posted it to our our API and got the response it's then taking this response and then understanding it and then re-generating it and you can see here that it's it's going ahead and providing information including you know information around classification why the classification happened all this is coming from the genome oncology knowledge base so I'm going to go ahead and stop it because we can't have multiple chats at the same time all

**[24:56]** right so let's go ahead and stop there and let's ask the next question so the next question I have is FDA approval so let's go ahead and ask it what if the approvals are there for BRP 600D melanoma patients so once again this is going to figure out from our schema of our open API what the interesting elements are the data elements are and then it's going to post it now our system can handle you know disease mapping to our system it can parse

**[25:31]** variants from different formats it can you know understand things like FDA approvals so what it did it asked a question um basically by tracking out the three entities and then it it passed the question and then received back the answers now the powerful thing here is that it also has the the URLs so our information provides you know everything that our in our system from an assertion perspective we encode URLs into that uh assertion for therapies and then that URL is then provided to chatpt so that

**[26:03]** it can actually include it in its response and that's really powerful because people want to see the the underlying information so they trust it and so we can see you know this is the FDA insert that was included for that particular that particular drug and it's going to keep you know writing and responding but we'll pause there and go to the next question

### What the model does without plugins

**[26:24]** all right so one thing to look at is how does this thing Act without plugins right so for instance this PCF file when I posted the VCF file it got the response back notice that you know vcfl it understands that it's a VCF file it you know understands that what's actually in it from a numbers perspective but it doesn't have any of the actual annotations and it doesn't have any of the interpretation it's just you know the structure of the file and the specific values that are in there without any any judgment that's because

**[26:55]** the knowledge graph is where all that information lives you can't it's not baked into the chatgpt model and then once again same thing with FDA approves you're gonna get you're going to get some answer um and but notice here I'm asking about stage three melanoma specifically and in this case uh it responds back saying hey truthfully I you know anything before after September 2021 I'm not going to know about it and it gives me answers but then I said you know why you're actually showing me therapies for

**[27:24]** metastatic melanoma and it says oh I apologize for the confusion you're correct stage three is not the same as as metastatic melanoma and so this is a this is a case where it's hallucinating right it's not a bad hallucination these are actually FDA approved therapies it's just they don't make sense in the context of stage three and these are some of the subtle um you know pieces of information that's that's necessary for you know getting the right response back and that's really where you want something like a

**[27:49]** knowledge wrap to support you um you know and there's there's more examples of of questions that I asked why is this are you sure that this is actually approved for an adjuvant therapy and things like that so uh and then another question that I could ask is you know what three trials are available strategic which is a you know very promising uh checkpointed checkpoint uh Gene that hopefully will have a drug before and and be able to combine as another checkpoint inhibitor and notice that it can't

**[28:19]** give you a lookup of the clinical trials database if you were to actually use our our knowledge base and our API um and hook it up to that GPT plugins it would you know work just fine so let's ask one more question of chat GPT and we're going to ask a breakdown of patients with non-smallow cellular carcinoma and egfrx 19 deletion so non-small cellular carcinoma is a disease type in our database it's a parent disease type that has multiple children child diseases and

**[28:52]** then egfrx on 19 deletion which is a biomarker from our enviromarker Bridge proprietary capability this is a break this is querying our knowledge base uh with a loaded open source data set called Genie and you can see here that it's doing a breakdown by disease type first you can see lumbino carcinoma which is a type of non-spawn cellular carcinoma I had the most patients and then you can see breakdown by gender and by rates and you can see the total number of patients is 1623 this is actually integrated to a local version

**[29:27]** of metabase which is a open source bi tool and so here we can actually show the integration to another system in this case it could be any kind of bi tool power bi or uh Tableau or whatever your you know institution has but this is a look at a clinical genomic database basically a database of patients data and uh their genomic data this is all de-identified and you know not not any Phi whatsoever but you can see here that it's got you know the breakdown of information and less visualizations so once again just

**[30:01]** another way of kind of integrating these tools together all using our knowledge graph to support those those Integrations and understanding of the information so that was the demo and so the the full demo of metabase is actually available on YouTube you can find that on the genome on College YouTube channel where I take the genie data and load it into an open source common data model called Odyssey or omop and then use metabase along with genome oncology SQL API which

**[30:34]** is a version of our knowledge graph to do those visualizations that I was just demonstrating

### Closing thoughts on security and open models

**[30:40]** so some closing thoughts first be aware of what are called prompt injections so this is not a very talked about problem yet but basically the idea is you can confuse these large language models into you know giving you erroneous information and when you hook them up to tools you know say sending gmails or you know sending zapier's apps or whatever they're called you could have some uh you could be opening up unwanted security holes so a couple things make sure your llms can't make irrevocable changes and take dangerous actions

**[31:14]** without a human in the loop that's critical and then my demo the knowledge graph was only using read-only data access my API and I'm using vocabulary terms and enum fields and other Technologies to really try to narrow down the amount of hallucinations or override ability somebody might have and and so it's opening up they're opening up security risks or whatnot another interesting thing capability is this function calling which I'm currently I see is kind of an inversion

**[31:46]** of the chat plugins capability which is rather than asking chat gbt to call your plugin you are telling gpt4 over the API about your functions what they what are available what tools you have available and then asking them questions or you know providing some information and then having the GPT model respond back here's how you would call your functions with the information that was provided and this is an example of you know what the weather in Boston right now where you know your breaks down the the information into the parameters that the

**[32:22]** function would accept and then use that information to call your API another thing to be aware of is that there's open source models right so hugging face has a leaderboard I'm dropping tracking these pretty closely mostly around controllability right do people want to be able to run these models locally be able to do fine tuning domain specific models this is a great great way to keep on top of that information also there's a project called gorilla which is you know it's very similar to

**[32:54]** chat GPT plugins where basically it's they've trained a model on on figuring out how to call apis based on the inputs provided to the large language model and then here's a video of another exciting project called llama CPP which is you know running locally on your on your on an M2 machine and you can see here how fast the tokens are so you know that's the speed is is comparable I would say to CPT chpt4 if not faster than that uh and the fact that it's you know running

**[33:30]** at 40 tokens per second is pretty pretty incredible now obviously the quality of llama at seven billion parameters is not you know not quite as good as even jet GPD 3.5 so um but there's lots of progress being made on this technology and I believe pretty soon we'll be you know running fairly significant large language models behind firewalls

### Next steps and collaboration

**[33:52]** so the next steps if you're not already on the plug-in development waiting list go ahead and join that you know it seems like the open AI is opening this stuff up to quite a few folks but if you're you know not on the waiting list that might be helpful if you're interested in developing this stuff and then also contact me so here's my email here's my LinkedIn I'm interested specifically in working with collaborators at cancer institutes mostly that are interested in using this stuff or at

**[34:22]** least doing research on how we could use large language models to do medical q a and using knowledge graphs to ground them that's my main focus I'm also interested in maybe creating a data set or a benchmark around this technique or capability specifically in Precision oncology but genomicology is also going to be expanding on Beyond cancer as well this year so please reach out and let me know if there's any anything we can collaborate on
