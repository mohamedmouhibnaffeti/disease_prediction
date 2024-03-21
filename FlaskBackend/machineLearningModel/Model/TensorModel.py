#model jawou behi just fix l code seperation 9a3da tsir mochkla fel data preprocessing


import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.preprocessing import MinMaxScaler
import ast
import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv

dotenv_path = 'C:/Users/mouha/OneDrive/Desktop/PFE/FlaskBackend/.env'
load_dotenv(dotenv_path)
db_string = os.environ['DATABASE_CONNECTION_STRING']

# Connect to MongoDB
client = MongoClient(db_string)

db = client["SicknessDetection"]
collection = db["sicknesses"]

# Retrieve data from MongoDB
data_from_mongodb = collection.find().limit(20)

# Convert MongoDB cursor to list of dictionaries
data_list = list(data_from_mongodb)

# Create a DataFrame from the list of dictionaries
df = pd.DataFrame(data_list)

# Extract symptom titles and create a new column in the DataFrame
for i in range(len(df)):
    symptom_titles = [symptom['title'] for symptom in df.loc[i, 'symptoms']]
    df.at[i, 'symptoms'] = symptom_titles
# Create a DataFrame from the list of dictionaries

print(df['symptoms'])

for symptom in df['symptoms']:
    print(type(symptom))
# Remove double quotes before and after square brackets for each line of symptoms
symptoms = df['symptoms']

for symptom in symptoms:
    print(symptom)
symptoms.to_csv('modified_data.txt', sep='\t', index=False)


# Preprocess data
mlb = MultiLabelBinarizer()
symptoms_encoded = mlb.fit_transform(symptoms)
diseases_encoded = pd.get_dummies(df['title'])

# Normalize input data
scaler = MinMaxScaler()
symptoms_normalized = scaler.fit_transform(symptoms_encoded)

# Reshape input data for LSTM
X = np.expand_dims(symptoms_normalized, axis=-1)  # Add the timestep dimension

# Convert to TensorFlow tensors
X = tf.constant(X, dtype=tf.float32)
y = tf.constant(diseases_encoded.values, dtype=tf.float32)

print("Shape of X:", X.shape)
print("Shape of y:", y.shape)

# Split data into train and test sets using TensorFlow
split_index = int(0.8 * X.shape[0])
X_train, X_test = X[:split_index], X[split_index:]
y_train, y_test = y[:split_index], y[split_index:]

# Adjusted hyperparameters
input_size = X_train.shape[1]
output_size = y_train.shape[1]
hidden_size = 128
num_layers = 2
learning_rate = 0.001
num_epochs = 2000

# Define neural network model
model = tf.keras.Sequential([
    tf.keras.layers.LSTM(hidden_size, input_shape=(input_size, 1)),
    tf.keras.layers.Dense(hidden_size, activation='relu'),  # Adding a hidden layer for better representation
    tf.keras.layers.Dense(output_size, activation='softmax')  # Change activation to softmax
])

# Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',  # Change loss function
              metrics=['accuracy'])

# Train the model

#model.fit(X_train, y_train, epochs=num_epochs, batch_size=16)

# Train the model
history = model.fit(X_train, y_train, epochs=num_epochs, batch_size=16, 
                    validation_data=(X_test, y_test))
# Save the model
model.save("./SavedParams/TSModel")

# Save mlb and scaler to files
import joblib

# Save the mlb and scaler objects using joblib.dump()
joblib.dump(mlb, "./SavedParams/mlb.joblib")
joblib.dump(scaler, "./SavedParams/scaler.joblib")

np.save("./SavedParams/symptoms_normalized.npy", symptoms_normalized)
np.savez("./SavedParams/diseases_encoded.npz", diseases_encoded.values, diseases_encoded.columns)




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
input_symptoms = ['pain', 'changes', 'headaches', 'acne', 'hair loss', 'milky discharge nipples']

# Predict diseases for the given symptoms
predicted_diseases = predict_disease(model, input_symptoms)

print("Predicted Diseases:", predicted_diseases)
"""
class MetricsCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        print(" - epoch: {:d} - loss: {:.4f} - accuracy: {:.4f} - val_loss: {:.4f} - val_accuracy: {:.4f}".format(
            epoch + 1, logs['loss'], logs['accuracy'], logs['val_loss'], logs['val_accuracy']))
history = model.fit(X_train, y_train, epochs=num_epochs, batch_size=16, 
                    validation_data=(X_test, y_test),
                    callbacks=[MetricsCallback()])

"""# Define custom callback to track metrics during training