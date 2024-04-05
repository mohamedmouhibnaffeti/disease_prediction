import csv
import json
import requests
from bs4 import BeautifulSoup

START_URL = "https://www.nhsinform.scot/symptoms-and-self-help/a-to-z/"

def extract_symptoms(html_text):
    response = requests.get(html_text)
    soup = BeautifulSoup(response.content, 'html.parser')
    symptoms_section = soup.find('h2', string='Symptoms of an allergic reaction')
    if symptoms_section:
        symptoms_list = symptoms_section.find_next('ul')
    else:
        symptoms_section = soup.find('div', class_='col-sm-12 illnessPart1')
        symptoms_list = symptoms_section.find('ul') if symptoms_section else None

    if symptoms_list:
        return [item.get_text(strip=True) for item in symptoms_list.find_all('li')]
    else:
        return []

def add_csv_data(data):
        file_path = '../data.csv'
        with open(file_path, 'a', newline='') as csvfile:
            fieldnames = data[0].keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writerows(data)

            
def main_nhsinform():  
    with_symptoms = 0
    without_symptoms = 0
    response = requests.get(START_URL)
    soup = BeautifulSoup(response.content, "html.parser")
    divs = soup.find_all('div', class_='az_list_indivisual')
    
    for div in divs:
        links = div.find_all('a')
        for link in links:
            name = link.get_text(strip=True)
            url = link.get('href')
            symptoms = extract_symptoms(url)
            data = {'name': name, 'url': url, 'symptoms': symptoms}
            
            if symptoms:
                with_symptoms += 1
                with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/datawith.json", 'a') as json_file:
                    json.dump(data, json_file, indent=4)
                    json_file.write('\n')
            """else:
                without_symptoms += 1
                with open("C:/Users/mouss/OneDrive/Bureau/scraper branch/test/nhsinform/datawithout.json", 'a') as json_file:
                    json.dump(data, json_file, indent=4)
                    json_file.write('\n')"""

    with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/count.txt", 'a') as f:
        f.write(f'main_nhsinform\nWith Symptoms: {with_symptoms}\nWithout Symptoms: {without_symptoms}\n\n\n')

