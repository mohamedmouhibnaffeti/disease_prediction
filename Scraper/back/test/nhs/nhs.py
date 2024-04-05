import csv
import json
import os
import requests
from bs4 import BeautifulSoup  
from time import sleep
START_URL = "https://nhs.uk/conditions"

def clear_and_save(disease_name, link, symptoms_sections):
    with open("clearedData.txt", "a") as f:
        f.write(f'{disease_name}:\n{link}\n')
        for section in symptoms_sections:
            text_elements = section.find_all('li')
            text_list = [element.get_text(strip=True) for element in text_elements]
            if text_list:
                result = '\n'.join(text_list)
                f.write(f'{result}\n__________________________________________\n')


def add_csv_data(data):
        file_path = '../data.csv'
        with open(file_path, 'a', newline='') as csvfile:
            fieldnames = data[0].keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writerows(data)



            
def extract(url):
    with_symptoms = 0
    without_symptoms = 0 
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    diseases = soup.select('ul.nhsuk-list li')
    
    for li in diseases:
        name = li.a.get_text(strip=True)
        url = li.a['href']
        response = requests.get(f'https://nhs.uk{url}') 
        html_content = response.content.decode('utf-8', 'ignore')
        soup = BeautifulSoup(html_content, 'html.parser')
        symptoms_sections = soup.find_all(lambda tag: tag.name == 'section' and tag.find('h2', id="symptoms"))
        
        if symptoms_sections:
            for section in symptoms_sections:
                text_elements = section.find_all('li')
                symptoms = [element.get_text(strip=True) for element in text_elements]
                if symptoms:
                    with_symptoms += 1
                    with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/datawith.json", 'a') as json_file:
                        json.dump({'name': name,'url' : url, 'symptoms': symptoms}, json_file, indent=4)
                """else:
                    without_symptoms += 1 
                    with open("C:/Users/mouss/OneDrive/Bureau/scraper branch/test/nhs/datawithout.json", 'a') as json_file:
                        json.dump({'name': name,'url' : url, 'symptoms': symptoms}, json_file, indent=4)"""
                sleep(3)
                    
    with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/count.txt", 'a') as f:
        f.write(f'main_nhs\n{with_symptoms}:\n\n\n\n{without_symptoms}:\n\n\n\n')

def main_nhs():
    extract(START_URL)
