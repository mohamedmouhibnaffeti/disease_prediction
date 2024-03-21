import joblib
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.preprocessing import MinMaxScaler

def adjust_sequence_length(input_tensor_reshaped, max_sequence_length):
    if input_tensor_reshaped.shape[1] > max_sequence_length:
        input_tensor_reshaped = input_tensor_reshaped[:, :max_sequence_length, :]
    elif input_tensor_reshaped.shape[1] < max_sequence_length:
        padding_length = max_sequence_length - input_tensor_reshaped.shape[1]
        padding = np.zeros((input_tensor_reshaped.shape[0], padding_length, input_tensor_reshaped.shape[2]))
        input_tensor_reshaped = np.concatenate([input_tensor_reshaped, padding], axis=1)
    return input_tensor_reshaped

def load_model_and_preprocessors():
    # Load the saved model
    model = tf.keras.models.load_model("./SavedParams/TSModel")

    # Load MultiLabelBinarizer and MinMaxScaler from saved files
    mlb = joblib.load("./SavedParams/mlb.joblib")
    scaler = joblib.load("./SavedParams/scaler.joblib")

    # Load data
    data = np.load("./SavedParams/diseases_encoded.npz", allow_pickle=True)
    # Access the arrays
    diseases_encoded = data['arr_0']
    class_names = data['arr_1']

    return model, mlb, scaler, class_names, diseases_encoded

def predict_disease(symptoms):
    
    model, mlb, scaler, class_names, diseases_encoded = load_model_and_preprocessors()
    input_symptoms = mlb.transform([symptoms])
    input_symptoms_normalized = scaler.transform(input_symptoms)
    input_tensor = tf.constant(input_symptoms_normalized, dtype=tf.float32)
    
    # Get the expected input shape from the model
    input_shape = model.layers[0].input_shape
    
    # Adjust sequence length
    max_sequence_length = input_shape[1][1] if isinstance(input_shape[1], tuple) else input_shape[1]
    input_tensor_reshaped = tf.reshape(input_tensor, (input_tensor.shape[0], -1, 1))
    input_tensor_reshaped = adjust_sequence_length(input_tensor_reshaped, max_sequence_length)
    
    predictions = model.predict(input_tensor_reshaped)
    probabilities = predictions[0]  # Extract probabilities for the single input
    
    # Create a dictionary to store diseases and their corresponding probabilities
    disease_probabilities = {}
    for idx, disease in enumerate(class_names):
        disease_probabilities[disease] = probabilities[idx]
    
    # Sort diseases based on probabilities in descending order
    sorted_diseases = sorted(disease_probabilities.items(), key=lambda x: x[1], reverse=True)
    
    return sorted_diseases


