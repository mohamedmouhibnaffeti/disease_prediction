from sklearn.preprocessing import MultiLabelBinarizer
import tensorflow as tf
from predictor import load_model_and_preprocessors, predict_disease
import pandas as pd

# Load model and preprocessors
model, mlb, scaler, class_names, diseases_encoded = load_model_and_preprocessors()

input_symptoms = ['gut problems nausea belly pain diarrhea vomiting', 'breathing problems shortness breath serious respiratory distress failure pneumonia respiratory diseases', 'brain nervous system changes might notice shifts behavior thinking even organ function seizures possible serious cases']
# Predict diseases for the given symptoms
predicted_diseases = predict_disease(mlb=mlb,scaler=scaler,model=model, symptoms=input_symptoms, class_names=class_names, diseases_encoded=diseases_encoded)

print("Predicted Diseases:", predicted_diseases)

