import csv
import json
import requests
from bs4 import BeautifulSoup
from time import sleep


class NHSScraper:
    START_URL = "https://nhs.uk/conditions"

    def __init__(self, socketio):
        self.socketio = socketio


    def write_csv_data(self, data):
        with open("data.csv", mode='a', newline='') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerows([data])

    def extract(self, url):
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
                        self.write_csv_data([name, symptoms])
                        self.socketio.emit('newdata', {"name" : name, "symptoms": symptoms})
                    sleep(3)

    def main_nhs(self):
        self.extract(self.START_URL)