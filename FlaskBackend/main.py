import csv
import ctypes
import os
import threading
import pandas as pd
from Scraper.scrapers.mayoclinic import MayoClinicScraper
from Scraper import settings
from llamaModel.Predict import predict_disease_llama
from machineLearningModel.DataNormalization import *
from machineLearningModel.Model.predictor import predict_disease
from pymongo import MongoClient
from bson import json_util
from machineLearningModel.Model.predict import predict_top_sickness


from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_socketio import SocketIO
import importlib


def kill_thread(thread):
    if thread is None:
        print("No thread to kill.")
        return

    if thread.ident is None:
        print("Thread has not started.")
        return

    tid = thread.ident
    exc = ctypes.py_object(SystemExit)
    res = ctypes.pythonapi.PyThreadState_SetAsyncExc(ctypes.c_long(tid), exc)
    if res == 0:
        print("Failed to kill the thread.")
    else:
        print("Thread killed.")



def scrape_selected_websites(selected_websites):
    for scraper_info in settings.python_files:
        if scraper_info['file name'] in selected_websites:
            module = importlib.import_module(f"scrapers.{scraper_info['file name']}")
            scraper_class = getattr(module, scraper_info['class name'])
            scraper_instance = scraper_class(socketio)
            scrape_function = getattr(scraper_instance, scraper_info['function name'])
            scrape_function()

def extract_file_names(files_list):
    file_names = set()
    for file_dict in files_list:
        file_names.add(file_dict.get('file name'))
    return list(file_names)

def find_file_or_class(file_name, class_name, python_files):
    for file_info in python_files:
        if file_info['file name'] == file_name or file_info['class name'] == class_name:
            return True
    return False

def write_csv_header():
    with open("data.csv", mode='w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["Desias", "Symptoms"])






client = MongoClient("mongodb+srv://mouhib:mouhib@medicaledb.nltr2yw.mongodb.net")
db = client['SicknessDetection']

if db is not None:
    print("Connected to MongoDB")
else:
    print("Failed to connect to MongoDB")

app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

#scraper code

totaldata=0
MayoClinic = MayoClinicScraper(socketio)


@app.route('/api/running-status', methods=['GET'])
def get_running_status():
    global running
    print(running)
    return jsonify({"running": running})


@app.route('/api/getWebsites', methods=['GET'])
def send_scrapes():
    file_names = set()
    for file_dict in settings.python_files:
        file_names.add(file_dict.get('file name'))
    return jsonify(list(file_names))




@app.route('/api/start-scraping', methods=['POST'])
def start_collecting():
    global global_thread
    global running
    running = True
    selected_websites = request.json.get('websites', [])
    write_csv_header()
    global_thread = threading.Thread(target=scrape_selected_websites, args=(selected_websites,))
    global_thread.start()
    global_thread.join()
    running = False

    documentation_path = 'data.csv'
    return send_file(documentation_path, as_attachment=True)





@app.route('/api/stop-scraping', methods=['POST'])
def stop_collecting():
    global global_thread
    global running
    running = False
    kill_thread(global_thread)
    documentation_path = 'data.csv'
    return send_file(documentation_path, as_attachment=True)


#end scraper code

@app.route('/get_data')
def get_data():
    collection = db['sicknesses']
    data = collection.find()
    
    # Iterate over the cursor to access documents
    data_list = json_util.dumps(list(data))
    print(data_list)
    
    return jsonify({"sickness": data_list})

#predict endpoint
@app.route('/predict', methods=['POST'])
def predict():
    symptoms = request.json.get('symptoms')
    if not symptoms:
        return jsonify({"message": "Symptoms not provided"}), 400
    symptomsString = " ".join(symptoms)
    # Predict disease for the given symptoms
    predicted_disease = predict_disease_llama(symptomsString)
    
    return jsonify({"predicted_disease": predicted_disease}), 200

#preprocess csv file endpoint
@app.route('/api/preprocess', methods=['POST'])
def preprocess():
    try:
        uploaded_files = []
        
        # Iterate through the files in the request
        for key in request.files:
            file = request.files[key]
            file_path = os.path.join('./', file.filename)
            file.save(file_path)
            uploaded_files.append(file_path) 
        
        # Preprocess and save the files using the function from preprocessing module
        result_df = dataCleaning.preprocess_and_save(uploaded_files, socketio)
        
        return send_file('./preprocessed_data.csv', as_attachment=True), 200
    except Exception as e:
        print(f"Error during file processing: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
