import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
import ast
import sys


# Initialize NLTK resources
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def string_to_list(string_repr):
    try:
        # Safely evaluate the string representation
        list_repr = ast.literal_eval(string_repr)
        return list_repr
    except (SyntaxError, ValueError) as e:
        # Handle exceptions if the string is not a valid representation of a list
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
    results = []
    for csv_file in csv_files:
        df = pd.read_csv(csv_file)
        df['Symptoms'] = df['Symptoms'].apply(lambda x: preprocess_text(str(x)))  # Apply preprocessing to symptoms column
        results.append(df)
    result_dataframe = pd.concat(results, ignore_index=True)
    result_dataframe.to_csv('./preprocessed_data.csv', index=False)
    return result_dataframe
