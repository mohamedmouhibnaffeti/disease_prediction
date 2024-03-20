import os
from flask import Flask, request, jsonify
import pandas as pd
from machineLearningModel.DataNormalization import *
from machineLearningModel.Model.predictor import load_model_and_preprocessors, predict_disease
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

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
    result_df = dataCleaning.preprocess_and_save(saved_files)
    
    return jsonify({"message": "Files preprocessed and saved successfully", "result_df": result_df.to_dict()}), 200


if __name__ == "__main__":
    app.run(debug=True)
