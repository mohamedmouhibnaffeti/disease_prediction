from llama_cpp import Llama
from transformers import AutoTokenizer
# Replace 'bert-base-uncased' with the appropriate model name
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

alpaca_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
{}

### Input:
{}

### Response:
{}"""

EOS_TOKEN = tokenizer.eos_token

def formatting_prompts_func(examples):
    instructions = examples["instruction"]
    inputs       = examples["input"]
    outputs      = examples["title"]
    texts = []
    for instruction, input, output in zip(instructions, inputs, outputs):
        text = alpaca_prompt.format(instruction, input, output) + EOS_TOKEN 
        texts.append(text)
    return { "text" : texts, }

def predict_disease_llama(symptoms_string):    
    model_path = "C:/Users/mouha/OneDrive/Desktop/PFE/FlaskBackend/llamaModel/Copie de model-unsloth.Q4_K_M.gguf"
    llm = Llama(model_path=model_path)
    prompt = alpaca_prompt.format(
            "From the following symptoms return the sickness name only.",
            f"{symptoms_string}", # input
            "",
        )
    response = llm(prompt, max_tokens=4000, stop=["Q:", "\n"])['choices'][0]['text']
    return response
