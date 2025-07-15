---
date: 2023-09-06
categories: [AI, LLM]
tags: [llama.cpp, grammars, biomedical, data extraction, GBNF]
authors: [imaurer]
description: "How context-free grammars improve accuracy in LLM-based biomedical data extraction pipelines."
---

# Using grammars to constrain llama.cpp output

Context-free grammars have increased the accuracy of my large language model-based biomedical data extraction pipeline.

The [llama.cpp](https://github.com/ggerganov/llama.cpp) project, which is a high-performance library for running LLMs locally on CPUs, GPUs, and Apple's Metal graphics platform (e.g M1, M2), has [recent added](https://github.com/ggerganov/llama.cpp/pull/1773) the support of grammars to guide and constrain the output of the LLM.

A [grammar](https://en.wikipedia.org/wiki/Context-free_grammar) is a notation that describes the valid syntax of text.

The [GGML grammar notation (GBNF) is documented here](https://github.com/ggerganov/llama.cpp/tree/master/grammars) and there are example grammars for generic [JSON](https://www.notion.so/JSON-genration-with-llama-cpp-python-a5c2c3cdf4ed4dfdbc3b03ce08f38c20?pvs=21), [C programming language](https://github.com/ggerganov/llama.cpp/blob/master/grammars/c.gbnf), and [chess moves](https://github.com/ggerganov/llama.cpp/blob/master/grammars/chess.gbnf).

I have gotten pretty good at crafting my grammars by hand, but these tools are helpful for getting started:

*   Web UI: [Grammar Builder](https://grammar.intrinsiclabs.ai/) (input: TS types)
*   llama.cpp script: [json-schema-to-grammar.py](https://github.com/ggerganov/llama.cpp/blob/master/examples/json-schema-to-grammar.py) (input: jsonschema file)

For Python usage, this capability was exposed in the [llama-cpp-python project](https://github.com/abetlen/llama-cpp-python) starting in version 0.1.78.

To use it, there is a class called [LlamaGrammar](https://github.com/abetlen/llama-cpp-python/blob/main/llama_cpp/llama_grammar.py#L40C14-L40C14) that is passed into your LLM instance on inference:

```python
from llama_cpp.llama import Llama, LlamaGrammar
grammar = LlamaGrammar.from_string(grammar_text)
llm = Llama(model_path)
response = llm(prompt, grammar=grammar)
```

LlamaGrammar also has a `from_file` helper function.

Grammars work by guiding and constraining the LLM as it is predicting the next token.

This feature eliminates the challenges with trying to force the model to generate well-formed JSON via prompt engineering or via post-processing on the response text.

In addition to guaranteeing the output, the overall quality and accuracy of the underlying response "logic" improves as well. The grammar acts like guardrails in bowling which not only prevents gutter balls (i.e. not well-formed JSON) but also increases the likelihood of a strike (i.e. the correct answer).

My biomedical data extraction pipeline extracts drug names, dosages, genomic variants, biomarkers, and clinical findings from unstructured text. Before grammars, I was seeing about 15-20% malformed JSON responses which would require either falling back to a more expensive model or complex parsing logic.

With grammars, I get 100% well-formed JSON responses and the accuracy of the extracted data has improved by approximately 25%. This is likely because the model is forced to "think" in terms of the structured output format from the beginning of the generation process.

## Example Grammar

Here's a simplified version of the grammar I use for biomedical entity extraction:

```gbnf
root ::= "{" ws "\"entities\":" ws "[" ws entity_list? ws "]" ws "}"

entity_list ::= entity (ws "," ws entity)*

entity ::= "{" ws
  "\"type\":" ws entity_type ws "," ws
  "\"text\":" ws string ws "," ws
  "\"confidence\":" ws number ws
  "}"

entity_type ::= "\"drug\"" | "\"variant\"" | "\"biomarker\"" | "\"finding\""

string ::= "\"" ([^"\\] | "\\" .)* "\""
number ::= [0-9]+ ("." [0-9]+)?
ws ::= [ \t\n\r]*
```

This ensures that the output is always a valid JSON object with an "entities" array containing properly formatted entity objects.

## Performance Considerations

There are some performance implications to consider:

- Grammar-constrained generation is slightly slower than unconstrained generation
- Complex grammars can significantly impact generation speed
- The grammar parsing adds computational overhead during inference

However, for my use case, the benefits far outweigh the costs:

- Eliminated need for retry logic on malformed responses
- Reduced need for post-processing validation
- Improved overall pipeline reliability
- Better extraction accuracy

## Future Improvements

I'm exploring several enhancements to my grammar-based approach:

1. **Dynamic grammar generation**: Creating grammars programmatically based on the input text
2. **Hierarchical grammars**: Using different grammars for different types of biomedical documents
3. **Grammar optimization**: Profiling and optimizing grammars for better performance

If you're working with LLMs for structured data extraction, I highly recommend experimenting with grammars. The initial investment in learning GBNF syntax pays dividends in improved reliability and accuracy.