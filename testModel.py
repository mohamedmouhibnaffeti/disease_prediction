from transformers import AutoModel, AutoTokenizer
from llama_cpp import Llama


# Replace with your Hugging Face model repository name
model_name = "Mouhib007/llama3DiseaseDetection"

# Load the model and tokenizer
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
model = AutoModel.from_pretrained(model_name, use_auth_token="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")
