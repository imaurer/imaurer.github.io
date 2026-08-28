# Precision Oncology, Convergence of Genomics and AI, and Improving Cancer Care

2024-06-27 · Lay of the Land #172 · https://www.imaurer.com/talks/lay-of-the-land-172/

> This transcript is unedited YouTube auto-captions; proper nouns corrected, otherwise expect missing punctuation and mis-heard words.

### Cold open and introduction

**[00:00:00]** at the end of the day all of healthcare is going to be molecular I want GenomOncology to be a core part of that at least from a knowledge perspective if not from a bioinformatics and Analysis perspective I think we we have the software and the the people and the expertise help people do that and then the goal is how do we make it so the provider right that's the industry lingo

**[00:00:21]** for the oncologist or the treating physician how do we reduce the administrative burden the technological burden Etc so that they can spend their time thinking about the patient and bringing empathy and reasoning and their judgment to helping that patient as quickly and painlessly and effectively as possible that's the goal like I've lost lots of folks to cancer in my life

**[00:00:46]** that I love I want to help be part of that solution to [Music] help let's discover what people are building in the Greater Cleveland Community we are telling the stories of Northeast Ohio's entrepreneurs Builders and those supporting them welcome to the lay of the land podcast where we are exploring what

**[00:01:11]** people are building in Cleveland and throughout Northeast Ohio I am your host Jeffree Stern and today had the real pleasure of speaking with Ian Maurer the chief technology officer at GenomOncology and co-lead of the cancer informatics for Cancer Centers AI working group group with over two decades of software experience he and his LED GenomOncology a

**[00:01:35]** cleveland-based software company in their pursuit to provide the Healthcare Community with datadriven insights to improve Cancer Care and strengthen Precision oncology programs by transforming valuable but unusable data into actionable oncology treatment options and strategic insights founded back in 2012 and backed by Cleveland local investors like jumpstart North

**[00:01:57]** Coast Ventures and zap as capital GenomOncology was early to understand the implications of the convergence of genomics and artificial intelligence as it applies to oncology and Ian has been pivotal in architecting and creating their Precision oncology platform to this end this was an incredibly insightful and informative discussion Ian lays out the state of precision

**[00:02:20]** oncology and Cancer Care today and how the field has progressed over time the founding and evolution of GenomOncology to amarate this entire space solving hard problems Building in Cleveland the everchanging frontiers of AI and genomics exponential technology and a whole lot more so please enjoy this awesome conversation with Ian Maurer after a brief message from our

**[00:02:46]** sponsor lay of the land is brought to you by John Carroll University's bowler College of Business widely recognized as one of the top Business Schools in the region as we've heard time and time again from entrepreneurs here on lay of the land many of whom are proud alumni of John Carroll University success in this everchanging world of business requires a dynamic and Innovative

**[00:03:07]** mindset deep understanding of emerging Technologies and systems strong ethics leadership prowess acute business Acumen all qualities nurtured through the bowler College of Business with four different MBA programs of study spanning professional online hybrid and one-ear flexible the bowler College of Business provides flexible timelines and various class structures for each MBA track

**[00:03:31]** including online in-person hybrid and asynchronous all to offer the most effective options for you including the ability to participate in an elective international study tour providing unparalleled opportunities to expand your Global business knowledge by networking with local companies overseas and experiencing a new culture the career impact of a bowler MBA is

**[00:03:52]** formative and will help prepare you for this future of business and get more out of your career to learn more about John Carroll University's bull NBA programs please go to business. jcu.edu the bowler College of Business is fully accredited by aacsb International the highest accreditation a College of Business can [Music]

### Exponential cost declines in genomics

**[00:04:14]** have so I was thinking about where a good place to start our conversation may be and whenever I I think about genomics my mind goes to the exponential nature of technology which for a long time has been a a curiosity of mine really stemming actually from the the investing world but there's this woman Kathy Wood who runs an investment firm called ark and that's actually not so relevant but

**[00:04:42]** what what is is so she uh I think a lot of people are familiar with you know the concept of of mors law which right speaks to the whole observation of you can double transistors every two years without increasing cost and and uh so you ultimately have this exponential growth of computing over time that that we've gotten to to experience over the last 60 years and I I think we'll we'll

**[00:05:04]** probably even talk about that as we talk about AI later but she introduced me to this concept of of rights law which is kind of a kindered observation a Cory to to mors law a little bit that speaks more generally to cost falling constantly for doubling of production and and I always think about genomics when I think about this because when I first was probably aware or introduced

**[00:05:27]** to the whole Human Genome Project in early 2000s I always think about how it you know cost about $3 billion and took 13 years of computing power to to complete on this like order of magnitude of capital and resources that is akin to like a literal moon mission you know yep at a government level and really an incredible achievement but but not at a mass scale uh you know even if you cut

**[00:05:54]** that in half and it was one and a half billion it wouldn't become much more accessible to people but I think what's amazing is over the last 20 years of cost declining 40% year-over-year you can now sequence a genome today in under a thousand dollar and in a few hours and so we've now been able to sequence many millions of human genomes not just an aggregate but even at an annual you know

**[00:06:18]** clip now and so all that is to say I I've long been interested in understanding what are some of the implications of this exponential unlocking in practice and what company can do who are plugged into to what what is now possible and so I'm very excited to hear your story more about the work you're doing at GenomOncology and and that it's happening you

**[00:06:43]** know here in Cleveland because I I think that that particularly is awesome yeah I've seen the charts I think ni IH had one where they were showing that Mo's law going down at an exponential you have costs or whatever per P flop or however they were measuring it and the same thing with the human genome right and it was starting with that 3 billion price point for the first genome and

### Founding of GenomOncology

**[00:07:01]** going all the way down to a th000 and eventually $100 and eventually free right like that the goal is to have this stuff basically so easy to do that it's basically free to do right and that that actually is the kind of the founding of the company was back in 2012 2011 at the end of 2011 there were a couple papers in nature where they you know they described you know how could we use

**[00:07:22]** genomic analysis and other you know OMC analysis to analyze a cancer patient's tumor and then figure out what to do based on that information to then help treat the patient unfortunately it took six months to actually do all the bioinformatics and and the the technical work needed to do that analysis and so when our founder read that those papers it triggered oh I've been doing

**[00:07:44]** bioinformatics since the 70s before it was actually even called by informatics and we could go ahead and we could solve that problem in here in Cleveland with with folks he knew so that was really the founding of the and the joke at the time was really you know $100,000 genome and $100,000 analysis right so yeah great you can do that you great you can get the AC's G's and T's off of a off of

**[00:08:05]** a Next Generation sequencer which was the devices that kind of emerged in the mid 2000s uh led by alumina and thermofisher but actually doing the technical work to understand what those mean that's a good technical Challenge and we could we could work on that and that's really the founding of our company so we we were talking before uh we we pressed record here about our our

### Chasing the hardest problems

**[00:08:28]** mutual friend akos who used to work with you at at GenomOncology and I had asked him you know what question or topic should I be sure to to ask you about and uh he he brought up your philosophy around explicitly opting to Chase and follow the hardest problems and to me that felt like a great place to kick off you know understanding a bit more about what motivates you and how

**[00:08:55]** you came to be doing the the work that you're doing and uh you know as a as a seg to to genome which we'll get to but really in reflection on on your whole journey yeah that's great uh yeah the hardest problems are definitely kind of my North Star it's what I enjoy working on I enjoy working on the hardest possible problems I honestly get bored if it's something that it's kind of like

**[00:09:14]** oh make another website or what have you and and so in the 2000s I did a I did do some hard problems around e-commerce which was basically like how do you get money from a credit card or how do you ship something to a person and that those were hard problems in the 2000s they hard problems anymore right Shopify and and Amazon or whatever kind of solve so I was getting I was getting a little

**[00:09:35]** bit restless so when my friend manual started this company and told me about it I I approached him and said hey I gotta I gotta I gotta join you I got to work on this because this sounds like something interesting and something fun to do and so when it comes to building a company you know creating value software is an unbelievable you know marginal utility

**[00:09:54]** right so you can create something once and and then sell it unlimited amount of time which is great but to sell something in software that's actually useful and something that actually solves a really hard problem that's how you differentiate yourself that's how you have a mo of any kind right and so the hard problems are really what I gravitate towards because

**[00:10:13]** I know that that's where our clients are or our clients are going to need us so when we go into a new client and we help them with their existing problems it's always looking around and talking to them and trying to figure out what are they struggling with what other challenges do they have that are adjacent to the things that we've already solved for them because I know

**[00:10:30]** that that's a good direction to take our product so that because if they're having those problems I'm sure other folks are having those same problems so let's go ahead and try to tackle those and solve them because I also know that all these institutions that are not software development organizations by Nature right they're they're either cancer centers or reference Labs they're

**[00:10:50]** busy solving they're busy doing their work which is helping patients we can help them by creating software that's easy to use and integrates within their their environments and makes their jobs better it makes their jobs better by letting them do more or do do more to higher quality so I think entrepreneurship almost by definition involves hard

**[00:11:14]** problems but I think you could find hard problems outside of Entrepreneurship and so I'm curious you know where your draw to entrepreneurship specifically as a as a means to to tackle hard problem stems from I think that that's a patience problem of mine I don't I'm not a very patient person so I I don't do well with

**[00:11:36]** bureaucracy I don't do well with meetings like if I'm going to be in a meeting I want to be in a meeting with like the people that matter for that particular problem and like let's solve that problem and get out of the meeting right like uh so my my Mantra at one point was no meetings no bugs right like let's not create bugs because bugs are failure demands that cause us our team

**[00:11:56]** to slow down and meetings or once again not they're not useful in their own sense you do do them as a necessary evil and when it comes to hard problems I'm also very focused on essential complexity not accidental complexity right essential complexity is like this is a hard problem because it doesn't exist in the world nobody knows what to do like That's essential complexity but

**[00:12:20]** once you've solved it now it's no longer essential it's now whatever complexity you have left is how do we build the software how do we test the software how do we deploy the software how do we educate the people all good problems but you got to think about it in a way that you can put the thing to bed right like how do I solve this problem so it never shows up again and fortunately for me I

**[00:12:41]** I have a job where I can solve problems once and then they kind of go away I know that there's other folks and other lines of work where it's like you wake up every day and you have to solve the same problem every day it's just new people or new types of spins on the same thing I'm just not wired to work in that kind of environment so entrepreneurship is perfect for me because it's like

**[00:13:00]** small teams doing hard things moving quickly and I did that in the Consulting world the problem with the Consulting world was you do that for nine months you have a successful launch with your client and then they give you a handshake and say hey thanks for your work get out of here because you're too expensive like we want we're gonna have this done by our internal team or we're

**[00:13:19]** gonna offshore it or something like there was no there was no ever re reaping of the reward of the of the value of the work that we created so with geology I build a product in 2012 and we're still working with it 12 years later and and I know that that that the company is getting value from that that same thing and so the effort that I can put in i' I'm getting the benefit of

**[00:13:41]** software which is that that marginal utility of write it want and use it forever yeah that's real agency you know and and ownership and all the all the benefits of trying to solve these hard problems I want to do a little bit of of stage setting before we we get into the the heart of it but but kind of paint a picture for us maybe of of what Precision oncology looks like and cancer

### What precision oncology means

**[00:14:05]** therapy and and bioinformatics and just the the space that that GenomOncology is operating within you know may maybe around the time even just before it was founding and some of the history that you know created the opportunity for for this whole undertaking in the first place sure so obviously cancer has a long history I'm not going to go into that what we do for cancer patients at

**[00:14:28]** this this point right are with when you have a tumor right it's like you cut the tumor out you radiate the tumor or you poison the tumor right the cutting it out's good hopefully you can cut the whole thing out and not have Mar you know the margins are clear or whatever what have you radiation's fine because it's targeted but once again you're doing something damaging to your your

**[00:14:49]** body to do that and then chemotherapy is basically a poison and you're the tradeoff is I'm going to try to PO poison you in a such a way that it poisons the cancer fast so than it poisons the rest of your body obviously not a great trade the promise and of Target what's called targeted therapy Precision oncology and now immunotherapy as well those are all interesting topics

**[00:15:11]** subtopics that I can kind of unpack a little bit okay so first genomics fundamentally right there there can be Nuance to this but fundamentally cancer is uh a disease of the genome right you have some breakdown right there if you sunlight hits your skin in a very specific way and changes a DNA base pair from a t to an A on a certain chromosome on on you know the seventh

**[00:15:36]** chromosome at a specific position it's going to change the mutation of a given Gene uh from from basically a e to sorry from a v to an E and this is this is a specific type of mutation that's happened that's going to cause that cell to continue to reproduce and not die so now the question becomes okay so you take that tumor you can actually cut the tumor out and then you can sequence that

**[00:16:00]** that that tissue you can do the DNA sequencing on it and understand okay we do see that change that goes from a v do here on that particular chromosome of the the of the cancer cells well there's targeted therapies for that right there's actually FDA approved drugs that will help people with melanoma uh fight that that particular type of of cancer yeah so that's the Precision part right

**[00:16:25]** you're looking at the data for a specific patient and then you're giving a drug that's targeted at that specific patient's exact disease type not just class of disease another thing to recognize right is cancer is not one disease it's thousands literally thousands of diseases that are in in in these ontologies of medical ontologies okay so that was targeted

**[00:16:45]** therapy we talk a little bit about sequencing genomic sequencing and there are different versions of this but genomic sequencing can actually look at small areas of the human genome just look at specific hot what are called hotspots areas of of Interest based on cancer that we know there are genomic tests or you know where you actually just look at

**[00:17:05]** the genes of specific cancer diseases and then there are whole xome where you're looking at the protein and coding sections of the genomics and then the whole genome processing eventually we're going to get to the point where we're just doing testing everything because it'll be so cheap and you might as well just test it all and then by testing it all you'll also have a a baseline where

**[00:17:24]** you can actually say okay that person's you know germ lines here and now as things evolve over time we'll we'll be able to learn how your genome and transcriptome and all these other types of omix evolve over time we'll be able to measure it and we'll be able to help treat patients uh more effectively and then the last part is the immunotherapy immunotherapy is really the idea of you

**[00:17:47]** know can we you know cancer is good at tricking your body right not only is it tricking you know causing it itself to grow but it also tricks your immune system to not fight it there are ways of like kind of amping up your immune system we're giving it information to then have it more effectively fight the cancer so that's another tool that has has really evolved over the last 10 or

**[00:18:07]** so years and so GenomOncology is really in the business of of helping providers um know what the options are providers are you know clinical oncologists and molecular Pathologists help their patients uh better and I can I can tell you more about the ecosystem of our tools and and knowledge that we have in our system no absolutely I i' love to hear about those maybe as a a

### Early days and first products

**[00:18:32]** way to approach those I love to understand though at the onset you know what were it feels like the the possibility the the breath of things that you could have possibly chosen to tackle is enormous at the beginning under you know this this umbrella problem space how did you know which problems to to start with on

**[00:18:58]** the Anis side yep and and and what did that actually look like at the beginning yeah so what it looked like at the beginning was what data was available so we actually were able to there was a project called the Thousand genomes project we downloaded all that data which was basically the full genomic you know makeup of a thousand patients and and then we actually built a prototype

**[00:19:18]** solution that we called our research application and basically what we were able to do was in 2012 on a Mac Mini and these Mac minis are way better than they were 12 years ago on a little Mac Mini you know the four $500 machine you can buy it an Apple store we were able to ingest the Thousand genomes and build a research application that let you you know not only look at each of the

**[00:19:40]** genomes that were in there but do these crazy you know what called set theory type analyses where you're like okay show me all the variants that are in this subgroup of folks but not in this subgroup of folks and you know in and of itself that research app on top of you know open source data wasn't that interesting but we were able to show that to

**[00:19:59]** Folks at different Convent you know these conferences that people go to and and eventually we were able to land three engagements as a small you know four person company where we were behind firewall working with the teams at Ohio State and Roswell Park in Buffalo and and pit in Pittsburgh and the theory was okay we'll get in there we'll work with really smart key opinion leaders and

**[00:20:22]** we'll help them solve their problems like we'll just figure out what their problems are and we'll help them solve them and then hopefully over the next couple years we believe that people will start thinking about this stuff earnestly and how to use this information to help treat cancer patients that was kind of the that was kind of the bet or the approach was

**[00:20:38]** let's go do something that we know how to do which is you know analyze data quickly because you know we've got that skill set and then use that to to basically make friends and then we had friends and and those friends would then tell us you know what they were really struggling with and the theory was that you know people would start using genomic information in my 2015 15 or

**[00:20:59]** 2016 to actually start making reports and treating patients that actually happened way faster than we expected so we ended up building our first commercial product in 2013 which is what we call our clinical workbench work pathology workbench which is really a high performance reporting engine and what it does is it basically at these labs and we've got about 50 Labs across

**[00:21:21]** the country that work with us they have these devices from alumina and thermofisher where they're sequencing the tumor of data which generates the DNA of that information which is all just AC's G's and T's what our software then does is take that information and help them quickly interpret it and report on it so the interpretation is first validating

**[00:21:45]** the quality of the run right did the sequencer do its job did it actually understand AC's G's and T's and a and did it report because these things aren't perfect did it report the information accurately yes it did great Next Step for each variant is this a good variant or a bad variant is it benign or is it pathogenic and we have a database that

**[00:22:05]** we curate and and an augment that has that information and then once they've made those decisions then they then it uses our knowledge base again to then say okay what are the therapies what are the clinical trials what other information can we tell this doctor or this pathology pathologist to about that that particular patient in their case so that was the that was the goal so at the

**[00:22:27]** very beginning was let's build something that's useful make friends and then try to figure out where their next problems are and hopefully be ready uh to take this thing and make it useful in in clinically helping patients it's such a a sound strategy you know it I feel like people over complicate the the process left but yes

**[00:22:49]** if if you ask people what their problems are and they tell you and then you help solve them and you build trust correct that was uh it resonates as as my as part of my own Journey as well that's that's where it came from it's just asking people for sure yeah and Paul gr I mean Paul I used to read the Paul Graham essays all the time and it's just about

**[00:23:11]** getting out there and talking to people you know I'm a software developer I'm more introverted than most and you know going out and talking to folks is is not your not necessarily my first choice on on what to do every day but that's the best way to learn it's like find out what people what their problems are and then try to help them with their problems and that's how you can actually

**[00:23:27]** make something that's commercially viable with that being said did you feel there was a an over riding Vision at the beginning of what genome could become kind of the the North Star Beyond you know your personal one of of finding the hardest problems to solve but of what the kind of company genome could become and the impact it could have could be yeah I mean we've always had the

**[00:23:51]** vision of you know medicine is going to be it's going to be completely rolu uiz by molecular data right the fact that we don't use molecular data in almost every decision is is kind of silly at this point and one of the fundamental problems right now is that the EHR the the medical health record systems they're mostly very good at like billing and they're very good at like

**[00:24:16]** reimbursement type stuff and and insurance tracking but to make them useful in a clinical decision setting they have to be more om scale they have to actually scale to handle data like GenomOncology does so fundamentally we believe you know Healthcare is going to be molecular being able to do the the basic analysis of that information is is you know it's a tricky computer science

**[00:24:43]** problem which makes it kind of fun and so you need to be able to design your system so that they scale and then from there then need to then figure out what are the different pieces parts that are going to be needed for a end solution and you know the thing that wasn't necessarily obvious at the beginning was how much knowledge was going to play a part into this and right we'll get into

**[00:25:03]** the AI stuff later but the knowledge that we've curated into our system which we've spent at least 100,000 man hours I don't know the exact number of hours of you know building a knowledge base that powers these reports that we do we run these things called tumor boards and then just a lot of other different use cases where you know understanding with High Fidelity and high accuracy what are

### Reducing the burden on doctors

**[00:25:26]** the best next steps for a patient that's really what the GenomOncology system is designed to do well I'd love to you had mentioned doctors and the administra burden if you will of of the health record systems MH to to me it seems like perhaps the biggest risk would be that doctors maybe get lost in in all this and and kind of the inundation of information you know from from my time

**[00:25:52]** ahead at at my own company you know you come across this stat but it's it's very much grounded in a reality that doctor spend you know maybe 2third plus of their time on some administrative task and not clinically working with patients you know a shockingly high percentage of the time which always kind of felt a little ridiculous and ultimately unacceptable to me

**[00:26:14]** especially given this period of distress that specifically practitioners have been under since the the pandemic but I I'm curious how doctors are supposed to keep up with the vast amount of information that you know you've mentioned related to all these things that they need to keep track of from the the genomic tests to the clinical trials to new drugs you

**[00:26:34]** know in the wake of of thousands of different types of cancers and mutations can you speak a little bit to the world of of doctors and where GenomOncology has positioned itself best to navigate you know actually serving patients who are who are going through this stuff yeah so I described our pathology workbench which is our first product and one of the key things we do when we sat

**[00:26:58]** Des a new client up is help them design their first their report right so they're doing this test they're going to test 500 genes or 800 genes or the whole XOne or whole genome really at the end of the day their product the thing that they're actually putting their label on which is a white label system we don't put GenomOncology all over the report it's their report the first thing they

**[00:27:15]** got to do is figure out what's the report look like and there's many considerations like one consideration is just completeness of information and Regulatory Compliance and other things that they need to do and and that's why the reports can be like 20 Pages or 80 pages long right but really the most important thing is what do you put on that first page because the first page

**[00:27:33]** is actually what the doctor's definitely going to look at right they might dig through it but they got they're only gonna they might only have time and they might only have understanding of like how to read that first page so really designing that first page is critical for those new engagements in genology actually spent a few years back we spent a lot of time building our first you

**[00:27:52]** know redesigning our kind of default report every one of our clients gets their own copy of our software own copy of our report we've designed our system in a way that it's like automatically deploys and and it handles all these customizations that I just talked about even though it's you know at all these different clients but they can all have their own report but

**[00:28:09]** we have a default report that they can accept and I think I think like half of the clients just take our our default report and they kind of just had their colors and logos and stuff to it and the reason why they do is because we put a lot of thought into making that first page really good and that first page has to be really good from like you know what are the most critical information

**[00:28:25]** well most critical information is what biomarkers did I find what biomarkers of Interest did I find and then the other thing that's really interesting is what biomarkers of Interest did I not find because there are specific biomarkers that people are looking for because they know oh I can go give this immunotherapy or this targeted therapy so you get to tell them up front you know they didn't

**[00:28:44]** have this Gene this Gene was clear so making sure you know that about your client and what their you know what their goals are and their intent is is really critical you don't want them having to read an 80-page report to figure out what didn't what didn't they find and so that that that's a great lesson right because that because it gets back to the whole goal of you know

**[00:29:02]** once again making this stuff as as fast as possible for the ordering oncologist so they can help patients same thing on the molecular pathology side for the folks using our software to make this report we've really worked really hard to understand you know what slows them down what what information do they want at their fingertips so they can make the important decisions because at the end

**[00:29:21]** of the day we don't make any decisions we're decision support software we are not decision- making software our clients are the ones that through their electronic signature are the ones actually making the final decision and and signing out the report and so that's that's a key thing so then your other part of your question was you know how do we reduce the burden on doctors so

**[00:29:41]** we've had this whole EHR thing over the last 20 years now this experiment that started in good with good intention yeah and the problem is it's now you know you go to the doctor and you sit there and you can see that the doctor is spending half the time looking at the computer and typing right like that's the worst possible solution and I think everybody recognizes that and there's there's even

**[00:30:01]** more burnout from doctors lots of lots of articles in the Atlantic and New Yorker about how doctors are all burned out so I think AI has a lot of opportunities there I'm not in this space at all this part of AI space and that that part of the AI space is what's called ambient technology right so basically listening to the doctor and the patient having a conversation

**[00:30:20]** summarizing the information and turning that into some notes and then that those notes can then be edited right in dra from draft mode edited by the doc and and sent into the EHR which is a great thing and then there's other honestly other like billing and other types of of push-ups these docs have to do where instead of like having to write a letters of necess of medical necessity

**[00:30:41]** or whatever the letters are called you know having them write those themselves they can you know basically ask chat GPT okay I have this patient here's the situation write me a letter right and here's the letter for you and now send it off so that's another you know another area but now we got the now you're going to have the the bots on both sides of the thing you know

**[00:30:59]** basically reading and rejecting automated notes yes for sure lay of the land is brought to you by impact Architects and by 90 as we share the stories of entrepreneurs building incredible organizations in Cleveland and throughout Northeast Ohio impact Architects has helped hundreds of those leaders many of whom we have heard from as guests on this very podcast

**[00:31:23]** realize their own visions and build these great organizations I believe in Impact architects and the people behind it so much that I have actually joined them personally in their mission to help leaders gain Focus align together and Thrive by doing what they love if you two are trying to build great impact Architects is offering to sit down with you for a free consultation or provide a

**[00:31:44]** free trial through 90 the software platform that helps teams build great companies if you interested in learning more about partnering with impact Architects or by leveraging 90 to power your own business please go to ia. lay ofthe land. FM the link will also be in our show [Music] notes so I'd love if you I I definitely

### Evolution of the product line

**[00:32:08]** want to unpack the artificial intelligence side of this with you and and maybe where a lot of this is headed but take us through kind of the the evolution of of GenomOncology as a as a company throughout throughout this kind of product offering so we started in 2013 with mythology workbench and we grabbed some early adopters right and we saw real quick uptake signed a lot of

**[00:32:30]** new deals and I think once we actually hit the the you know Clayton Christensen whatever the the valley is between your early adopters and and your late adopters I I forget the those those terms from that book you know we we hadit a little pause there in the middle of of the 2010s and we started looking for other opportunities like how how else can we take this technology to

**[00:32:50]** Market and and where else could we be of use and so the cancer center was a was an obvious next stop so one of the key things that I ended up doing to rebuilt this pathology workbench it does reporting there's a knowledge base that's part of that so we actually have a system to let them curate or let our team curate knowledge to then populate that report we had folks that were

**[00:33:12]** coming to us and saying hey we we just want that knowledge we don't actually want to do a we're not a Pathology Lab we don't need to do reporting can you just give us access to that knowledge and I realized oh there's another product here like we can't help them right now but what's that product so the first product I built was what what we call our API or API Suite application

**[00:33:30]** programming interface which means a computer now can just talk to our knowledge base and ask questions to it and what that unlocks is our clients can now build solutions that now have the GenomOncology inside of it right the Intel old Intel Inside Mantra where they can actually use our knowledge base using whatever bioinformatics you know database they have or knowledge that

**[00:33:52]** they have or whatever use cases they have they can now use our knowledge base to power whatever solutions they have and then we have quite a few clients that do that and then as well uh we have now also built our own uh Solutions on top of that API so we have a solution for what's called a tumor board and this came out you know the late 2010s the tumor board is what

**[00:34:14]** happens at a you know large Cancer Center where there the really hard cases are discussed maybe every week or every month or so depending on the size of the the cancer center and so what happens at a tumor board is usually it's a cross disciplinary uh group surgical pathology that kind of thing all kind of all on one web X or one zoom and they're all talking about hard cases well our

**[00:34:39]** software helps because it can basically do all the Google searching for everybody right rather than having everybody on their phones Google searching our software is there driving the presentation you know dealing with the information making high level you know recommendations of content and then the the folks the experts in the room can

**[00:34:57]** then look at that information dismiss information highlight selct information and make a report make a recommendation for the treating oncologist and then we also have treating tools for treating oncologists and clinical trial folks less than 5% of cancer patients end up on clinical trials and that's bad for a couple of different reasons one that means we're not furthering along the

**[00:35:19]** knowledge collectively on what which of these drugs could could be helping cancer patients quickly yeah um and also this an access problem right that the folks who do get on clinical trials more often than not have you know privilege be you know relative to the folks that don't get on clinical trials so we need to open up access to to these clinical trials our software can actually help

**[00:35:43]** with clinical trial with called Clin clinical trial matching and Recruitment and enrollment and AC cruel through a variety of different ways matching a patient to a trial is actually a very difficult task because it's not only is the trial open but is the patient have the right disease type is the patient healthy

**[00:36:03]** enough is the patient have these specific biomarkers has the patient not had or has had some prior treatment all those types of criteria need to be evaluated and matchmake against the actual trials themselves and you can have more than one trial at a time keeping that information in your head is not really possible what our software does is actually does that problem it

**[00:36:23]** actually can solve that problem so we can and we can do it at scale meaning if you have a you know Cancer Clinic where you're you know taking in 100 patients each week and doing the genomic testing our software can be running in the background analyzing patients and identifying potential matches hey this you know we have 20 trials ongoing we got these 100 patients of these you know

**[00:36:45]** whatever 2,000 combinations let's go ahead and we've highlighted you know 15 things to go to go look at so rather than having to have a human do that manually they can use our software to kind of do that matching and so that was the next evolution of our software is really getting into the clinic and using our knowledge base to power these different uh use cases and you know

### Measuring outcomes and efficacy

**[00:37:05]** there's we're continuously challenged by clients with you know new things that they're working on and and how molecular information and biomarkers can uh be used more effectively to help patients and care and care of the patients how do you think about efficacy in in outcomes like ultimately you know relative

**[00:37:28]** to where a doctor might be without the ability to use GenomOncology what is the effect of introducing what you guys have built into the equation great question problem is we don't have access to all that data right so the that's the challenge so it's so we've done you know trials guess not necessarily the right words not not typically a clinical trial but it's

**[00:37:51]** basically a research initiative with clients you know using our software and understanding you know how does our software help in the ecosystem of decision support and and it does right it's you know makes their jobs doable to a degree right we we've done backwards analysis where it's like oh we you know we did clinical trial matching for a year before bringing in GenomOncology

**[00:38:15]** now with GenomOncology we we would have identified you know 50 or 100 more patient than we could identify just by hand so there are there are you know discussion points like that but unfortunately it's really difficult at a Cancer Center to really understand the Final Destination right tracking progression free survival is is the terminology that they use in clinical

**[00:38:37]** trial without a clinical trial because that's the mechanism by which um you know these things can get FDA approvals for drugs for instance unfortunately genology can't afford to right now afford to run a clinical trial at that kind of scale but we'd certainly be interested in in working with institutions that are are looking forward to doing Precision oncology

**[00:38:58]** based software interventions and doing it in a systematic way right because you kind of have to do it in parallel where you do here's you know here's a thousand patients that we're going to S you know serve this way versus a thousand patient that we're not going to and to actually get that to that raw data to to do that analysis but in general you know we look at our success as being you know we

**[00:39:19]** don't lose clients right so you know 98% retention rate of clients and really high net provider scores I guess what they're called NPS scor so we we look for those types of of metrics uh to help guide us and make sure we're doing the right stuff uh and then we're always also interested in doing you know deep studies with with folks that are interested in that so

### Implications of AI

**[00:39:42]** what are the implications of AI on the the work that that you're doing great question it's where I spend a lot of my time thinking right these days uh so back in November 2022 right chbt 3.5 came out I said oh crud do I have a business anymore like let me go figure out what this thing actually knows and I figured out pretty quickly that it doesn't doesn't uh it does fall down on

**[00:40:05]** on complex stuff like ours and I'll explain what I mean in a minute and then March came and that was when GPT 4 came out and I had the same same worry and I I was relieved to see that this thing's not going to put us out of business anytime soon but I did realize oh this is a really good coding assistant so I use it every day for coding and I use now I'm using Claude anthropic as well

**[00:40:26]** every day for coding so that's good so the question is in our business why can't chat GPT or its equivalent GPT 5 right that's going to come out in a few months we think why can't it do what genology does and it really comes down to a couple different problems first the way that they're trained so GPT right generative pre-trained model is created by predicting the next

**[00:40:54]** token which is a really neat trick like the fact that that works at all is amazing to me I wouldn't have guessed that uh so they do predict the next token on on all the words in the internet right whether they had the copyright right to do it or whatnot I'll let the courts decide that and now you've got this this thing that can predict the next token and that's what

**[00:41:12]** it does it basically has a model of the world and can tell you what the next most plausible word is based on all the previous words and through that it has knowledge incorporated into it which is which is cool the problem is one it's a it's a black box we actually don't know what it actually knows we don't know what the data was trained on the people who have created it can't tell you why

**[00:41:38]** it does what it does it hallucinate right it will just make up things it doesn't know when it's lying because it actually isn't lying it doesn't know what the truth is it just knows how to create the next token you cannot build a clinical decision support system off of something that's a black box that hallucinates hallucinate Ates the the word that they use for making stuff up

**[00:42:00]** um they have bias encoded into them right the world has bias the internet has bias therefore you know no matter how much they work on trying to kind of clean up the bias there's going to be bias in those Solutions that's understandable they're not up to date right so they have a cuto off going at some point they stop training it because they have to get it to Market and the

**[00:42:20]** way that they work is you can't just be like oh let me go add some more stuff I'm going to go add February to the January data it doesn't really work that way and then it's not genomic scale meaning yes it has all the text of the internet but it doesn't know all the text of the internet and it certainly doesn't know all the variants in the human genome that are possible in what

**[00:42:38]** they mean so at that point those are the kind of like the the foundation of why they don't replace what GenomOncology does but they are still super useful and how they're most useful in my world the way I'm thinking about them and you know this might change this is April 9th 2024 so I you know keep that in mind when you're listening they are really you know one

**[00:43:02]** phrase that I've heard is word calculators right they understand what people are saying they understand my intent they know what I they know and if you can get good at prompting them which is called prompt engineering by some folks you can get good at prompting them what is prompting you're basically telling them clearly and concisely what you have and what you want and if you

**[00:43:22]** can tell them that those two things it can kind of fill in the middle for you not even tell you why but you might want to actually ask it why like have it explained to you its thought process and it will do that and it'll get you'll get a better result actually if you do that and then it will generate an answer and so that's called prompt engineering and I've just and by

**[00:43:40]** saying what you have and what you want you're giving it examples in the the lingo in LM in the AI spaces few shot learning you're basically giving it a few shots of of of examples of what you want and then you're asking for it to to give you an answer and by having it explain itself where you have it explain its thought process you're giving it a chance to kind of work out the Kinks of

**[00:44:04]** its thinking just like humans do right I'm kind of talking right now and I'm kind of trying to express myself well giving the large language model time to express itself that's called Chain of Thought where you're basically having it kind of talk out its thought process and then it actually generates a result you get much better results when you do those things so you know that's kind of

### Building an oncologist assistant

**[00:44:25]** the background and what I'm doing is I'm actually integrating it with our API and so what a lot of folks do is they do a thing called rag or retrieval augmented generation which is the idea of the chatbot is given text from a database right you basically you know if someone ask a question you use that question to go find relevant content from your database you stick that content in your

**[00:44:46]** prompt and then you have the large language model reason over that text and then response it just does a better job when you do that another technique that you can do is what's called tool usage which is you give it a tool you say okay here's a tool or five tools or 10 tools you can use those tools as you need to just remember large language model you're not good at math you're not good

**[00:45:07]** at knowing what the weather is you're not good at knowing what genomics are you tell it that through prompting what it's bad at and then you say okay you're bad at those things but you're really good at understanding what the the person you're talking to wants so try to understand what they want and then use these tools to help them that's your whole goal and if you explain it to the

**[00:45:26]** to the chat bot like that and then you give it the access to the tools you can actually get something that's that's almost a product right it's still honestly it's early days a lot of these things are demos that's why chat Bots are kind of still the the best product because the human in the loop is responsible for for figuring out what to do with it and so that's what I'm

**[00:45:46]** building I'm I'm actually building provider you know for an oncologist an oncologist tool let them have a conversation with the chat bot that has access to our API to both retrieve back you know trials therapies and other information for a patient and and that's the kind of the long-term vision of of of where we see you know our knowledge base and I think AI is actually a great

**[00:46:10]** compliment for genology in that this stuff's hard building user interfaces that can deal with all of the clinical information the bioinformatic information trials the therapies all that stuff it's very overwhelming so think about the most complicated user interface you have have to use at work or whatever and you you can see you can see what I mean having an experience

**[00:46:35]** that where that complexity is kind of hidden away from you but can then be selectively retrieved into chat experience or you know eventually it won't be just chat it'll be more Dynamic and you you know uid driven having this agent or assistant help you kind of navigate that that world would be so so great for GenomOncology because the thing our our our desired and clients

**[00:47:00]** they don't have time to learn another software product they don't want to go learn how to use some complicated uh you know it's like saying oh you have to use Adobe Photoshop to do something to do your job it's like good luck I've never I've tried to use Adobe Photoshop it's way too complicated for me I couldn't I couldn't use it so doing the same thing with a doctor is really challenging so

**[00:47:19]** I'm excited that you know large language models especially you know maybe the next year or so will really let us let our our clients truly take advantage of all the knowledge that we've curated over the last 12 years no I mean it resonates very deeply I mean ultimately from any product's perspective right the user is trying to do a job they're trying to solve a

**[00:47:42]** problem trying to do a task and their their job is to accomplish that task and not to become an expert in in whatever it is that that you've built and they want to learn my software and I don't blame them I would not want to learn learn our software either the molecular pathologist has a very important job which is like make a report in 15 minutes if they didn't use our software

**[00:48:02]** it would take them six hours so the trade-off to them is night and day where in the oncology space it's well I could not you learn that software and then basically just keep doing what I'm doing or I could spend six hours to try to learn the software and make my and make my decision- making a little bit better well that's that's a that's probably a good trade to make

**[00:48:23]** sometimes but you don't know which software to do that with right so yeah you basically spend your whole they don't have enough time as it is right the job is not to become an expert in the software the product must solve a problem exactly well and what's really interesting to me about about all your your perspective there is I mean you mentioned at the at the beginning you

### Convergence of sequencing and AI

**[00:48:42]** know we talked a little bit about mors law rights law the exponential cost declines of this technology and maybe the the trit saying in in your industry that you know we're down to $100 sequencing now but it's thousands of dollars for analysis it feels like the convergence of the the technology from the the sequencing side and the AI you know the the Confluence of those two

**[00:49:04]** things might be very powerful here yeah no agreed and and one thing if people are going to remember one thing large language models don't search you feel like they're searching like you're asking a question it feels like they're searching information to like respond to you it's not how they work fundamentally they're not searching they're predicting the next token so our system is really a

**[00:49:26]** search Eng engine it's just a very complicated search engine that lets you search by a patient like basically a patient and all their DNA and all that stuff is basically a query and now you're quering our knowledge base bring back the relevant content and now the large language model can then reason over that content what that large language model is doing is basically

**[00:49:44]** replacing learning how to do our search in our software does that make sense yeah maybe I think so who what on the horizon in the space is most exciting for you when when you think about you know genome in the future and and and success and the kind of impact that you hope to have looking back in retrospect what do you see coming you know given all all

**[00:50:10]** these things and how and how in reflection actually you know you you even mentioned earlier as well the the progress is is maybe even faster than than we've expected it to be well you know I think at the end of the day all of healthcare is going to be I want GenomOncology to be a core part of that at least from a knowledge perspective if not from a bioinformatics

**[00:50:33]** and Analysis perspective I think we we have the software and the the people and the expertise help people do that and then the goal is how do we make it so the provider right that's the industry lingo for the oncologist or the treating physician how do we reduce the administrative burden the technological burden Etc so that they can spend their time thinking about the patient and

**[00:50:55]** bringing empathy and reasoning and their judgment to helping that patient as quickly and painlessly and effectively as possible that's the goal I've lost lots of folks to cancer in my life that I love I want to help be part of that solution to help reduce that pain and suffering in the world so so that's that's the that's the real goal the way I'm tackling that goal

**[00:51:22]** is through what I'm good at right I'm not good at the stuff that oncologists do good at the stuff I do which is solving her technical problems and and I think that the things that GenomOncology can do is just continue to scale because it's going to become a scaling issue there's so much data when it comes to genomics and other other stuff so you have to you have to have the right

**[00:51:40]** algorithms honestly to be able to parse and process and and index and search this information and then how do we leverage these new amazing and sometimes scary artificial intelligence tools to be an amplified and an augmenter of expertise right we're all experts at something every human right is an expert at something and these things if designed and used appropriately can be

**[00:52:08]** all our assistance and make us all 10x better at whatever we are an expert at it doesn't have to all be about you know generating images and silly songs and and other stuff that nobody really wants it's it's really about helping helping Humanity you know solve our most difficult problems and I think uh and I think that's that's where you know GenomOncology is going to be a major

### Advice for cancer patients

**[00:52:33]** contributor to you you had mentioned your your one takeaway for for AI I'm curious if you were to offer a a similar takeaway for oncology and cancer you know having spent the last decade working in this in this field what is something that you wish more people understood about it that maybe we don't well if you have a loved one that has cancer here's my number one advice for

**[00:53:00]** you find an expert not to you know bmer folks that are uh working in the community but if your doctor if you have melanoma and the doctor you saw you're seeing just saw a cancer patient before you and a patient with gastro intestinal cancer after you they are not an expert in your disease and as of right now the best thing you can do for yourself is to go find the

**[00:53:27]** person who is an expert if you can afford it that's the number one piece of advice the second piece of advice is make sure you're getting and asking about genomic testing not everybody does it not all the doctors do it you think that it would be standard of care but it's not insurance companies don't necessarily pay for it but there's there are angles around it call the advocacy

**[00:53:47]** groups for your disease type we work with a group called The Pancreatic Cancer Society and they will help any pancreatic cancer patient using our software find a clinical trial find a doctor and they will help you analyze the information that's that's presented in your genomic reports so you know you have to kind of you have to be your number one Advocate to yourself

**[00:54:11]** unfortunately and then as far as genomics and bioinformatics and and and that information and that it's a great it's a great field I think that that's um you know I think that there there's still lots and lots to work on and so if you're a young person that's that's looking for you know a direction in life and you're interested in really hard problems look into systems biology look

**[00:54:35]** into bioinformatics look into these different Technologies because I think uh just being a computer scientist like myself I'm a computer engineer I don't necessarily think that that's the the right idea for the future I think you're going to want to have an intersection with you know two or three other skill sets whether it's being able to sell or being able to write software or being

### Lessons from company building and Cleveland

**[00:54:55]** able to you know manage and understand genomic data those are all good skills to have and being at the intersection of something is a good way to have you know kind of uh being more distinctive in the marketplace and standing out I I'll pull on your advice to a younger self in in the spirit of of that reflection what would you say is kind of the earned

**[00:55:17]** wisdom that you have from the entrepreneurial process and the company building side and the the business side of this so many different things be patient right things take a long time we're still I mean I still think of myself as being in a startup we're 12 years old now at this point we're you know we're still I still feel like we're startup we're very entrepreneurial and

**[00:55:36]** and and willing to fight thing fight for the the next deal and and get stuff done very collaborative environment so don't expect it to to to work overnight you startups only fail when somebody finally gives up right that's that's how they actually technically fail so I think that that those are good lessons to learn but I think right now now there's never been a better opportunity right

**[00:55:59]** with if you're ambitious and you're you know looking to solve hard problems and you're looking to learn new things that's a great way to to go if you're just interested in making money or what have you probably should figure out a big corporate job and that's that's probably a smarter path but from an entrepreneur perspective there's going to be that people talk about like the

**[00:56:19]** three person billion dollar company right there's going to be more Instagrams than there you know mid Journeys and all these other small companies that just have enormous scale so those are those are those are interesting things and maybe stay out of healthcare right Healthcare is a tough a tough business to crack so maybe you want to stay out of healthcare and go

**[00:56:37]** more B Toc or something yeah unfortunately because we there's a lot of problems in healthcare there's there's a lot it's it's tough I mean the nice thing about when you're in software and Healthcare takes a long time to get in the door but once you're in the door it's usually harder for them it's harder for them to kind of like say oh no we don't Journey right like you're

**[00:56:58]** integrated you're you're you're part of their ecosystem you're delivering value you know a lot a lot stickier of a business well what do you feel is is left unsaid I mean I'm sure there are many things but you know in reflection on your your personal journey and and building GenomOncology that a lot Cleveland's a great town so we didn't talk about Cleveland

**[00:57:20]** at all I do love Cleveland and and I you know I hope I hope to see more investment more interest in technology and Innovation within Clevelands come to the Cleveland and Big Data meetups I think that those might be emerging I heard a rumor at least so there's a you know good local development Community technologist community so even if you're not a software developer and you're

**[00:57:44]** interested in those topics uh look them up on meetup.com and otherwise you know find me on social media and and let me know if you have any questions perfect well I think we can we can bookend it then with our traditional closing question which which is about Cleveland MH for for a Hidden Gem in the area you know something that that other people should know about that maybe they don't

**[00:58:04]** so Lakewood in general so I moved to Lakewood 25 years ago and I love it you're I know you're Ohio city which is which is pretty solid I might have to might reconsider that but book book Brothers in Lakewood that's my that's my go-to bookstore so they actually have a it's like a used bookstore on Madison and he's got he's curated it like the the owner of the the store store is

**[00:58:26]** definitely curated you can tell that it's not your average you know kind of Half Price Book type store it's it's got interesting stuff interesting reads that you wouldn't find anywhere else oh I love it that's perfect uh will and I just want to thank you again for for coming on for sharing your story it's uh yeah it's very it's long been fascinating to me this kind of work and

**[00:58:49]** I love that that you guys are are building it here that's great thanks jef really nice to meet you if people had anything that they wanted to follow up with you about where where's the best place for them to do it so I'm on LinkedIn last name is Mo m a r e r um I'm also on Twitter and you can also just email me at Ian GenomOncology.com

**[00:59:09]** anytime perfect that's all for this week thank you for listening we'd love to hear your thoughts on today's show so if you have any feedback please send over an email to Jeffrey lay ofthe land. FM or find us on Twitter atlay of theland or at Stern he J Fe if you are someone you know would make a good guest for our show please reach out as well and let us know

**[00:59:33]** and if you enjoy the podcast Please Subscribe and leave a review on iTunes or on your preferred podcast player your support goes a long way to help us spread the word and continue to bring the Cleveland Founders and Builders we love having on the show we'll be back here next week at the same time to map more of the land the L of the land podcast was developed in collaboration

**[00:59:52]** with the up company llc at the time of this Rec recording unless otherwise indicated we do not own Equity or other Financial interests in the company which appear on the show all opinions expressed by podcast participants are solely their own and do not reflect the opinions of any entity which employs US this podcast is for informational purposes only and should not be relied

**[01:00:13]** upon as a basis for investment decisions thank you for listening and we'll talk to you next week
