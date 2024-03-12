import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
from torch.utils.data import DataLoader, TensorDataset


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

# Convert to PyTorch tensors
X = torch.tensor(symptoms_encoded, dtype=torch.float32)
y = torch.tensor(diseases_encoded.values, dtype=torch.float32)

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# Define neural network model
class DiseasePredictor(nn.Module):
    def __init__(self, input_size, output_size, hidden_size, num_layers):
        super(DiseasePredictor, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, output_size)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.5)  # Increased dropout rate
        self.softmax = nn.Softmax(dim=1)
        self.num_layers = num_layers
        
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc3(x)
        x = self.softmax(x)
        return x

# Initialize model
input_size = X_train.shape[1]
output_size = y_train.shape[1]
hidden_size = 512  # Increased hidden size
num_layers = 3  # Increased number of layers
model = DiseasePredictor(input_size, output_size, hidden_size, num_layers)

# Define loss function and optimizer
criterion = nn.BCELoss()
learning_rate = 0.001  # Adjusted learning rate
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# Learning rate scheduler
scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', patience=5, factor=0.5)

train_data = TensorDataset(X_train, y_train)
train_loader = DataLoader(train_data, batch_size=16, shuffle=True)

# Train the model
num_epochs = 2500
best_accuracy = 0.0
for epoch in range(num_epochs):
    running_loss = 0.0
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    
    # Evaluate on validation set
    with torch.no_grad():
        outputs = model(X_test)
        predicted = torch.round(outputs)
        accuracy = (predicted == y_test).float().mean()
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            torch.save(model.state_dict(), 'PytorchModel.pth')  # Save the best model
        scheduler.step(running_loss)
    
    print(f"Epoch {epoch+1}, Loss: {running_loss}, Test Accuracy: {accuracy.item()}")

def predict_disease(model, symptoms, threshold=0.5):
    input_symptoms = mlb.transform([symptoms])
    input_tensor = torch.tensor(input_symptoms, dtype=torch.float32)
    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.sigmoid(output).numpy()[0]
    predicted_indices = np.where(probabilities > threshold)[0]
    predicted_diseases = diseases_encoded.columns[predicted_indices].tolist()
    predicted_probabilities = probabilities[predicted_indices]
    # Sort predicted diseases based on probabilities
    sorted_indices = np.argsort(predicted_probabilities)[::-1]  # Sort in descending order
    predicted_diseases = [predicted_diseases[i] for i in sorted_indices]
    predicted_probabilities = [predicted_probabilities[i] for i in sorted_indices]
    return predicted_diseases, predicted_probabilities

# Example symptoms
input_symptoms = ['hallucin', 'abnorm facial express', 'depress', 'abnorm eye movement', 'pain bowel movement',
         'famili histori', 'acid', 'irrit', 'itch', 'constip', 'bloat']

# Predict diseases for the given symptoms
predicted_diseases, probabilities = predict_disease(model, input_symptoms)
print("Predicted Diseases and Probabilities:")
for disease, probability in zip(predicted_diseases, probabilities):
    print(f"{disease}: {probability*100:.2f}%")