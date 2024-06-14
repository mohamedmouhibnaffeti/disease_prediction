import openai
client = openai.ChatCompletion(
    api_key="39b5aeb340b84e818470c6790306421c",
    base_url="https://api.aimlapi.com",
)

response = client.create(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    messages=[
        {
            "role": "system",
            "content": "You are an AI assistant who knows everything.",
        },
        {
            "role": "user",
            "content": "Tell me, why is the sky blue?"
        },
    ],
)

message = response.choices[0].message.content
print(f"Assistant: {message}")