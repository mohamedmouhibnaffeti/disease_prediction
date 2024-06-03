import ast
import pandas as pd
import nltk
from nltk.corpus import stopwords
import re
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables
dotenv_path = 'C:/Users/mouha/OneDrive/Desktop/PFE/FlaskBackend/.env'
load_dotenv(dotenv_path)
db_string = os.environ['DATABASE_CONNECTION_STRING']

# Connect to MongoDB
client = MongoClient(db_string)
db = client["SicknessDetection"]
collection = db["sicknesses"]

# Initialize NLTK resources
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def string_to_list(string_repr):
    try:
        list_repr = ast.literal_eval(string_repr)
        return list_repr
    except (SyntaxError, ValueError) as e:
        print("Error:", e)
        return None

def preprocess_text(text):
    # Convert text to lowercase
    text = text.lower()
    
    # Remove punctuations and special characters, preserving newlines and periods
    new_text = ''
    for char in text:
        if char.isalnum() or char.isspace() or char in {'.', '\n'}:
            new_text += char
        else:
            new_text += ' '
    text = new_text
    
    # Split text by '.' or newline
    phrases = [phrase.strip() for phrase in re.split(r'[.\n]', text) if phrase.strip()]
    
    # Remove stopwords from each phrase
    cleaned_phrases = []
    for phrase in phrases:
        words = phrase.split()
        cleaned_phrase = ' '.join([word for word in words if word not in stop_words])
        cleaned_phrases.append(cleaned_phrase)
    
    return cleaned_phrases

def preprocess_and_save(csv_files, socketio):
    total_rows = sum([len(pd.read_csv(csv_file)) for csv_file in csv_files])
    processed_rows = 0
    
    with open('./preprocessed_data.csv', 'w') as file:
        for csv_file in csv_files:
            df = pd.read_csv(csv_file)
            for index, row in df.iterrows():
                symptoms_list = preprocess_text(str(row['Symptoms']))
                symptoms = '"' + str(symptoms_list) + '"'  # Surround list with double quotes
                result_line = f"{row['Sickness_Name']},{symptoms}\n"
                file.write(result_line)
                
                # Save to MongoDB collection
                symptoms = [{'_id': ObjectId(), 'title': symptom} for symptom in symptoms_list]
                sickness_document = {
                    'title': row['Sickness_Name'],
                    'symptoms': symptoms
                }
                #collection.insert_one(sickness_document)
                
                # Update progress
                processed_rows += 1
                progress_percentage = (processed_rows / total_rows) * 100
                print(progress_percentage)
                socketio.emit('message', {'percentage': progress_percentage})
                
    result_dataframe = pd.read_csv('./preprocessed_data.csv')
    return result_dataframe
