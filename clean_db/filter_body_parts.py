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

# Fetch data from MongoDB and update symptoms
batch_size = 101
skip = 0
total_docs = collection.count_documents({})
body_parts_and_systems = [
    "Head", "Brain", "Eyes", "Ears", "Nose", "Mouth", "Jaw", "Temporomandibular Joint (TMJ)", "Lips",
    "Face", "Scalp", "Hair", "Nails", "Neck", "Throat", "Chest", "Breastbone", "Thorax (Chest)", "Rib Cage",
    "Trunk", "Abdomen", "Abdominal Cavity", "Pelvis", "Waist", "Groin", "Butt", "Back", "Lower back (lumbar spine)",
    "Upper body", "Lower body", "Arms", "Shoulders", "Elbows", "Forearms", "Wrists", "Hands", "Fingers", "Legs",
    "Hips", "Thighs", "Knees", "Calves", "Ankles", "Feet", "Toes", "Skin", "Dermis", "Epidermis", "Muscles",
    "Skeletal System", "Bones", "Joints", "Musculoskeletal system", "Nervous System", "Spinal cord", "Nerves",
    "Central nervous system", "Peripheral nervous system", "Sensory system", "Tongue", "Endocrine System",
    "Pituitary gland", "Thyroid gland", "Adrenal glands", "Pancreas", "Reproductive System", "Male reproductive system",
    "Female reproductive system", "Testes", "Ovaries", "Uterus", "Penis", "Vagina", "Scrotum", "Labia", "Clitoris",
    "Urinary System", "Kidneys", "Bladder", "Ureters", "Urethra", "Cardiovascular System", "Heart", "Arteries",
    "Veins", "Blood", "Blood vessels", "Lymphatic System", "Lymph nodes", "Spleen", "Thymus", "Tonsils", "Bone marrow",
    "Respiratory System", "Lungs", "Nasal cavity", "Trachea", "Bronchi", "Diaphragm", "Gastrointestinal System",
    "Esophagus", "Stomach", "Small intestine", "Large intestine", "Liver", "Gallbladder", "Anus", "Rectum", "Teeth",
    "Salivary glands", "Hormonal System", "Parathyroid glands", "Hypothalamus", "Pineal gland"
]


si = 0  # Counter for sicknesses
print(total_docs)
try:
    while skip < total_docs:
        cursor = collection.find({}, {"symptoms": 1}).skip(skip).limit(batch_size)
        for sickness in cursor:
            si += 1
            for symptom in sickness.get('symptoms'):   
                print(f"Sickness {si}")
                try:
                    response = model.generate_content(f"where does this symptom '{symptom.get('title')}' fall into in human body (body parts to choose from ({body_parts_and_systems})).")
                    body_part = response.text.strip()  # Get the generated body part and gender
                    time.sleep(1)
                    responseGender = model.generate_content(f"which gender does this symptom '{symptom.get('title')}' affect (male, female, or both)?")
                    gender = responseGender.text.strip()
                    # Update the symptom with body part and gender
                    updatedSickness = collection.update_one(
                        {"_id": sickness["_id"], "symptoms": symptom},
                        {"$set": {"symptoms.$.body_part": body_part, "symptoms.$.gender": gender}}
                    )
                    print(updatedSickness)
                    print(f"Updated body part for symptom '{symptom.get('title')}': {body_part}")
                    print(f"Gender for symptom '{symptom.get('title')}': {gender}")
                    print("-----------------------------------------------------------------------------------------------------------------")
                    time.sleep(1.1)
                except Exception as e:
                    print(f"Error updating body_part for symptom '{symptom}' of {sickness.get('title')}: {str(e)}")

        skip += batch_size

except Exception as e:
    print(f"Error: {str(e)}")

print(si)
print("Finished")
