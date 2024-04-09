import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from sklearn.model_selection import train_test_split
from pymongo import MongoClient
import os
from keras.layers import Dense
from dotenv import load_dotenv

# Load environment variables
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
df['symptoms'] = df['symptoms'].apply(lambda x: [symptom['title'] for symptom in x])

# One-hot encode symptoms
mlb = MultiLabelBinarizer()
symptoms_encoded = mlb.fit_transform(df['symptoms'])

# One-hot encode diseases
diseases_encoded = pd.get_dummies(df['title'])

# Normalize input data
scaler = MinMaxScaler()
symptoms_normalized = scaler.fit_transform(symptoms_encoded)

# Reshape input data for LSTM
X = symptoms_normalized.reshape(symptoms_normalized.shape[0], symptoms_normalized.shape[1], 1)
y = diseases_encoded.values

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define model parameters
input_size = X_train.shape[1]
output_size = y_train.shape[1]
hidden_size = 256
num_layers = 3
learning_rate = 0.0001
num_epochs = 100

# Define neural network model
model = tf.keras.Sequential([
    tf.keras.layers.LSTM(hidden_size, input_shape=(input_size, 1), return_sequences=True),
    tf.keras.layers.Dropout(0.2),  # Regularization
    tf.keras.layers.LSTM(hidden_size, return_sequences=True),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.LSTM(hidden_size),
    tf.keras.layers.Dense(hidden_size, activation='relu'),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(output_size, activation='softmax')  # Change output size to 20
])

# Compile the model
optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)
model.compile(optimizer=optimizer,
              loss=tf.keras.losses.CategoricalCrossentropy(),
              metrics=['accuracy'])


# Define custom callback to track metrics during training
class MetricsCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        print(" - epoch: {:d} - loss: {:.4f} - accuracy: {:.4f} - val_loss: {:.4f} - val_accuracy: {:.4f}".format(
            epoch + 1, logs['loss'], logs['accuracy'], logs['val_loss'], logs['val_accuracy']))

# Train the model
history = model.fit(X_train, y_train, epochs=num_epochs, batch_size=32, 
                    validation_data=(X_test, y_test), callbacks=[MetricsCallback()])

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
print("Test Loss:", loss)
print("Test Accuracy:", accuracy)

# Save the model
model.save("./SavedParams/TSModel")

# Save mlb and scaler to files
import joblib
joblib.dump(mlb, "./SavedParams/mlb.joblib")
joblib.dump(scaler, "./SavedParams/scaler.joblib")
