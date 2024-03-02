import re

# Download NLTK stopwords if not already downloaded
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')
nltk.download('punkt')

def clean_and_preserve_newlines(text):
    # Keep only letters, spaces, and newline characters
    cleaned_text = re.sub(r'[^a-zA-Z \n]', ' ', text)  # Replace non-letters with space
    cleaned_text = re.sub(r'^\s+|\s+$', '', cleaned_text, flags=re.MULTILINE)  # Remove leading and trailing spaces

    # Tokenize the cleaned text while preserving newlines
    stop_words = set(stopwords.words('english'))
    words = [word.lower() for word in re.split(r' +', cleaned_text) if word not in stop_words]

    cleaned_text = ' '.join(words)

    return cleaned_text

def clean_and_preserve_newlines_file(file_data):

    """with open(input_file_path, 'r', encoding='utf-8') as file:
        original_text = file.read()
"""
    cleaned_text = clean_and_preserve_newlines(file_data)

    unique_lines = list(set(line.strip() for line in cleaned_text.split('\n')))

    cleaned_text = '\n'.join(unique_lines)

    with open('symptoms.txt', 'a', encoding='utf-8') as file:
        file.write(cleaned_text)

#input_file_path = 'input.txt'  

#clean_and_preserve_newlines_file(input_file_path, output_file_path)
