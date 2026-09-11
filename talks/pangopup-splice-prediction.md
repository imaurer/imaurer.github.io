# PangoPup: Splice Prediction We Can Ship

2026-09-10 · GenomOncology engineering talk · https://www.imaurer.com/talks/pangopup-splice-prediction/

> An internal engineering talk, recorded and cut to Ian's section. Timestamps match the published video. Transcript from local Whisper; proper nouns corrected, otherwise verbatim.

## What PangoPup is

[00:00:00] Okay, so PangoPup is a new open source project from GenomOncology.
[00:00:05] And the problem is we need splice predictions for ACMG guideline, sorry, ACMG variant prediction.
[00:00:13] And the core challenge is how do we do that in a way that is viable from a commercial
[00:00:21] entity perspective.

## What splice prediction actually is

[00:00:24] So first, what is splice prediction?
[00:00:27] So it's the idea that there's obviously there's exons, right?
[00:00:33] picture. Once again, I tell everybody, you guys all know this, right? I'm a software developer
[00:00:39] first, and biologists about a millionth, right? So I don't really know much about the biology
[00:00:47] directly. I learn it as I solve coding problems. But basically, there's exons and introns. The
[00:00:55] exons get brought together to make a working protein. The splices are the parts of the DNA,
[00:01:04] right, that basically allow the exons to kind of split up and then get reassembled.
[00:01:10] I probably way messed that up, but that's the basic just on how I understand it.
[00:01:14] And then obviously there's, so there's reference bases at every position, of course.
[00:01:22] And so these regions where the splice actually happens, if there's a mutation there, it can then affect the way that the splicing happens.
[00:01:33] And then therefore it can then affect the protein that gets assembled.
[00:01:36] And so knowing which mutations cause what to happen with regards to splicing is a prediction problem effectively.
[00:01:46] And so there's actually multiple models, machine learning models, where they've taken data,
[00:01:55] right?
[00:01:55] I'm assuming some combination of DNA and RNA data or what have you to figure out what DNA
[00:02:03] mutations cause what protein assembly, and then use that to then train a model, and then
[00:02:09] use that to then predict which mutations cause which things to happen.
[00:02:15] Now, the cool thing about my explanation is even if I got it wrong, it kind of doesn't matter, right?
[00:02:20] Because at the end of the day, what we're trying to do is just replicate this model score so that we can downstream do the right things from an ACMG guidelines and other bioinformatics capabilities.
[00:02:34] So that's high level how I understand splice prediction, which once again, good enough for software development work.
[00:02:39] There are other models and libraries out there.

## SpliceAI, and why we cannot ship it

[00:02:45] SpliceAI seems to be the one that was most cited by papers where people are actually
[00:02:51] validating these models and trying to use them in their pipelines or what have you.
[00:02:57] This model is from Illumina and it is not for commercial use.
[00:03:03] It's Creative Commons, but I believe it's non-commercial use that obviously dissuades us from being able to use it, disables us from being able to use it.
[00:03:13] And it's also archived.
[00:03:14] And I actually don't know why it's archived.
[00:03:16] I didn't look into that.
[00:03:17] But those are two kind of strikes against it.

## The Broad's lookup site does not scale

[00:03:21] There's a website called The Broad, or there's an institution called The Broad.
[00:03:26] They have a website.
[00:03:26] The website actually has both the SpliceAI and the Pangolin scores.
[00:03:32] So Pangolin is the other model, which is what this PangolPup is based off of.
[00:03:36] And it's a nice little handy website.
[00:03:38] You can go there and look stuff up.
[00:03:40] And it's very helpful when you're trying to like suss out what's right, what's wrong, where is it right, where is it wrong.
[00:03:47] And then, but you can't really use it at scale, right?
[00:03:51] It's meant to just be like a little one-off service thing.
[00:03:54] And if you start banging on it with your agents or your API calls, they're not going to be very happy with you.
[00:04:00] They'll block you pretty fast.

## Pangolin is open, and it is GPL

[00:04:02] And then there's Pangolin. So Pangolin is a model someone else trained, open sourced, great.
[00:04:09] You know, written in Python and PyTorch, fine. But it's GPL license. So GPL, for those that don't
[00:04:17] know, is the GNU public license, maybe? I don't know. It's copy left, which means that it's kind
[00:04:25] of a viral license. And all that means is that basically if you adopt GPL software into the base
[00:04:32] of your software system and you build on it, then you are basically, you have to do the same with
[00:04:39] your software. That's not viable for our business, right? We can't open source our stuff because our
[00:04:45] clients could be like, okay, thank you. And we're just going to run it and we don't need you anymore.
[00:04:51] I actually don't think that that's going to happen. I actually don't even think that that
[00:04:53] would happen, but we're not going to take that chance. Right. So, um, so we don't really want
[00:04:59] to open source our software. We, we want to keep it as a commercial entity. And, and so therefore
[00:05:03] we can't use GPL software directly. Now, guess what? You can use GPL software. There's no rules
[00:05:11] against it. The challenge is how you do it. Right. And so Linux, for instance, we do a lot of stuff
[00:05:17] on Linux. We have Linux, we deploy clients to Linux, Linux is GPL. The reason why that works
[00:05:22] is because of the rules around how GPL works
[00:05:25] is that you can't, you can use it.
[00:05:27] You can use GPL software.
[00:05:29] You just can't prevent people from using,
[00:05:34] distributing it and it has to be open source
[00:05:37] if it's kind of connected and embedded
[00:05:39] within your software at like the process layer itself.
[00:05:43] And Linux, when you run on Linux,
[00:05:44] Linux is obviously a separate layer completely than yours.
[00:05:47] It's not even the same, it's not even a process question.
[00:05:50] It's like a software stack question.
[00:05:54] And then there's other GPL software that people do deploy and link to, but you've got to link
[00:05:58] to it by, linking is probably the wrong word.
[00:06:01] You've got to use it as a service that has a process boundary.
[00:06:04] That's kind of the key thing.
[00:06:06] So we'll talk more about that in a moment.
[00:06:08] So we built, so we got Pangolin.

## Without a GPU, the model is slow

[00:06:11] The other major problem with Pangolin is that it's slow because it is a GPL, it is a model,
[00:06:16] it's a machine learning model.
[00:06:17] and I'm sure it'd be fast if I ran on a GPU.
[00:06:20] But if you guys haven't followed the news lately,
[00:06:23] there's this AI thing going around
[00:06:25] and it's actually causing all the GPUs to be really expensive.
[00:06:29] And GPUs were probably pretty expensive just to begin with,
[00:06:32] just to do this kind of stuff at scale.
[00:06:34] So that was the major concern we had with Pangolin in the first place.
[00:06:39] So let's get into it.

## One process boundary contains the GPL

[00:06:41] So the first solution is the GPL problem.
[00:06:44] So what we need to do is separate ourselves from the Pangolin model and the Pangolin code.
[00:06:50] It's not really clear what's GPL and what's not the code or the model.
[00:06:53] I'm just going to assume the whole thing was GPL and say, okay, I'm not going to interact
[00:07:00] or integrate with those two things.
[00:07:03] So basically the strategy is let's have a process boundary and that process boundary
[00:07:07] can either be invoking it as a CLI, a command line in its own process.
[00:07:14] which is fine, simple, but it has a startup cost.
[00:07:18] There's a little bit of a startup cost to doing that
[00:07:20] or running it as a service.
[00:07:22] And the nice thing about it being a service
[00:07:23] is you just kind of start it up
[00:07:25] and then you just have to design your service
[00:07:26] in such a way that it can do all the stuff a service to do
[00:07:29] around batching and back pressure
[00:07:31] and all those other things.
[00:07:33] So you have the proper performance stuff
[00:07:34] that we all know and love.
[00:07:36] And then what we want is then our knowledge platform
[00:07:38] to interact with it.
[00:07:39] I'm not gonna talk about that part, that's Eden's part,
[00:07:42] But the basic gist is I designed PangoPup to work with the knowledge project, even figured out a bunch of things that I did wrong, and then I fixed a bunch of stuff.
[00:07:51] And hopefully now the code is a little bit easier and he can talk you through how that works.
[00:07:56] But basically, we're deploying PangoPup as either a service or a CLI.

## The architecture

[00:08:01] And then the architecture is like this so that we can actually get the performance things that we need.
[00:08:07] Right. So roughly PangoPup takes, you know, Pangolin the model takes about four seconds or eight seconds, depending on, you know, what your machine is and what the speed of your CPU is.
[00:08:19] I honestly didn't even try it on a GPU. That's always something we could try.
[00:08:23] But the basic gist is given a chromosome start ref alt, GRCh38, you send that in and we can actually use this pre-computed SNV index.
[00:08:34] so you know me and matt were talking on slack and be like oh what we should do is

## Someone already computed the scores

[00:08:40] look at pre-calculating everything and matt was smart and he googled it and someone did it
[00:08:46] so um so we already have that that data set uh it's up on a website called Zenodo which has a
[00:08:51] lot of these research projects and research data sets so someone went through and uh basically
[00:08:58] pre-calculated, um, you know, 19,000 genes, uh, about 4 billion rows worth of stuff and put it
[00:09:07] into this TSV file. And the TSV file was big, giant, a big, giant thing. Um, so I download and
[00:09:16] basically turn this 13 gigabyte zip file, uh, into an index file. And so, um, and so that,

## Inside the 15 GB index

[00:09:26] That index file is, I think it's about 15 gigs maybe.
[00:09:30] Maybe I have that on another slide.
[00:09:31] Let's see.
[00:09:32] Yes.
[00:09:33] So I have a 15 gig index file.
[00:09:35] And the 15 gig index file gets zipped up to about two gigs.
[00:09:40] And what happens is when you try to use PengoPup and you hit one of these SNVs, right?
[00:09:47] So it's only for the SNVs.
[00:09:49] I'm sorry if that wasn't clear.
[00:09:51] You get a chromosome start ref alt in.
[00:09:53] And if it's an S and V and it's in the region, right, it's in one of those genes in the region that could be a splice window, it hits that pre-computed index and gives you a value.

## Non-SNVs run the model once

[00:10:06] If it's not, if it's an indel or it's a miss because it's not within one of those ranges, it'll do a call and return back the value.
[00:10:14] But it also has a little SQLite cache as well, just to make things faster if you happen to be hitting the same variant over and over again for some reason by accident.
[00:10:23] And so then it returns the values back, hopefully as fast as possible.
[00:10:30] And then, yeah.

## Why a purpose-built index beats a general one

[00:10:31] And so what's the index?
[00:10:33] Well, this index is actually kind of like this secret thing I've been doing recently for a bunch of stuff to make things faster for some prototypes that I'm working on that I hopefully can get pushed into the knowledge project in the future.
[00:10:44] But the basic gist is, rather than using something like SQLite or some other, you know, generic KV cache thing, basically building custom one-off Rust-based indexes or indices.
[00:11:00] And basically what you do is you say, okay, what's the smallest record size thing that we could do?
[00:11:08] What's the way we'd want to index into that record to actually look something up?
[00:11:13] like what's the shape of their query, right?
[00:11:16] And then let's build a purpose-built file
[00:11:19] that's the smallest possible file that can be built
[00:11:22] and then have just a simple lookup
[00:11:26] that brings back, gives me back the output that I want, right?
[00:11:29] So it basically takes this uncompressed
[00:11:32] or unoptimized TSV dump,
[00:11:36] turns it into a very specific purpose-built Rust-based,
[00:11:41] I mean, you can write C code or whatever code you want to access this index, but it's a very deliberate, you know, structured object with a very deliberate, you know, index.
[00:11:54] It's kind of like Solr, right?
[00:11:55] But Solr has a lot of overhead because it's a generic thing, right?
[00:12:00] It's a generic document with a generic indexing scheme.
[00:12:03] And they can't optimize for this one specific use case.
[00:12:08] they're optimized for generic document indices, just like Lucene is, and it's more optimized for
[00:12:13] searching. This is not optimized for searching. This is, I know what I have. I got this chromosome
[00:12:18] start ref all, and I want you to give it to me in the fastest possible way. And what I'm getting is

## Four seconds to 0.441 microseconds

[00:12:24] 0.441 microseconds for P50, which means my median, right? So my median time is 0.44
[00:12:32] for microseconds instead of four seconds.
[00:12:35] So I think that's like 10 million times faster,
[00:12:39] 20 million times faster if it's actually eight seconds
[00:12:41] on my computer, I forget which one.
[00:12:42] I keep getting four seconds or eight seconds,
[00:12:44] depending on probably the load on my computer.
[00:12:47] But the basic gist is, so this thing's 10 million times faster
[00:12:50] because we've got this pre-computer dataset
[00:12:53] and we've compressed it, not compressed it,
[00:12:56] we've, I guess, compiled it,
[00:12:58] I don't know what the best word is,
[00:13:00] turned it into this index,
[00:13:01] That's the fastest possible thing that you could make.
[00:13:03] It happens to be the smallest thing you make is the fastest thing you can make, too, which is nice.
[00:13:08] A nice side effect.
[00:13:11] And then, yes, the non-SNVs run through the model, but there's a little SQL database on top of it.
[00:13:16] I didn't try to be fancy there because my assumption is this cache will have 1,000 things in it or 10,000 things in it,
[00:13:23] and the performance isn't nearly as critical.

## The CLI and the service

[00:13:27] And then there's a CLI.
[00:13:29] So you can call it as a CLI.
[00:13:30] and there's you know the gain score the loss score the position i i honestly barely know what this
[00:13:37] means right like you know i i understand high level what it means gain and the loss you know
[00:13:43] the chance that the variant creates a new splice or the chance that the variant destroys an existing
[00:13:47] splice i get it but i don't really get it like i kind of i understand it but just not not viscerally
[00:13:53] i guess since i'm a software person um and then there's a service too right you can basically
[00:13:59] We start up a little service and then call it, and we put it in Docker, and now Knowledge
[00:14:03] Project can call it.
[00:14:05] And the service has its own contract to it, all this other fancy stuff that Claude wanted
[00:14:09] to do.
[00:14:10] It seemed like good ideas to me, so it talked me into it, and we added those features.

## Turning a splice score into ACMG evidence

[00:14:15] And then the goal is really this ACMG evidence, right?
[00:14:18] So we're trying to figure out how to classify variants, and if a variant causes a weird
[00:14:25] splicing to happen or a frame shift to happen, that's going to impact, you know, whether or not
[00:14:31] this mutation is pathogenic, likely pathogenic, or, you know, whatever the scoring systems are for
[00:14:38] ACMG. There's specific scoring systems like BP4 and BP3. I don't really fully understand those
[00:14:47] either. I just know that splicing directly impacts those. And that's it. That's my side of things.
