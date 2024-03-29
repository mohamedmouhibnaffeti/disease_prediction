from sklearn.preprocessing import MultiLabelBinarizer
import tensorflow as tf
from predictor import load_model_and_preprocessors, predict_disease
import pandas as pd

# Load model and preprocessors
model, mlb, scaler, class_names, diseases_encoded = load_model_and_preprocessors()

input_symptoms = ['swelling', 'redness', 'tenderness touch', 'pain', 'limited movement joint toe', 'corns calluses']
# Predict diseases for the given symptoms
predicted_diseases = predict_disease(symptoms=input_symptoms)

print("Predicted Diseases:", predicted_diseases)

