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


def kill_thread():
    global global_thread

    if global_thread is None:
        print("No thread to kill.")
        return

    if global_thread.ident is None:
        print("Thread has not started.")
        return

    tid = global_thread.ident
    exc = ctypes.py_object(SystemExit)
    res = ctypes.pythonapi.PyThreadState_SetAsyncExc(ctypes.c_long(tid), exc)
    if res == 0:
        print("Failed to kill the thread.")
    else:
        print("Thread killed.")

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
    return jsonify({"running": running})

@app.route('/api/dataget', methods=['GET'])
def send_scrapes():
    x=settings.python_files
    print(x)
    return jsonify(extract_file_names(x))



@app.route('/api/start-scraping', methods=['POST'])
def start_collecting():
    write_csv_header()
    global global_thread
    global running
    running = True
    global_thread = threading.Thread(target=MayoClinic.main_MayoClinicScraper)
    global_thread.start()
    return jsonify('scraper completed !')



@app.route('/api/stop-scraping', methods=['POST'])
def stop_collecting():
    global running
    running = False
    kill_thread()
    documentation_path = 'data.csv'
    return send_file(documentation_path, as_attachment=True)


@app.route('/api/upload-scraper', methods=['POST'])
def upload_scraper():
    file = request.files['file']
    class_name = request.form['className']
    class_Function = request.form['classFunction']
    x=settings.python_files

    if find_file_or_class(file.filename[:(file.filename.rfind('.'))], class_name, x):
        return 'Scraper file already exists.'
    

    
    data= {"file name": file.filename[:(file.filename.rfind('.'))] , "class name": class_name, "function name": class_Function}
    x.append(data)
    with open('settings.py', 'w') as f:
        f.write(f'python_files={x}')
    file.save(os.path.join("./scrapers/", file.filename))
    return 'File uploaded successfully'

@app.route('/api/download-documentation')
def download_documentation():
    documentation_path = 'scrapers/book.py'
    return send_file(documentation_path, as_attachment=True)

@app.route('/api/delete-scraper', methods=['POST'])
def delete_scraper_route():
    try:
        file_name = request.json['fileName']
        python_files = settings.python_files
        updated_files = [file for file in python_files if file['file name'] != file_name]
        with open('settings.py', 'w') as f:
            f.write(f'python_files={updated_files}')
        scraper_path = os.path.join("./scrapers/", file_name + ".py")
        os.remove(scraper_path)
        print('Scraper deleted successfully')
        return 'Scraper deleted successfully', 200
    except Exception as e:
        return str(e), 400


@app.route('/api/modify-scraper', methods=['POST'])
def modify_scraper():
    file_name = request.json['file']
    new_content = request.json['content']
    try:
        with open(os.path.join("./scrapers/", f'{file_name}.py'), 'w') as f:
            f.write(new_content)
        return 'Scraper modified successfully', 200
    except Exception as e:
        return str(e), 400
    

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
