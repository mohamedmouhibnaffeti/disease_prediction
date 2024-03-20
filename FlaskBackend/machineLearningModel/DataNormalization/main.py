import os
import difflib
import pandas as pd
import spacy
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_socketio import SocketIO, send, emit
import pandas as pd
import io
from gen_symptoms import clean_and_preserve_newlines_file

#nltk.download('stopwords')

"""def get_files_from_directory():
    files = []
    for _, _, filenames in os.walk('./input/'):
        files.extend(['./input/' + filename for filename in filenames if filename.endswith('.csv')])
    return files

def get_data_frames():
    filenames = get_files_from_directory()
    dataframes = [pd.read_csv(file) for file in filenames]
    return dataframes"""


def clean_text(text, stopwords_set):
    text = text.lower()

    # Remove punctuations and special characters
    text = ''.join([char if char.isalnum() or char.isspace() or char == '\n' else ' ' for char in text])

    # Remove stopwords
    words = [word for word in text.split() if word not in stopwords_set]

    # Stemming
    stemmer = PorterStemmer()
    stemmed_words = [stemmer.stem(word) if word != '\n' else '\n' for word in words]

    cleaned_text = ' '.join(stemmed_words)

    return cleaned_text

def keywords_generation(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)

    entities = [ent.text for ent in doc.ents]

    keywords = [chunk.text for chunk in doc.noun_chunks]

    return {'Named Entities': entities, 'Keywords': keywords}

def similarity_checking(symptom1, symptom2):
    similarity_ratio = difflib.SequenceMatcher(None, symptom1.lower(), symptom2.lower()).ratio()
    return similarity_ratio >= 0.7

with open('symptoms.txt', 'r') as file:
    symptom_list = [line.strip() for line in file]

def filter_similar_symptoms(symptoms, reference_list):
    filtered_references = [ref for symptom in symptoms for ref in reference_list if similarity_checking(symptom, ref)]
    return filtered_references

def extract_matching_symptoms(text):
    stop_words = set(stopwords.words('english'))
    cleaned_data = keywords_generation(text)
    named_entities = cleaned_data['Named Entities']
    keywords = cleaned_data['Keywords']
    #symptoms_list = [clean_text(symptom, stop_words) for symptom in symptom_list]

    matched_named_entities = filter_similar_symptoms(named_entities, symptom_list)
    matched_keywords = filter_similar_symptoms(keywords, symptom_list)

    matched_symptoms = [clean_text(matched_symptom, stop_words) for matched_symptom in list(set(matched_named_entities + matched_keywords))]

    return matched_symptoms

def merge_csv(dataframes):
    modified_dataframes = []
    for df in dataframes:
        df = df.iloc[:, :2]
        df.columns = ["sickness_name", "symptoms"]
        modified_dataframes.append(df)

    result_dataframe = pd.concat(modified_dataframes, ignore_index=True)
    total_rows = len(result_dataframe)
    processed_rows = 0


    for _, row in result_dataframe.iterrows():
        cleaned_text = row['symptoms'] #clean_text(row['symptoms'], stop_words)
        extracted_symptoms = extract_matching_symptoms(cleaned_text)
        result_dataframe.at[_, 'symptoms'] = list(set(extracted_symptoms))

        processed_rows += 1
        percentage = (processed_rows / total_rows) * 100
        socketio.send(round(percentage, 2))
        

    result_dataframe.to_csv('./result_sicknesses.csv', mode='a', header=False, index=False)

    print("Processing: 100.00% complete")



app = Flask(__name__)
CORS(app=app)
socketio = SocketIO(app, cors_allowed_origins="*")



@socketio.on('connect')
def handle_connect():
    print('Client connected')
    #emit("message", {'data': 'welcome'})
    

@app.route('/api/file-upload/csv', methods=['POST'])
def csv_file_upload():
    try:
        files = request.files
        results = []
        for index, file in enumerate(files):
            filename = request.files[f'file{index}']
            filedata = filename.read().decode('utf-8')
            df = pd.read_csv(io.StringIO(filedata))
            results.append(df)
        merge_csv(results)
        return send_file('./result_sicknesses.csv', as_attachment=True)
    except:
        return jsonify("Error processing files")

@app.route('/api/file-upload/plain', methods=['POST'])
def txt_file_upload():
    files = request.files
    files_treated = 0
    try:
        for index, file in enumerate(files):
            filename = request.files[f'file{index}']
            filedata = filename.read().decode('utf-8')
            clean_and_preserve_newlines_file(file_data=filedata)
            files_treated += 1
            percentage = (files_treated / len(files)) * 100
            socketio.send(percentage)
        return send_file('./symptoms.txt', as_attachment=True)
    except:
        return jsonify("Error processing data")
if __name__ == '__main__':
    app.run(debug=True)
    socketio.run(app, host='0.0.0.0', port=5000)
