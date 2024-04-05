import csv
import json
import os
import requests
from bs4 import BeautifulSoup  


START_URL = "https://www.mayoclinic.org/"

def main_mayoclinic():
    extract_and_process_diseases(START_URL)


def add_csv_data(data):
        file_path = '../data.csv'
        with open(file_path, 'a', newline='') as csvfile:
            fieldnames = data[0].keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writerows(data)



def extract_and_process_diseases(start_url):
    with_symptoms = 0
    without_symptoms = 0 
    links = extract_links(start_url)
    for link in links:
        response = requests.get(f'{start_url}{link}')
        soup = BeautifulSoup(response.content, "html.parser")
        datas = soup.select(".cmp-result-letters + ul li a")
        for data in datas:
            name = data.get_text(strip=True)
            url = data.get('href')
            symptoms = extract_disease_symptoms(url)
            add_csv_data({'name': name, 'symptoms': symptoms})
            if symptoms:
                with_symptoms += 1
                with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/datawith.json", 'a') as json_file:
                    json.dump({'name': name, 'url': url, 'symptoms': symptoms}, json_file, indent=4)
            """else:
                without_symptoms += 1
                with open("C:/Users/mouss/OneDrive/Bureau/scraper branch/test/mayoclinic/datawithout.json", 'a') as json_file:
                    json.dump({'name': name, 'url': url, 'symptoms': symptoms}, json_file, indent=4)"""

            with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/count.txt", 'a') as f:
                f.write(f'main_mayoclinic{with_symptoms}:\n\n\n\n{without_symptoms}:\n')

def extract_links(start_url):
    response = requests.get(start_url)
    soup = BeautifulSoup(response.content, "html.parser")
    diseases = soup.find('div', class_="container-child container-child")
    ul = diseases.find('ul') 
    li = ul.find_all('li')
    links = []
    for item in li:
        anchors = item.find_all('a')
        for a in anchors:
            links.append(a.get('href'))
    return links

def extract_disease_symptoms(link):
    response = requests.get(link)
    soup = BeautifulSoup(response.content, "html.parser")
    symptoms_section = soup.find('h2', string='Symptoms')
    symptoms_list = []
    if symptoms_section:
        symptoms_ul = symptoms_section.find_next_sibling('ul')
        if symptoms_ul:
            symptoms_items = symptoms_ul.find_all('li')
            symptoms_list = [item.get_text(strip=True) for item in symptoms_items]
    return symptoms_list

