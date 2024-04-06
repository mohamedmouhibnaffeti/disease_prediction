import json
import requests
from bs4 import BeautifulSoup

class MayoClinicScraper:
    START_URL = "https://www.mayoclinic.org/"

    def __init__(self, socketio):
        self.socketio = socketio

    def main_MayoClinicScraper(self):
        self.extract_and_process_diseases()

    def extract_and_process_diseases(self):
        links = self.extract_links(self.START_URL)
        for link in links:
            response = requests.get(f'{self.START_URL}{link}')
            soup = BeautifulSoup(response.content, "html.parser")
            datas = soup.select(".cmp-result-letters + ul li a")
            for data in datas:
                name = data.get_text(strip=True)
                url = data.get('href')
                symptoms = self.extract_disease_symptoms(url)
                if symptoms:
                    data={'name': name, 'symptoms': symptoms}
                    #print(data)
                    print(name)
                    self.socketio.emit('newdata', {"name" : name, "symptoms": symptoms})
                    with open("C:/Users/mouss/OneDrive/Bureau/disease_prediction-Scraper/Scraper/new/datawith.json", 'a') as json_file:
                        json.dump({'name': name, 'url': url, 'symptoms': symptoms}, json_file, indent=4)

    def extract_links(self, start_url):
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

    def extract_disease_symptoms(self, link):
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