import time
import requests
import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://mouhib:mouhib@medicaledb.nltr2yw.mongodb.net/")
db = client["SicknessDetection"]
collection = db["sicknesses"]

url = "http://localhost:3040/v1/chat/completions"
import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
# Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
GOOGLE_API_KEY="AIzaSyApBppxuzstUkd2Q2SgU9A1f8HzN2MfcV8"


genai.configure(api_key=GOOGLE_API_KEY)
for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(m.name)

model = genai.GenerativeModel('gemini-pro')

response = model.generate_content("What is the meaning of life?")
# Fetch data from MongoDB and update symptoms
batch_size = 101
skip = 0
total_docs = collection.count_documents({})

si = 0  # Counter for sicknesses
print(total_docs)
try:
    while skip < total_docs:
        cursor = collection.find({}, {"symptoms": 1}).skip(skip).limit(batch_size)
        for sickness in cursor:
            si += 1
            print(f"Sickness {si}")
            try:
                response = model.generate_content(f"for this sickness {sickness.get('title')} give the necessary recommendations before consulting a medical expert briefly 
                                                  in the form of points only mention the recommendation points that's all please don't return any other text except the points 
                                                  and remove the title of the points.")
                recommendations = response.text 
                updatedSickness = collection.update_one(
                    {"_id": sickness["_id"]},
                    {"$set": {"recommendations": recommendations}}
                )
                print(updatedSickness)
                print(recommendations)
                print("-----------------------------------------------------------------------------------------------------------------")
                time.sleep(1.1) 
            except Exception as e:
                print(f"Error updating body_part for {sickness.get('title')}: {str(e)}")

        skip += batch_size

except Exception as e:
    print(f"Error: {str(e)}")

print(si)
print("Finished")