import json
import requests
from bs4 import BeautifulSoup

class NHSInformScraper:
    START_URL = "https://www.nhsinform.scot/symptoms-and-self-help/a-to-z/"

    def __init__(self, socketio):
        self.socketio = socketio

    def extract_symptoms(self, html_text):
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

    def main_nhsinform(self):
        response = requests.get(self.START_URL)
        soup = BeautifulSoup(response.content, "html.parser")
        divs = soup.find_all('div', class_='az_list_indivisual')

        for div in divs:
            links = div.find_all('a')
            for link in links:
                name = link.get_text(strip=True)
                url = link.get('href')
                symptoms = self.extract_symptoms(url)
                data = {'name': name, 'url': url, 'symptoms': symptoms}
                if symptoms:
                    self.socketio.emit('new_data', {'deseas': data})
                    with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/datawith.json", 'a') as json_file:
                        json.dump(data, json_file, indent=4)
                        json_file.write('\n')