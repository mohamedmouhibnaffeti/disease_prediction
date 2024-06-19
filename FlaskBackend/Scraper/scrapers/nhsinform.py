import csv
import requests
from bs4 import BeautifulSoup
import time
class NHSInformScraper:
    START_URL = "https://www.nhsinform.scot/symptoms-and-self-help/a-to-z/"

    def __init__(self, socketio):
        self.socketio = socketio


    def write_csv_data(self, data):
        with open("data.csv", mode='a', newline='') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerows([data])
    

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
                if symptoms:
                    self.write_csv_data([name, symptoms])
                    self.socketio.emit('newdata', {"name" : name, "symptoms": symptoms})