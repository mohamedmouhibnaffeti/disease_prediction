import os
import pandas as pd
from machineLearningModel.DataNormalization import *
from machineLearningModel.Model.predictor import predict_disease
from pymongo import MongoClient
from bson import json_util



from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO



client = MongoClient("mongodb+srv://mouhib:mouhib@medicaledb.nltr2yw.mongodb.net")
db = client['SicknessDetection']

if db is not None:
    print("Connected to MongoDB")
else:
    print("Failed to connect to MongoDB")

app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")




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
    
    # Predict diseases for the given symptoms
    predicted_diseases = predict_disease(symptoms=symptoms)
    
    # Convert any non-serializable data types to serializable format
    predicted_diseases_serializable = [str(disease) for disease in predicted_diseases]
    
    return jsonify({"predicted_diseases": predicted_diseases_serializable}), 200

#preprocess csv file endpoint
@app.route('/preprocess', methods=['POST'])
def preprocess():
    uploaded_files = request.files.getlist("file")
    if not uploaded_files:
        return jsonify({"message": "No files were uploaded"}), 400
    
    # Save uploaded files
    saved_files = []
    for file in uploaded_files:
        file_path = os.path.join('./', file.filename)
        file.save(file_path)
        saved_files.append(file_path)
    
    # Preprocess and save the files using the function from preprocessing module
    result_df = dataCleaning.preprocess_and_save(saved_files, socketio)
    
    return jsonify({"message": "Files preprocessed and saved successfully", "result_df": result_df.to_dict()}), 200


if __name__ == "__main__":
    app.run(debug=True)
