---
title: "The My Cancer Genome clinical trial data model and trial curation workflow"
description: "How My Cancer Genome structures cancer clinical trials so software can match patients to them."
date: 2020-07-01
category: bioinformatics
venue: "Journal of the American Medical Informatics Association (JAMIA)"
doi: "10.1093/jamia/ocaa066"
authors: ["Neha Jain", "Kathleen F. Mittendorf", "Marilyn Holt", "Michele Lenoue-Newton", "Ian Maurer", "Cindy Miller", "Matthew Stachowiak", "Megan Botyrius", "James Cole", "Christine Micheel", "Mia Levy"]
tags: [clinical-trials, precision-oncology, knowledge-base]
---

Cancer clinical trials are described in free text. A human can read an eligibility section; software cannot match patients against it. This paper, written with the My Cancer Genome team at Vanderbilt-Ingram Cancer Center, describes a structured data model for cancer clinical trials and the curation workflow that fills it. Curators translate each trial's diseases, biomarkers, and eligibility criteria into structured records. Those records power automated matching between a patient's tumor profile and the trials that fit it.

GenomOncology built the curation software and the matching engine behind this work. The model described here still underlies our trial-matching products. The workflow lesson aged well: curated, structured knowledge is what turns a pile of documents into something a machine can act on. That same lesson now drives how we build tools for AI agents.

Links: [DOI](https://doi.org/10.1093/jamia/ocaa066) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/32483629/)
