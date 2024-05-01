from keras.preprocessing.sequence import pad_sequences
import joblib
import numpy as np
from keras.models import load_model

def predict_top_sickness(symptoms, top_k=4):
    label_encoder1 = joblib.load('SavedModel/label_encoder.joblib')
    tokenizer1 = joblib.load('SavedModel/tokenizer.joblib')
    model1 = load_model('SavedModel/model.h5')
    maxlen1 = joblib.load('SavedModel/maxlen.joblib')
    sequence = tokenizer1.texts_to_sequences([symptoms])
    padded_sequence = pad_sequences(sequence, maxlen=maxlen1)
    predictions = model1.predict(padded_sequence)
    
    top_indices = np.argpartition(predictions[0], -top_k)[-top_k:]
    top_indices_sorted = top_indices[np.argsort(predictions[0][top_indices])][::-1]
    
    top_predictions = label_encoder1.inverse_transform(top_indices_sorted)
    top_scores = predictions[0][top_indices_sorted]
    
    return list(zip(top_predictions, top_scores))
