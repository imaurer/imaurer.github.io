---
title: "Python in Biology and Genomics"
description: "Ian talks with Michael Kennedy about Python in cancer genomics. GenomOncology uses Django, spaCy, and AsyncIO to interpret genomic variants and match patients to trials and therapies. The episode walks through the biology in plain terms first."
date: 2018-03-07
category: bioinformatics
tags: [python, genomics, bioinformatics, django, asyncio]
event: "Talk Python To Me #154"
eventDate: 2018-03-07
episodeUrl: https://talkpython.fm/episodes/show/154/python-in-biology-and-genomics
summary: |
  Ian Maurer joins Michael Kennedy to talk about Python in cancer genomics. Ian leads development at GenomOncology in Cleveland. The company helps oncologists and pathologists interpret genomic variants, find clinical trials, and match patients to approved therapies.

  Ian walks through the biology in plain terms. The human genome holds about 3 billion base pairs across 23 pairs of chromosomes. Sequencing pipelines record only the differences from a reference genome. Cancer arises from mutations that break the signaling pathways inside cells.

  The conversation then covers the software stack. GenomOncology builds its knowledge management system on Django and Django REST Framework. The team uses spaCy to extract structured facts from free-text clinical notes, Bokeh for server-side plots, Click and Pex for command line tools, and AsyncIO with aiohttp for a high throughput annotation pipeline. Django Channels powers a shared tumor board application over WebSockets.

  The episode closes with Ian's open source libraries, related and rigor, and a preview of PyCon 2018 in Cleveland.
takeaways:
  - "Python replaced Perl across much of bioinformatics and now sits alongside R in that space."
  - "Sequencing costs fell from 3 billion dollars for the Human Genome Project to under a thousand dollars per genome."
  - "Pipelines store only the variants against a reference genome. An average person carries about 30 million variants."
  - "GenomOncology serves variant annotations and clinical trial matching through a Django REST Framework API."
  - "spaCy extracts entities from free-text clinical notes, and a human confirms every suggestion before it enters the record."
  - "One Python 3 process using AsyncIO and aiohttp kept pace with a multi-million dollar hardware sequencing pipeline."
  - "Pex bundles a command line tool with its dependencies into one runnable file for clients."
chapters:
  - { time: "00:00", label: "Introduction" }
  - { time: "01:44", label: "From Commodore 64 to Python" }
  - { time: "05:05", label: "GenomOncology and Cancer Genomics" }
  - { time: "09:42", label: "The Scale of Genomic Data" }
  - { time: "15:31", label: "The Sequencing Pipeline" }
  - { time: "18:43", label: "Variant Interpretation and Decision Support" }
  - { time: "20:45", label: "The Software Stack" }
  - { time: "27:17", label: "Natural Language Processing with spaCy" }
  - { time: "31:27", label: "Packaging CLI Tools with Click and Pex" }
  - { time: "33:45", label: "High Throughput Annotation with AsyncIO" }
  - { time: "37:09", label: "Django Channels and Tumor Boards" }
  - { time: "41:30", label: "Open Source Libraries" }
  - { time: "48:39", label: "PyCon in Cleveland" }
  - { time: "53:35", label: "Final Questions and Advice" }
---

### Introduction

**[00:00]** Python is often used in big data situations. One of the more personal sources of large data sets is our very own genetic code. Of course, as Python grows stronger in data science, it's finding its way into biology and genetics. In this episode, you'll meet Ian Maurer. He's working to help make cancer a thing of the past. We'll dig into how Python is part of that journey. This is Talk Python To Me, episode 154, recorded February 9th, 2018. Welcome to Talk Python To Me, a weekly podcast on Python, the language, the libraries, the ecosystem,

**[00:45]** and the personalities. This is your host, Michael Kennedy. Follow me on Twitter, where I'm @mkennedy. Keep up with the show and listen to past episodes at talkpython.fm, and follow the show on Twitter via at Talk Python. This episode is brought to you by Codacy. Learn how they make code reviews better by checking out what they're offering during their segment. Ian, welcome to Talk Python. Hi, Michael. Thanks for having me on. Yeah, I'm really glad to have you on to talk about Python and biology and genomics. These are two areas

**[01:13]** where I've wanted to do a show on for a long time, but just haven't managed to get the right stuff all lined up. So really excited to see how Python is playing a role here. And I think it's just another cool example of how Python is being used in all these really varied ways. Great. Yeah, it's really been taken off the last few years, and it's gone really well with what we're trying to get done at our company. Awesome. So let's dig into that. But first, let's hear your story. How'd you get into programming in

### From Commodore 64 to Python

**[01:44]** Python? Yeah, so I started programming when I was 13. My parents got me a Commodore 64. I started learning basic and trying to make my own games and things like that. I went to school for programming, computer engineering, learned a lot of C and Pascal even at the time to date myself a little. And after graduating, I worked at a defense contractor in their logistics department where we did some SGML and XML based tools for documentation of these complex systems that they

**[02:16]** have. And part of that was, you know, parsing of those files. And we actually were using this library that was built in Python. And I kind of fell in love because of the REPL, right? So being able to kind of open up the REPL and explore and play with the information right there was what hooked me. And ever since then, I've kind of been doing it as a hobby, hoping that it would kind of take off in the web space. And it did with, you know, Django and following on after Rails, but it just never worked out for me. I was always doing Java based development for, you know, e-commerce sites and other stuff that I've done.

**[02:48]** Java again? No. Yeah, always Java. So I was doing Java. I still like Java, still a good, still consider myself a good Java developer. When I joined my current company, we did a couple of small things in Python and, and then those kind of hooked, took off a little bit and we were able to, you know, kind of just double down and, and add some more features. And, and really since that time with bioinformatics and other stuff,

**[03:12]** we'll talk about, you know, Python's really taken off and actually made sense to, to really use it as, as one of our core languages for some of our products. Yeah, that's cool. So it's, it's finally like grown into this place where it's not just, oh, I'd like an excuse to use it, but it really makes sense, right? Yep. Exactly right. It actually solves the niche and it's really taken over actually for Perl in a lot of ways in, in the bioinformatics space. And, it kind of sits along with R and has really got a lot of mind

**[03:39]** share in the, you know, in this bioinformatics world. Yeah. There's probably some cool infographic of Perl, I'm sorry, R in Python, like duking it out over, you know, some sort of data science crown. I don't know what we'll see where that goes, but they're both doing really well. And it's, it's nice to see Python growing so quickly. I really think, you know, you look at the growth of Python, there's like this huge jump in its popularity. Like it's always been growing, which is kind of amazing, but it has this sort of inflection point where it grows faster around

**[04:08]** 2012, which I feel like is where the data science stuff really started to kick in for Python. Yeah. NumPy and scikit-learn and Jupyter, pandas, you know, some of these core, a lot, all the machine learning. Yeah. All the machine learning stuff, all those things really have just kind of gotten some mind share altogether. And it's really just, we're kind of riding that wave and it's, it's really great. And, and I, and I think you might've said this in one of your previous podcasts, but the fact that

**[04:31]** people who are in data science want to learn something that is a general purpose language too, that they could use to make themselves a little bit more marketable is, I think another, another kind of feather in the cap for Python over some of the other languages. Yeah, it definitely is. Awesome. So this, you know, sounds like a really interesting way of getting into it. So you went through the computer engineering perspective. Very nice. And I think maybe the first place to start this discussion really is to talk about the biology and, you know, your company and kind of the problem space that you guys are working in. So then we talk

### GenomOncology and Cancer Genomics

**[05:05]** about all the tools and the way Python solving the problems people know. So maybe tell us a bit about what you do day to day. Yep. So I lead development for a company called GenomOncology out in Cleveland. We'll talk more about Cleveland later, but so I lead our, you know, software design development, testing, and deployments were founded in 2012. And really that timing is important because really around 2011, some of the big NGS platforms, next generation sequencing platforms were, came out around there. So these are, these include things like the aluminum my seek and ion torrent. And why those are

**[05:37]** important is because the human genome project, which you might've heard of kind of wrapped up between 2000, 2003. When did that start? Like late nineties, mid nineties, late nineties. It took, it took a few years for sure. And, you know, it took about $3 billion to complete it. And that was basically just mapping a first draft kind of, of the, of the human genome. And, you know, that's really, it basically says, these are all the variants that, you know, quote unquote, a typical human is made up of. And that took about $3 billion to do. And now we're talking about, you know, less than a thousand dollars.

**[06:07]** And as that, you know, as the, you know, Moore's law applies to computer chips, right? There's kind of a Moore's law effect, but even I've read some, some analyses where it's like, it's even greater exponentially than Moore's law with these costs of genomics. It really is just driving the price down, which makes it a lot, allows us to apply these technologies for lots of different reasons. And the, you know, my favorite part obviously is the work that we're doing around helping people with cancer and helping use genomics to help people find clinical trials, find therapies,

**[06:37]** and hopefully improve their, their odds at, at fighting that disease. It's definitely one of the great challenges of our time. You know, it's, we've sort of solved the problems that, that were really bad for humanity to a large degree that, and now cancer is like, one of the major, major things that people have to, to deal with, right? It used to be, you might be hungry, you might be getting eaten by a wolf. Now, you know, you live, you live a long, healthy life until something, you know, you get some kind of bad news, right? And so how much is cancer

**[07:08]** a genetic problem versus other types of problems, right? You guys are building genetic tools. How's this all fit together? Caveat this by saying, I'm not, you know, a molecular pathologist. I'm not, you know, a bioinformatics person, but cancer is a, is a disease of the genome, right? So you have your genome, you know, 23 chromosomes, 23 pairs of chromosomes, you know, you're talking about, you know, chromosome one is got 2000 genes, you know, 250 million base pairs, right? That's the kind of the scope of the data that we have.

**[07:38]** And cancer is really mutations within that genome causing things to break down in a certain way, right? So, you know, one of the analogies, and there's a book called One Renegade Cell that we kind of make all of our new employees read, really walks you through, you know, the gas pedal, the sticky gas pedal and the cut break line. And basically what ends up happening is your cell, you know, if you were to cut, have a little cut on your finger, the cells around that cut would know to kind of multiply and grow and then cover over that cut. And then they know how to stop, which is really an amazing feat.

**[08:14]** It's actually unbelievable that the machine that is humans works or any form of animal, really. It's incredible. And it's all these individual cells and there's different signals throughout the cell and those signals are called pathways. And what ends up happening is those pathways stop working in some fundamental way. And the way that they're stop working is through mutations. And those mutations can occur due to, you know, some environmental factor like smoking or uv light or some other mechanism that

**[08:42]** causes that mutation to happen. And then from there, it ends up that one cell ends up growing and taking over the space of the other cells. So a lot of these drugs and therapies that are out there are looking, you know, some of these targeted personalized therapies are targeting those individual cells that are kind of going off, going rogue and bringing them back and, you know, getting rid of them so that the healthy cells can, can do their thing. And so, you know, our, our software, our company basically is in the business of helping people, helping oncologists, helping pathologists and other folks in the healthcare

**[09:20]** industry identify what these mutations are, figure out what they mean, and then help their patients get them on a clinical trial or prescribe them a therapy. Right. If you understand the actual genetics that's causing the problem, maybe there's a better, more focused sort of treatment, right? Exactly right. Yeah. So if you look at chromosomes, like we talk about big data all the time, right?

### The Scale of Genomic Data

**[09:42]** But I mean, there's only 23 pairs, so that's no big deal, but they're actually made up of a lot of stuff, right? So maybe like take us through the sort of big data store, just sort of the scale of the data, I guess a better way to put it around chromosomes and genetics. Yep. So there's, you know, 23 pairs of chromosomes and a quote unquote normal human being, right? And you have about 3 billion base pairs across all those chromosomes. So they, and they get labeled one to 22 and then X and Y for the sex chromosomes. But the 3 billion base pairs in the human genome, there's about 21,000,

**[10:16]** 24,000 of those are what we call genes. And genes are what are the actual thing that code to proteins. And proteins are the thing that actually make the whole system work. So the genes, the actual DNA part of it is the base pairs. And there's three base pairs, ACs, Gs, and Ts. Those go in pairs of three, you know, sets of three. If you remember from biology, those build out to become amino acids. And then the average person has about 30 million or so variants, 10%. So in one of the tricks that we do, obviously, in the space is we don't actually record all three, 3 billion base pairs. We just record, we just record the delta, just to make it, you know, a lot less data. And then the other part of making it a lot less data is, you know, focusing on specific genes, right? In cancer, you know, there's, depending on the disease type, there only might be three or four genes that matter, or maybe there's only 50 genes that matter. But in this pan cancer, across all the different types of cancers, there might be about 800 or 900 genes that matter. So, you know, our types of tests and sequencing that we do really focus in on those, those smaller regions to just kind of manage the data in a faster way. That collection of, you know, 3 billion base pairs, ACs, Gs, and Ts, those are, those are what are called the reference genome. And the reference genome is what everybody gets compared against, right?

**[11:33]** So when you're, do your, when sequencing is done on a tumor or on a, you know, a normal cell, the deltas, the variants are what it's actually captured and recorded. And we're actually recording it also in the context of what genes are there. So genes actually don't make up a huge amount of the genome. It's a very small portion of the genome that actually codes the proteins. Interesting. So is there like a bunch of basically instructions that are just off? They just don't go, they don't do anything? They call it junk DNA. Now they don't necessarily, it doesn't necessarily mean it is junk. It's just not necessarily known at this time, or it doesn't, it doesn't code to protein, but maybe it does other things. Like there's things called methylation and these other factors that affect the coding parts of it. And there's lots of theories of, of how that happens. Some of it's through evolution and, and pieces just kind of fall out and don't actually matter anymore in the human species. But there's other, other theories that maybe some of it isn't junk as well. And then even within the exon, even within the genes themselves, there's exons and introns. So the exons are these, these strings within the gene that actually get, you know, sliced out and turned into the RNA. And then that goes and codes the protein.

**[12:44]** And then the other part's called introns. The introns are the parts in between each of the exons. So understanding how the whole map works, understanding how to sequence the data, get the data off the sequencer and, and then keeping track of all that data is, is interesting. And, and one of the things that might be interesting to your, to your listeners, just because of the whole Python two, Python three thing is these reference transcripts get released over time. Right. So, and the one that's currently, you know, the main one that people use in the clinical setting is called GRCH 37. And that was released in February of 2009 and lots of tools and things were built off of this version of the reference genome. Well, over time they learn new things, they apply new regions. They, you know, it's, it's a very dynamic map. And then in 2013, right, eight, five years ago now, almost they released GRCH 38.

**[13:33]** The whole industry hasn't moved over to this new, this new version of the reference genome. So it's just the, because you got to update all your tools, update all your databases. And it's a, and it's a, it's a tricky thing to do. This major incompatibility. How interesting. So you talk about this reference genome and there's about 3 billion base pairs and make up a person. How much of that is consistent across every single person and how much of there's difference?

**[14:00]** Because, you know, I feel like we look at people, we all look quite varied, but then you also hear things like, well, your DNA is 1.5% different than say a chimpanzee or something like that. Right. So give me a sense for, you know, when you say I'm going to save the Delta, what does that look like? Usually an average person has, you know, about 10% variation from the 3 billion. So about 30 million base pairs will be different across different, different people. And, you know, it's obviously the numbers go up and down and there's prevalency frequencies, right? So a lot of these databases that are out there and available for, for people to consume as part of their process, they actually say, you know, we sampled a thousand people.

**[14:38]** And, you know, 20% of folks had a G in this spot and, you know, another percent had an A in that spot. So that's, that's a big part of just understanding what some of these variants are. And one of the things we do in our tools for cancer is that we'll, doctors are interested in that, that, that prevalency, that's that allele frequency. Because if the frequency is 50%, well, there's no way that that's actually a cancer causing variant because people would be born with cancer. And that just, it just doesn't really work that way. It wouldn't be a viable situation.

**[15:08]** So one of the data points they like to look at is how often does this variant actually happen in the, in the wild and, and actually in the human population. So it's a very interesting stat. Yeah, for sure. Okay. Interesting. So maybe let's talk about how do you actually do the sequencing at a high level that won't get into the tools and the Python code that you actually make, how that's working in there.

### The Sequencing Pipeline

**[15:31]** But give us the sort of overall pipe. Yeah. Give us the general pipeline. Like how do you go from, you know, a swab on the cheek or whatever it is to, here's your printout. You ACCGTAC is, is you. There's been older technologies that, you know, work in smaller regions and, and can do things like that.

**[15:51]** There's a thing called Sanger sequencing. But as I said earlier, one of the major changes is in 2011, they did this next generation sequencing. That basically takes raw data right from, from a blood sample or a tumor sample. They put it in this, this machine called the sequencer. And then through the, you know, either chemicals or, or, or lights of, of that actual machine. And once again, this is in my area of expertise.

**[16:15]** They're able to analyze it and basically do what are called reads. So they're doing, you know, 65 base pairs across or, or what have you and read out ACs, Gs and Ts and write that to a file. And that's written to a file called, you know, either a fast day file or a fast Q file, which has quality associated with it. So all these raw reads are happening and it's basically like little snippets of a book. And, but it's like a book that they, someone's cut up into little fragments and then kind of thrown it up in the air and then try to figure out how to reassemble it. So that process, yeah.

**[16:46]** So that process is not something we do at my company, but that process is what we call alignment. And we take that book and try to basically tape it together. And the way they do that is by trying to compare regions against the reference genome itself and through math and algorithms and, and some machine learning. Now they're able to kind of align the whole readout of the, of the reference genome. And those get stored into a file called a SAM file. And really it's just a, just a listing of all these different variants, but in a line format.

**[17:16]** And then those files can get compressed into what's called a BAM file. And then we, you know, there are tools that are open source and, and tools like ours that actually allow you to do visualization of that alignment and really get a good understanding of do the reads line up? Do the variants look right? Is the quality there? And do you believe the actual calls that are being done? And then the next step after aligning it is actually what's called variant calling.

**[17:41]** So the, you know, some additional software, once again, stuff we don't actually do. It goes through the, these alignment files and makes decision and say, yep, I've, I've read through this, this BAM file or SAM file. And, you know, I believe at this position on this chromosome that it's an A and not a T. And obviously with two pairs of chromosomes, you might have, you know, half of them being A's and half of them being T's and things like that. And cancer is a little bit different, right? Because you then have a mixture of, of tumor cells that are kind of commingled with normal cells.

**[18:14]** So you might actually get allele frequencies, what we call variant allele frequencies or VAPs that are not 0.5 or 1, but something in between. Because it could be that actual mutation that is causing the cancer. So like half of them have some values there, others have another, right? The original normal cell and then you have these clones of tumor cells that actually, the actual cancer causing cell that is now growing and spreading in that region. Right. So that gives you more or less, here's what we think the genetics is.

### Variant Interpretation and Decision Support

**[18:43]** And then you have to analyze it, right? Right. And this is really where we come into play, right? So our company started in 2012 just because of this NGS data, you know, was starting to overwhelm pathologists and physicians with lots of genomic and molecular data. And the belief of our company is that, you know, all medicine is going to be molecular in the future. And really understanding how that, those, what those variants mean in the context of cancer, especially, is where we really focus our energies.

**[19:09]** And that includes things like annotating the variants and trying to help people understand, you know, how often do they happen in the population? Has there been papers out there that said this variant's pathogenic or benign? There are some prediction models that people have written that say, you know, this variant will cause the protein to degrade in some known way, right? In the stuck gas pedal or the broken brake line analogy. And then from there, we're able to do decision support, right? So there are FDA drugs that are available.

**[19:41]** There are clinical trials that are available. These things have very complicated eligibility criteria. And our software helps you, helps doctors, you know, make sense of all this disparate data, bring it all together and say, oh, yeah, for this patient, given these mutations and maybe some other tests and some other data about the person themselves, we can say that, you know, this clinical trial is best for you. Or, you know, this therapy would work for you. The FDA has approved it for you. And one of the interesting things that's happening is to prove the whole idea of cancer is a disease of genetics and not a cancer of, you know, something else, is that these drugs that are getting approved for, you know, lung cancer with a specific variant, well, that drug might work for, you know, a melanoma patient with a specific variant or vice versa.

**[20:24]** I might be getting the analogy wrong, but you get the point. Basically, it's the specific mutation that matters. The fact that you have a V600E on BRAF is the most important part, not the fact that it was on your skin. That's pretty interesting. Understanding at this level is really powerful. So let's talk about the software stack, maybe at a high level first, then we can dig into some of the tools.

### The Software Stack

**[20:45]** Like, what kind of software are you guys writing to solve these problems and where's Python fit in? We started off with, you know, a research application that we used to, you know, get the company started. And then we built our first clinical app for pathologists. And that was all built using Java and a language and GWT. So Google Web Toolkit is a Java-based JavaScript tool, right? So we don't really have any JavaScript wizards in-house.

**[21:08]** And we've always been, you know, Java-based. And so while that was getting built, we actually partnered up with a team at Vanderbilt University called My Cancer Genome. And they have a website for people that are, you know, looking for information about genetics and cancer. While the rest of my team was kind of building this, our first couple of products, I actually built a curation tool for them. And I built that with the Django admin tool, right? So Django has this great admin tool.

**[21:32]** So we started, so I was able to kind of whip together a nice content management tool for them so they could get rid of their SharePoint solution that they were running at the time. Anything that gets rid of SharePoint, that's a good thing. That was the thinking there. You can hold your head high that day. We turned off SharePoint. Right.

**[21:48]** So, yeah. And having a, you know, quick user interface for that. And then we've since evolved that tool. And now that tool is managing not just, you know, some basic content management stuff for the My Cancer Genome site. But it's basically managing all of our knowledge and what we call our knowledge management system. And then what we did was built on top of that Django REST framework API.

**[22:07]** So using, you know, Tom Christie's tool to build out an API using, you know, REST. And now you can, you know, hit the API and get back specific information running a thing called Match in our software. So you can, you know, given a patient's information, their demographic and whatever biomarkers they might have, you hit our API and we'll give you back, you know, hey, this is a good clinical trial for you. You know, within, you know, 50 miles of the patient, here's a good trial for you to maybe put them on or here's a therapy that's approved by the FDA. That sounds really, really powerful. And some cool tools that are involved in there.

**[22:41]** You talked a little bit about user interfaces. Is that all Java or are you doing some UI in Python? I've heard your recent stuff about UIs. All our UIs are in Google Web Toolkit right now. We are doing the new version of the My Cancer Genome website using React. So that's one piece of JavaScript that we've started to use.

**[23:00]** But for the most part, you know, we're building out strong APIs with Python and then our UIs and things are still with Java and GWT. Yeah, that sounds good. I've heard a lot of good things about React, but I haven't done anything with React, so I can't speak too much to it. Yeah, cool. This portion of Talk Python is brought to you by Codacy. If you want to improve code quality, prevent bugs and security issues from making it into production, and at the same time speed up your code review process by 20%, then you need to try Codacy.

**[23:31]** That's C-O-D-A-C-Y. Codacy makes it easy to track code quality and identify and fix issues by automatically analyzing your commits and pull requests with all the most widely used static analysis tools. Codacy helps great teams build great software. Join companies like DeliverHero, PayPal, Samsung, and more. Try your first code review by visiting talkpython.fm/Codacy and linking your GitHub or Bitbucket account. You can also just click on the Codacy link in the show notes.

**[24:01]** All right, so let's talk about some of the tools that you're using. So you talked about Django REST framework. That's Tom Christie's tool. I had him on, or framework. I had him on the show a while ago as well. So it's basically layers on REST API on top of Django, right?

**[24:17]** So maybe tell people how you're using that, like what it's doing for you. One of the key things that we do is annotations. And one of the annotations people want to know is, okay, where is this variant? And where is it in the context of the whole genome? And that's called the G-dot. Or where is it in the context of the coding region of a gene?

**[24:36]** And that's called the C-dot. Or where does it end up land, you know, once it goes from a C-dot to a P-dot, which is the protein, right? So the actual amino acids. So G-dot, C-dot, P-dot. So that is a nomenclature called HGVS. There's actually a lot.

**[24:50]** And so our API actually houses, you know, all of our knowledge. But it also calculates annotations for people. And one of the great libraries we use is the BioCommons and HGVS. And those two libraries are open source, open on GitHub. And they do a really good job of doing those calculations. So if you're trying to understand, you know, how to get into genetics, I'd look at those libraries.

**[25:15]** There's also a library called Biopython. We don't use that, but it's also really good. And then from a bioinformatics perspective, you know, we use that full stack. So we have on top of our API, we've built out some user interfaces that use actually Jupyter and Bokeh and Pandas and NumPy. So I actually take that back. Our genome analytics platform, you know, the major part of it, the container part of it is written in GWT.

**[25:40]** But it's actually calling in and bringing in Bokeh plots as well. So Bokeh is being used on the back end using Pandas to calculate these great plots. And then we're rendering them in our front end. Yeah, that's really cool. I've never had a chance to use anything with Bokeh. But that's where you basically do the sciencey visualization stuff on the server in Python.

**[26:00]** And it just transfers over to the web front end. Is that right? Yeah. So it's calculating the JavaScript for you. Because once again, we don't have the JavaScript chops in house. But you're basically running pure Python using Pandas data frames.

**[26:14]** And then you basically configure your Bokeh plot using this Python library. And then it renders it. And then it basically streams out HTML and JavaScript. And you can just kind of embed it in an iframe or what have you in your UI. And it works great. And it sounds really great.

**[26:29]** Like you don't have to be in the charting business. Exactly right. Those are live, right? They're not just like PNGs or something. You can definitely work with them dynamically right there. You can use them to generate PNGs if that's what you need.

**[26:41]** And some of our clients do need that to include it in their research papers if that's what they're using our tools for. But yeah, it's got lots of different use cases. And Python keeps coming up with great libraries for visualizations. And there's lots of different options too. But Bokeh has worked out well for us. Yeah.

**[26:59]** It's kind of becoming a paradox of choice, right? Like there's a little – as soon as you learn something – yeah, as soon as you learn something, you're happy with it. You're like, but that looks better. Maybe I should do that. And of course, it's a constant treadmill sort of thing. So one of the tools that you're using that didn't surprise me but I think is interesting and I want to hear more about is spaCy.

### Natural Language Processing with spaCy

**[27:17]** So I don't even think I've mentioned spaCy on the podcast before. Tell us about that. What's spaCy? Yeah. So we've done really a proof of concept at this point using natural language processing. So one of the major challenges in our space and IBM and a few other big companies are spending lots of money to try to tackle this problem.

**[27:35]** But basically the problem is a lot of these EHRs, EMRs, people are recording their notes about patients in kind of free text. And one of the challenges with that obviously is it's unstructured and it's hard to do anything with it. We're not really in the business of major machine learning. We're kind of in the workflow and tools business. We help people solve problems in kind of a more pragmatic way. We're a small company.

**[27:58]** We can't spend billions of dollars. But what we're doing is we're taking spaCy and using that to parse some of these free text files and basically make recommendations to people. So doing things like what are called entity recognition. So entity recognition means I'm reading this Wikipedia article and finding all the proper nouns in it. Barack Obama did this in Detroit, Michigan or whatever. Those would all be proper nouns.

**[28:23]** And this is a great tool for extracting out named entities like that. We've trained spaCy to find named entities based on our ontologies, our data within our KMS. Right. These are our important words. Go see if they say this. Something like that.

**[28:39]** Exactly right. So there's a pattern matching framework that's within spaCy that's really very easy to use. And then the other thing we'd use it for is for classification. So basically we've trained some models to say, OK, when you read this sentence and it says, you know, estrogen receptor strongly expressed. Well, we want that to actually mean something. We want that to mean ER positive in our in our use case, in our vernacular.

**[29:01]** And that means something to our our end customers. And what it really does is what we then do is present it to them and say, hey, we saw this sentence and we're you know, we think it says this. Do you agree? Yes or no. And if they say yes, then we kind of keep that that piece of information and use it to further train our model to make it better over time. We're not really trying to we don't really think we can get rid of the human in the loop at this point just because, you know, we're just just at the start of this thing and we want to make sure we get the right answer 100 percent of the time.

**[29:29]** But what we want to do is make it so they don't have to read, spend a half an hour reading through a document where we can just scan it for them and say, here are the interesting parts. Please go ahead and just confirm it. That's pretty wild. I feel like this whole machine learning AI business is deeply reaching into medicine and things like that. Right. This is just another super interesting example I hadn't even thought of.

**[29:52]** But, you know, in terms of oncology, like the analyzing, say, scans like pictures to see, you know, have the machine say, no, that looks like cancer to me. Like kind of doing what radiologists might do or something. Right. Exactly. Yeah. It's pretty amazing.

**[30:06]** We like spaCy a lot. I originally tried playing with NLTK a few years ago and actually kind of ran into some barriers. It's an old that's an older project. spaCy is really modern and that it's, you know, kind of does some of the best practices with Python. I highly recommend it. The documentation is really good.

**[30:20]** Performs really well out of the box. And I was able to pull together a really good demonstration in just a few weeks. So I highly recommend it. Looks really cool. It definitely, they have it lined up to, when you go to visit spaCy.io, it really looks appealing and polished. I was wondering why you didn't choose, what the difference or what made you choose spaCy over NLTK?

**[30:42]** It's actually pretty obvious straight away, isn't it? They're doing a really good job with, you know, as a small open source, you know, company. I think there's like maybe two people working there from what I can tell. And they've, you know, they've basically open sourced their core product and they're selling, you know, ancillary products on top of it. And they're consulting services too. And, you know, it seems like a great project.

**[31:02]** Yeah, that's really cool. And I definitely look at it more because I'm always fascinated how these people are building really interesting business models on top of some kind of successful open source thing. So, yeah, another cool example. So you're building some interesting CLI tools and you guys are using Click, which is pretty common. That's from Armin Roenker who made Flask. You're also using Pex.

### Packaging CLI Tools with Click and Pex

**[31:27]** That, I think, gets less, a little bit less awareness. Tell us about Pex. It's really interesting. Click's great. There's obviously lots of great ways of building, you know, command line tools in Python. They've been doing that for a long time.

**[31:38]** But Click's really, really easy to use. And then what we find is, you know, how do we get this to our clients? We do a lot of things with Docker. And when we're setting up servers, using Docker to set up a server is great. But we actually also have now command line tools that we're trying to distribute to people. And, you know, pushing things up to PyPI and having them pull things down using pip and having them set up virtual environments.

**[32:00]** It just sometimes gets a little bit difficult for some of our end users who, you know, might not be Python, day-to-day Python developers. So using Pex, you're able to actually just build the whole module together with the virtual environment baked in. And when you deliver it to them, it just kind of, it just runs. And you can build it to different platforms. You can, you know, on my, on my, for one of my projects, we have a little docking container that actually builds it to Linux and then builds it to macOS. And we're able to share it out to people and, and use the tools without having to go through the whole virtual environment setup stuff.

**[32:33]** That's really cool. So I think Pex is the one that actually takes everything, zips it up, and then it turns out Python can execute zip files and run from there, right? Which is pretty wild. Do you know if that entirely eliminates the dependency on Python? Like if I had a blank machine or is it just sort of the packaging, but they got to have the base Python there? Someone asked me that just the other day.

**[32:56]** I don't think, I actually, this thing, it's just the libraries because it doesn't seem that big of a file. It's not like, it's not like when you download a clips and you get the whole jar with it. Yeah, yeah, yeah. I get the whole Java JDK with it. I, you know, I actually don't think, I don't think so. It's pretty cool.

**[33:09]** Yeah, I've been playing with Pi Installer and it's pretty nice as well. And it kind of, it'll do it so there's no dependency. It's also more problematic because it's trying to solve the problem bigger, I think. So I was just thinking, oh, maybe Pex is going to be nice. Another thing that I think is really cool around this stuff, just as a shout out, is that I've been playing with a lot lately is this thing called GUI. G-O-O-E-Y.

**[33:31]** Have you heard of this? I did see your little prototype up on GitHub, I think. Yeah, so you can take something like this and then just throw like a little UI with dropdowns instead of command line arguments on top of it. It's pretty cool. Right. So another thing that you are doing is AIoHCP.

### High Throughput Annotation with AsyncIO

**[33:45]** Tell us, are you using the server or the client component of that? All client. So for us, it's high throughput annotations, right? So one of our clients, you know, basically paid millions of dollars for this high throughput system to generate, to go through the whole alignment and variant calling situation, right? So they're trying to do high throughput, you know, lots of thousands of cases per week or whatever they're doing. And they're trying to keep up with that.

**[34:09]** But they need annotations from our KMS, our knowledge management system. And so the challenge was, okay, how do I keep up with them? And the first version of my software had trouble, right? So we were, you know, trying to parallelize things with multiprocessors and it worked. But, you know, once I've actually played with AIoHTP and AsyncIO and really understanding how to program in that paradigm and really look for the IO bottlenecks and work around them, it made my redesign of that tool we called our annotator that actually does that annotation much easier. Right. So now, you know, I have basically have these five stages in my little program with queues in between them, you know, where basically what an annotator does is really just reading a file, making a call to an API.

**[34:55]** A remote API of our service, right? Exactly right. And then injecting that data into the stream and then writing it out to disk, right? So you got basically, let's just say, three spots where you can leverage the AsyncIO. So reading from the original file, making the call to the HTTP server, and then writing out to disk. And, you know, this whole framework allows me to do all three of those things. It kind of just magically balances itself with regards to how much it's reading from the disk, how much it's writing to the disk, and how much it's calling the API.

**[35:24]** The only thing you have to do is make sure you don't call your API too much unless you want to take down your server. And then our server on the other end is, you know, highly parallelized through using Celery and Redis and handling. It can scale up because we've thrown lots of hardware at that. And so what we're able to do is we're able to keep up with that, you know, multi-million dollar hardware solution with Python 3 and AsyncIO. And it's been great. And probably like, what, one thread?

**[35:49]** So basically, yeah, one process running and it's doing the job. So we do process, we can then, we can then scale out that one program across multiple processes if we want. But it's, it's really pretty high performance and, and our client's pretty happy with it. That's really awesome. Yeah, because so much of the time, programs that are slow, they're actually just waiting on some other part of the system. They're waiting on the web service.

**[36:09]** They're waiting on disk. They're waiting on, you know, whatever, right? And so this lets them be productively waiting, basically. It's definitely a paradigm shift. And you have to, you have to think through the whole, this Async method is calling this other Async method and, and really understanding how that all fits together. And it can definitely bend your brain a little bit if you're not used to it.

**[36:28]** But once you actually do figure it out, it's kind of a superpower and it's really great. Yeah. And as far as superpowers go, like the actual change in the programming model is pretty mellow, right? There's like not, it's not that different from serial requests. Yeah. You just got those couple of keywords with Async and await.

**[36:44]** And once you figure that out, then it's kind of easy from there. And then it's just really about using cues. And then you get into the whole queuing theory and, you know, lean manufacturing and that kind of stuff and try to understand, like, how do you, how do you remove the bottlenecks from your system so that, so that things go as fast as they possibly can go. And if you, if you kind of have that background and mentality with it, it's, it's really cool. Yeah, that's cool. But of course, anytime you're thinking about concurrency, it can definitely sort of bend your mind, like you said.

### Django Channels and Tumor Boards

**[37:09]** Yeah, exactly. So speaking about concurrency, another thing that you guys are using that's really cool is channels and celery and Redis. Channels, is that like Django channels? Yeah, Django channels. So one of our tools, there's actually async mode to it. So in the oncology space, one of the big things that happens is for challenging cases, they go to what's called a tumor board.

**[37:29]** So some of your bigger hospitals will have a tumor board where basically all of the experts at that hospital, or even they could even, you know, WebEx other people in from other hospitals to get to the experts to help people with, you know, rare cases, right? There's a case, there's a variant, they don't know what it means. What do they do about it? And that's what they call a tumor board. And we build software for that. And one of our modes is actually async mode where people can kind of, so they don't actually have to have a WebEx, they can just kind of go to our app.

**[37:56]** And everybody's in the app at the same time. And if there's a leader, the person's moving around from one page of the app to the other, that's sync mode. And that's actually done using WebSockets. And so if you know anything about Django and, you know, its history, so Django started off, it was built on WSGI, and that's a synchronous protocol. Yeah, all the popular ones are. They still haven't found a way really around it.

**[38:19]** Godwin, Andrew Godwin? Yeah, Andrew Godwin, yeah. He added this capability to Django, which is basically kind of like this little side thing to Django called Channels. He invented another framework for interfacing in with Django from your web server, right, from Apache or Nginx, and using ASGI, I think is what he called it. And it's an asynchronous platform. And so that enables us to do WebSockets.

**[38:43]** And the WebSockets is the thing that allows us to do this synchronous movement between different people on our application. So if, you know, one person clicks a link and jumps to another page, all the other people that are on the app jump along with them. And really, the main goal of this is to allow people to kind of dynamically work with the genomic information at their fingertips rather than having, you know, a bunch of people on their phones Googling. What do these variants mean, right? So they're all kind of working together on a single call. So you guys sort of built, like, the Google Docs.

**[39:14]** You kind of added a Google Docs equivalent type of experience to your app, right? So everybody fires up your app and they have this local sort of guided experience. Yeah, that's a really good analogy. Yeah. Yeah, I think more apps need that. I think that's really awesome.

**[39:27]** How hard was it to add this channels, to do the channels code and to add this stuff together? Well, the channels part was easy. I mean, it basically just kind of worked out of the box where, you know, we're able to send messages from one thing to the other. But once again, you know, getting the actual communication going from one instance to the other is tricky and it's managing state. And how do you change, you know, from one user to another and make sure that the experience is smooth? That's always tough.

**[39:52]** And then as you add new features, you need to make sure that the sync thing works across those new features, right? That's right. We've got this new visualization, but it only shows up for the leader, not for you. Those are always fun. But the actual channels plumbing and things like that, even though it's kind of cutting edge code for, you know, in beta or what have you, works really well. And adding the Redis channel in between is what ends up happening when you actually set this up.

**[40:15]** You end up having, you know, your web server, Nginx. You have what's called an interface server, which is basically an instance of your Django app. You have the Redis channel and then you have workers. So the workers are basically other instances of your Django app, but they're actually doing the actual work of responding to either a plain old HTTP request or to one of these WebSocket requests. And, you know, all that plumbing just worked great. How cool.

**[40:39]** Yeah, it sounds really fun. I had no chance to use it, but it definitely looks really cool. Yeah. All right. Well, that sounds like quite the list of cool projects and technologies you're getting to put together there. It must be fun to work on.

**[40:51]** It's great. And, you know, having a purpose and, you know, working for something that's not online marketing or e-commerce or whatever I was doing in my past life is great. So it's great, you know, working on something that I think is going to make a difference. Yeah, definitely trying to make people healthier and live more full lives is way better than trying to optimize that click rate or, you know, convert one more piece of data to try to piece together. No, this person is actually that other person and they're in this demographic, right? Right.

**[41:19]** Yeah, exactly. So, you know, some other thing that nobody needs. Online stocking is not something I'm interested in now. No, for sure. Cool. So you actually have a couple of somewhat related open source libraries.

### Open Source Libraries

**[41:30]** You want to talk about those a bit? One of the libraries that's out there is called attrs. And it's actually, I think, the basis of the new data classes that's in Python 3.7, right? So the new PEP that does data classes. So there was actually an original project called attrs, which is a really great project. And it lets you define your classes and you get a bunch of, you know, kind of boilerplate Python stuff for free for comparisons and, you know, string representations and things like that.

**[41:55]** Right. It implements like, say, hashing correctly and all that kind of weirdness that you can overlook. Yeah. The problem I was trying to solve at the time was I wanted an immutable way of reading a YAML file, getting a nested Python object, and not having to, like, munch dictionaries, right? Because you start writing code to dictionaries and quickly things get kind of nasty with some nested dictionary references and things like that. So that's what I was looking for was a way to round trip to YAML, kind of like in Java, there's a library called Jackson that'll do that.

**[42:27]** It'll round trip to JSON or to what have you. And Python does a good job of, obviously, round tripping from dictionaries to YAML. So what I wanted was an actual object model and patterns, which is really good. But I kind of had just a different mental model, and I wanted something more like the Django ORM. And I had a lot of use cases where I wanted to basically say, yeah, I want to call this a string field, and I want it to always have this validator and this converter. So what attrs will let you do is when you define your fields, you can say it's got this converter and this validator.

**[42:55]** And I kind of just wanted some templatized versions so I didn't have to keep saying the same thing over and over again. And I also wanted this, you know, this magical transformation. And that's what the related project does. Related. It looks really cool. And it does look like you're working either in the Django ORM or MongoEngine or, you know, one of these types of things where you define what the object actually is.

**[43:19]** Can you have, like, nested objects? You basically can have, if you declared a class A, it can then relate to class B either as a, have a child object B, or it can have a list of Bs or it could have a map of Bs, right? So those, that object model, and it fully knows how to kind of render it to and from a dictionary. And it does the whole serialization and deserialization for you. That's sweet.

**[43:44]** So, yeah, definitely people should check this out if they're working on Python and YAML. It definitely looks like a cool project. So the other one's called Rigger. You know, obviously we're in a very, very, it's very important to us to have the right answers for people. Yeah, the answers have consequences. The most important thing about my job, I want to make sure we give people the best data, the most relevant data, the most up-to-date data.

**[44:06]** And one of the key things we got to do is testing. And we spend a lot of time testing, you know, by hand. We do a lot of unit testing. You know, we believe in the testing pyramid at my company. But one of the things I like to make sure we have is kind of an end-to-end test or an integration test or a functional test, however you want to describe it. And we, in our Java space, we actually use the tool called Cucumber.

**[44:27]** And what Cucumber lets you do is basically, you know, declare your tests in a given-when-then kind of English-style DSL. And that allowed our product team, you know, our product specialist team, which are basically non-developers, but they understand the science and they understand how to use the software and test the software, to describe how a function should work, right? And given some state, when I do some function, then I should get some result. But what I wanted was something like that on our API side. You know, I didn't want to go through the whole pain of having glue, where people actually had the right code that runs behind this DSL. And since HTTP is kind of its own language in itself, I decided to kind of shortcut it and just basically build out a simple YAML-based approach.

**[45:11]** And that's kind of where this related project came from. So you write out a YAML file that actually describes your steps. And the steps describe what you make requests to and then get the response back. And, you know, basically it allows us to build out a suite of hundreds and thousands of tests, testing out the software to make sure it gives the same answer every time so that people know when they make changes, they're not breaking anything. And it does it using AsyncIO because I wanted it to run fast. And then we use a thing called JamesPath to actually transform the response that comes back.

**[45:40]** So the transformation, that allows for the test to not be fragile, right? So one of our rules for APIs is we don't let you change a field or remove a field without, you know, some major consequences. But if you add a field, if you add a field, it's usually not a problem. But it can break your tests if you have very, very specific tests that have all the fields listed. If it doesn't match exactly like a string test, then it's going to break. I'm just expecting this string back or this JSON document back.

**[46:09]** Are they the same? No, crash, right? Like that's right. Yeah, that's too much. Yeah. So with JamesPath, we're able to kind of filter it down and say, yep, I only care about these three fields.

**[46:17]** These three fields match exactly as I expect. And if so, it's correct. And so I was going to open source this thing a few months ago. And then I heard on one of your other programs, I think the Tavern CI project was released. And it's very similar. So people should definitely check that one out.

**[46:30]** And both our project and that project were built kind of based off the idea of PyRest test, which seems to have been abandoned, which was a nice project. It just had a few things that we needed that it didn't have. And, you know, I would say that the reason to choose our project over maybe Tavern CI would be this JamesPath thing. We also have API coverage for Swagger. So we define all of our APIs with the open specification, otherwise known as Swagger, which we still call it Swagger. And so we can tell you, oh, you've got 100% coverage of all your API endpoints and their variables.

**[47:04]** And then we also actually included the Cucumber reporting HTML reporting tool called Cucumber Sandwich, which brings up a nice pretty, you know, HTML view of your test and shows you how all your steps ran and things like that. Yeah, the graphical output really is nice and colorful. It's you could tell you can get info out of it right away. Yep, it's great. Very cool. And you can see how related fits in there perfectly.

**[47:25]** Yes, exactly right. Also saw you using AIoHTP. So it's all like async nice and quick. Yeah, so I wrote AIoHTP to do this little rigor testing so I could do parallel testing to kind of speed up our test suite because I didn't want them to, you know, if you have to run them sequentially, it's going to take a lot longer than if I run them all in parallel. So it takes three to five times less time when you turn the concurrency on with our test suite for all of our API endpoints. Very, very nice.

**[47:51]** All right, so I think that's maybe we'll leave it there for the genomics stuff, but that was a really interesting look at how you're using Python to address these major problems. And I got to commend you. You've got a bunch of really cool tools and systems put together, it sounds like. So nice work. Thank you. I mean, Python's got a great ecosystem, great community, so many great tools.

**[48:12]** So it makes getting stuff done really fast easy. The paradox of choice is a real thing that continues to vex people building stuff like this, right? Because you build it all out and you're like, oh, but there's some other REST calling API thing. You know, there's maybe I should use API star instead of Django REST framework because Tom Christie's not working on that, right? But you've got to just put a stake in the ground and say we're building something productive here. Always lots of new toys to play with and it can get distracting.

### PyCon in Cleveland

**[48:39]** Another thing that we want to touch on is there's some kind of event going on in your city. Is that right? Yeah, PyCon is coming here. Yeah, in May. Is that May 7th, I think? Yeah, so beginning of May.

**[48:51]** Yeah, it'll be here and be right down downtown Cleveland, which is a great city. Been here 18 years. It's about two blocks away from my office, so I'm just going to be able to stroll right over there at the end of the day. And it's great. Cleveland's awesome, so people should definitely take advantage of some of the sites when they're here. I absolutely think so as well.

**[49:08]** A quick correction, it's May 9th, not May 7th, but basically the same, more or less that time frame, right? And I'm looking. Can I still register? I think I can. I don't think it's sold out yet. It's not sold out yet.

**[49:21]** So maybe it will be by the time people hear this. So one of the things I wanted to touch on with you, maybe two parts. One is, what advice do you have for getting the most out of the conference itself by, like, I'm within the walls of the convention center, you know? And then people are going to be in your town, a bunch of folks together traveling here for the conference. Like, what would you recommend they do to get the most out of Cleveland? I haven't been to a PyCon since 2005, I think, was when I figured it out.

**[49:53]** So I think maybe Dallas or something like that. I bet it's a really big difference of an experience. I'm excited to check it out. So it's going to be great to go. You know, obviously, everything's online. So if you've never been and you never noticed the PyCon on YouTube, definitely check that out.

**[50:08]** So what that should do is give you confidence that you can miss, you know, some of the speaker, some of the talks that maybe you're not super interested in and spend more time in the hallway track and talk and meet some folks in the community. Because the PyCon group does a great job of getting all those videos online. Within like a day. So you almost could watch it while you're at the conference if you really felt like, oh, geez, I wish I saw that. That's my recommendation there. And as far as if you're downtown and you're staying downtown, you know, there's some great restaurants over on East 4th Street.

**[50:35]** There's, you know, Lola by Michael Simon, the Iron Chef. There's another one called Greenhouse Tavern. There's the House of Blues, which might have a concert that night. There's the Rock Hall, which has some special events sometimes. And if you're, you know, a rock and roll fan, that's definitely a place to check out. The Indians are in town.

**[50:50]** I checked. The Indians are in town that weekend. They're playing the Royals. So if you're a baseball fan, that's a few blocks away. Yeah, that's really cool. So if people are in town, they could obviously drop in and see that.

**[51:00]** But if they're traveling from, say, outside the country, right? I know tons of people come from all over the world. Like, when do you get to see a professional baseball game? Right? Like, this might be a chance. Take a couple hours, skip the conference, and go watch it, right?

**[51:12]** Yeah, the Indians have been good the last few years. So it should be a good team. And then, you know, there's some other areas, too, to check out, right? So there's, on the west side, there are Ohio City, the west side market. You know, lots of breweries. You know, micro pub type of things.

**[51:27]** Definitely check those out. Playhouse Square, which is, you know, maybe another six or seven blocks away. That's actually the largest performing arts center in the United States, other than New York City. And then University Circle, which is a few miles away. That's not as easy to get to.

**[51:43]** There's Lyft or Uber. Like, you could get there. Yeah, you could get there pretty easy, right? Exactly right. So, yeah, Cleveland's a pretty easy town to get in and out of, and lots of great restaurants and lots of great things to do.

**[51:52]** Oh, that sounds really fun. I definitely want to second, first of all, what you said about the hallway track. I may take that track too much when I go to conferences, but I find I skip a lot of the talks and actually just really try to experience being with people. Because when you go to the talk, it's great, but it's really, you sit quietly and you watch a great presentation and you experience it there, right?

**[52:14]** But you don't interact really with anyone near you or anyone presenting so much at all. And so there's the hallway track, which is just hanging out, talking to people. And if you find yourself in an interesting situation, just take advantage of that because you can always, like you said, go watch on YouTube the thing that you would have gone to see. The other thing that they're doing really well there are open spaces.

**[52:37]** So I find that open spaces are more participation and engagement than the main talks, and they're not recorded. So there'll be a board. If it's like the last two years, there'll be a big board where people put up index cards saying, in this room at this time, we're going to just meet and it's kind of undirected group conversation about something amazing, right?

**[52:55]** And so definitely take advantage of those as well. That's great. Yeah. And if you want to connect at PyCon, just send me an email and I'll look for you there. Yeah. Very cool.

**[53:05]** And do take advantage of some of these fun things that Ian pointed out. Like the worst thing about traveling is if you just get on a taxi to a plane to another taxi to a hotel to a conference center, and then you pop those off the stack again and you do them in reverse, right? Like you want to go like, I was in Cleveland and I saw this amazing thing, right? You know, like same thing, like wherever you go, try to take advantage of that.

**[53:32]** So that's great. That's great. Yep. Yeah. Awesome. All right.

### Final Questions and Advice

**[53:35]** Well, it's down to the two questions. So let me hit you with those. First of all, if you're going to write some Python code, what editor do you run? Converted to PyCharm. It's great. I use the Vim editor mode and it's a great environment and love using it every day.

**[53:50]** Yeah. Awesome. It's definitely kind of overwhelming when you get started, right? Yep. A lot of great tools and the integration with pytest and the integration with the Vim and Markdown editors.

**[53:58]** It's a really good tool though. Yeah, it is. Once you get used to using the feature, it's hard to not, it's hard to imagine not using it. Awesome. Okay.

**[54:06]** And then a notable PyPI package. All right. I'm going to go with deep variant by Google. So I haven't used this. I probably won't ever use this, but it's just such an interesting use of AI. They are actually, you know, taking those BAM pileups that I described and basically using

**[54:21]** image recognition type AI to actually determine and make variant calls. So what used to be, you know, somebody with a way bigger brain than me doing these calculations with math and trying to figure out the right determination of what a variant is, is kind of being superseded now by this really interesting Google project. So deep variant is the name of it. Okay.

**[54:42]** That sounds really cool. And just another one of those AIs creeping in to solve these tricky problems. Exactly right. Yeah. Very cool. All right.

**[54:50]** Well, definitely interesting choices. And thanks for sharing everything. Any final call to action? People want to get involved in biology, genomics, Python? Like, how do they get started? There's a website called BioStars.

**[55:02]** There's lots of interesting topics up there. It's a stack overflow type clone, I would say. And then there's stack overflow itself. There's, you know, lots of conversation there. Feel free to reach out to me if you're interested in learning more. And, you know, Python is just a great, great ecosystem.

**[55:19]** And there's so many cool tools to play with. Yeah, I totally agree. So one of the challenges I see for people getting started in this space is they're not researchers or doctors. Like, where do they get the data? Do you know of any, like, good open places to get some data to work with?

**[55:33]** Lots of the research that's out there is funded by the U.S. government or European governments. You know, NCBI is a website. I can't tell you what the acronym stands for right now. They've got tools. There's data sets out there such as TCGA, which is called, which is the cancer genome atlas.

**[55:49]** There's a project called Genie, which we were involved with helping them analyze their data. And they've got lots of cancer data that's out there. But lots of tools. So search for keywords like VCF and BAM and SAM tools. And there's lots of different keywords to search for. And, you know, you'll find lots of different data sets.

**[56:09]** It really just kind of depends on, you know, what kind of analysis are you looking to do? And you also find a bunch of Jupyter notebooks out there, right? People are people doing their analyses in Jupyter notebooks and then posting them to the web for people to follow along with. And really, it's I've learned all this stuff in the last five years. It's not insurmountable.

**[56:25]** It's just a matter of, you know, having a goal and trying to reach that goal and solve a problem. That's cool. And it's great. Yeah. Solve problems one at a time and eventually have this big tool chest, right? Exactly right.

**[56:37]** All right. Well, Ian, thanks for being on the show. It was great to talk with you and learn all about this stuff. That's great. Thanks, Michael. Really glad to be here.

**[56:44]** This has been another episode of Talk Python To Me. Today's guest was Ian Maurer, and this episode has been brought to you by Codacy. Review less, merge faster with Codacy. Check code style, security, duplication, complexity, and coverage on every change while tracking code quality throughout your sprints. Try them at talkpython.fm/codacy, C-O-D-A-C-Y.

**[57:09]** Are you or a colleague trying to learn Python? Have you tried books and videos that just left you bored by covering topics point by point? Well, check out my online course, Python Jumpstart by Building 10 Apps at talkpython.fm/course to experience a more engaging way to learn Python. And if you're looking for something a little more advanced, try my Write Pythonic Code course at talkpython.fm/pythonic.

**[57:34]** Be sure to subscribe to the show. Open your favorite podcatcher and search for Python. We should be right at the top. You can also find the iTunes feed at /itunes, Google Play feed at /play, and direct RSS feed at /rss on talkpython.fm. This is your host, Michael Kennedy.

**[57:50]** Thanks so much for listening. I really appreciate it. Now get out there and write some Python code. I really appreciate it.
