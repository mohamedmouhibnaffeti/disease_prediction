import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.preprocessing import MinMaxScaler

# Load data
data = {
    "result_sicknesses": ["Atrial fibrillation", "Adult Still disease", "Dry macular degeneration", 
                          "Agoraphobia", "Myelofibrosis", "Wet macular degeneration", 
                          "Albinism", "Adrenal cancer", "Childhood schizophrenia", "Frozen shoulder"],
    "symptoms": [
        ['short breath', 'irregular heartbeat', 'increas thirst', 'obes', 'fast heart rate', 'dizzi',
         'lightheaded', 'fatigu', 'famili histori', 'stress', 'palpit', 'chest pain',
         'rapid irregular heartbeat', 'weak limb', 'reduc abil exercis', 'weak', 'hoars'],
        ['swollen lymph node', 'throat pain', 'throat irrit', 'swell lymph node', 'stomach pain', 'muscl pain',
         'fever', 'shoulder pain', 'high fever', 'chest pain', 'chest discomfort', 'eye pain', 'mild fever',
         'ear pain', 'neck pain', 'irrit anu', 'bone pain', 'knee pain'],
        ['difficulti hear', 'visual disturb', 'difficulti walk', 'weight loss', 'weight gain'],
        ['nausea', 'chest pressur', 'depress', 'fast heart rate', 'dizzi', 'diarrhoea', 'hair loss',
         'sinu pressur', 'lightheaded', 'rapid heartbeat', 'chest pain', 'diarrhea', 'anxieti',
         'troubl breath wheez', 'chill', 'hear loss'],
        ['abdomin pain cramp', 'increas thirst', 'jaw pain', 'depress', 'abdomin bloat', 'tremor',
         'seizur', 'abdomin pain', 'back pain', 'ear pain', 'neck pain', 'swollen blood vessel'],
        ['difficulti hear', 'visual disturb', 'difficulti walk', 'weight loss', 'weight gain',
         'swollen blood vessel'],
        ['frequent infect', 'doubl vision', 'itch', 'acut ear infect', 'pale skin', 'abnorm eye movement',
         'delay movement skill', 'blur vision', 'blur distort vision', 'itchi skin', 'blurri vision',
         'wateri eye', 'weight chang', 'gastriti', 'weight gain', 'nervous', 'indiffer'],
        ['hair loss', 'appetit loss', 'fever', 'weight loss', 'weight gain', 'hear loss'],
        ['hallucin', 'abnorm facial express', 'depress', 'abnorm eye movement', 'pain bowel movement',
         'famili histori', 'acid', 'irrit', 'itch', 'constip', 'bloat'],
        []
    ]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Preprocess data
mlb = MultiLabelBinarizer()
symptoms_encoded = mlb.fit_transform(df['symptoms'])
diseases_encoded = pd.get_dummies(df['result_sicknesses'])

# Normalize input data
scaler = MinMaxScaler()
symptoms_normalized = scaler.fit_transform(symptoms_encoded)

# Convert to TensorFlow tensors
X = tf.constant(symptoms_normalized, dtype=tf.float32)
y = tf.constant(diseases_encoded.values, dtype=tf.float32)

# Split data into train and test sets using TensorFlow
X_train, X_test = tf.split(X, [int(0.8 * X.shape[0]), int(0.2 * X.shape[0])], axis=0)
y_train, y_test = tf.split(y, [int(0.8 * y.shape[0]), int(0.2 * y.shape[0])], axis=0)

# Adjusted hyperparameters
input_size = X_train.shape[1]
output_size = y_train.shape[1]
hidden_size = 128
num_layers = 2
learning_rate = 0.001
num_epochs = 500

# Define neural network model
model = tf.keras.Sequential([
    tf.keras.layers.LSTM(hidden_size, input_shape=(input_size, 1)),
    tf.keras.layers.Dense(output_size, activation='sigmoid')
])

# Compile the model
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=num_epochs, batch_size=16)

# Evaluate the model
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {test_acc}")

# Predict diseases for the given symptoms
# Predict diseases for the given symptoms
def predict_disease(model, symptoms, threshold=0.6):
    input_symptoms = mlb.transform([symptoms])
    input_symptoms_normalized = scaler.transform(input_symptoms)
    input_tensor = tf.constant(input_symptoms_normalized, dtype=tf.float32)
    input_tensor_reshaped = tf.reshape(input_tensor, (input_tensor.shape[0], input_tensor.shape[1], 1))
    predictions = model.predict(input_tensor_reshaped)
    probabilities = predictions[0]  # Extract probabilities for the single input
    
    # Create a dictionary to store diseases and their corresponding probabilities
    disease_probabilities = {}
    for idx, disease in enumerate(diseases_encoded.columns):
        disease_probabilities[disease] = probabilities[idx]
    
    # Sort diseases based on probabilities in descending order
    sorted_diseases = sorted(disease_probabilities.items(), key=lambda x: x[1], reverse=True)
    
    return sorted_diseases


# Example symptoms
input_symptoms = ['nausea', 'chest pressur', 'depress', 'fast heart rate', 'dizzi', 'diarrhoea', 'hair loss',
         'sinu pressur', 'lightheaded', 'rapid heartbeat', 'chest pain', 'diarrhea', 'anxieti',
         'troubl breath wheez', 'chill', 'hear loss']

# Predict diseases for the given symptoms
predicted_diseases = predict_disease(model, input_symptoms)

print("Predicted Diseases:", predicted_diseases)

