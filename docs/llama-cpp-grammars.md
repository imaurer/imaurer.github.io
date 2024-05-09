**September 6, 2023**
# Using grammars to constrain llama.cpp output

Context-free grammars have increased the accuracy of my large language model-based biomedical data extraction pipeline.

The [llama.cpp](https://github.com/ggerganov/llama.cpp) project, which is a high-performance library for running LLMs locally on CPUs, GPUs, and Apple\\u2019s Metal graphics platform (e.g M1, M2), has [recent added](https://github.com/ggerganov/llama.cpp/pull/1773) the support of grammars to guide and constrain the output of the LLM.

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