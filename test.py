from pymongo import MongoClient

client = MongoClient("mongodb+srv://mouhib:mouhib@medicaledb.nltr2yw.mongodb.net")
db = client['SicknessDetection']
collection = db['sicknesses']
data = collection.find()

body_parts = []
genders = []

for item in list(data):
    for symptom in item['symptoms']:
        if(symptom.get('body_part') not in body_parts):
            body_parts.append(symptom.get('body_part'))
        if(symptom.get('gender') not in genders):
            genders.append(symptom.get('gender'))
