import pandas as pd
z
import nltk
from nltk.corpus import stopwords
import ast
import sys
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

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
    
    # Remove punctuations and special characters, preserving newlines
    new_text = ''
    for char in text:
        if char.isalnum() or char.isspace() or char == '\n':
            new_text += char
        else:
            new_text += ' '
    text = new_text
    
    # Split text by newline
    lines = text.split('\n')
    
    # Remove stopwords and strip whitespace for each line
    symptoms_list = []
    for line in lines:
        words = [word.strip() for word in line.split() if word.strip() and word.strip() not in stop_words]
        if words:  # Check if words list is not empty
            symptoms_list.append(" ".join(words))

    return symptoms_list

def preprocess_and_save(csv_files):
    with open('./preprocessed_data.csv', 'a') as file:
        for csv_file in csv_files:
            df = pd.read_csv(csv_file)
            for index, row in df.iterrows():
                symptoms_list = preprocess_text(str(row['Symptoms']))
                symptoms = '"' + str(symptoms_list) + '"'  # Surround list with double quotes
                result_line = f"{row['Sickness_Name']},{symptoms}\n"
                file.write(result_line)
                
                # Save to MongoDB collection
                symptoms = [{'_id': ObjectId(),'title': symptom} for symptom in symptoms_list]
                sickness_document = {
                    'title': row['Sickness_Name'],
                    'symptoms': symptoms
                }
                collection.insert_one(sickness_document)
                
    result_dataframe = pd.read_csv('./preprocessed_data.csv')
    return result_dataframe

def main():
    # Specify CSV files
    csv_files = ["C:/Users/mouha/OneDrive/Desktop/PFE/FlaskBackend/machineLearningModel/DataNormalization/sicknesses.csv"]  # Add more file paths as needed
    
    # Preprocess and save data
    preprocess_and_save(csv_files)
    

if __name__ == "__main__":
    main()