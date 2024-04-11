import json
import requests
from bs4 import BeautifulSoup
from time import sleep


class NHSScraper:
    START_URL = "https://nhs.uk/conditions"

    def __init__(self, socketio):
        self.socketio = socketio

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
                        data={'name': name, 'symptoms': symptoms}
                        self.socketio.emit('new_data', {'deseas': data})
                        with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/datawith.json",
                                  'a') as json_file:
                            json.dump({'name': name, 'url': url, 'symptoms': symptoms}, json_file, indent=4)
                    sleep(3)

    def main_nhs(self):
        self.extract(self.START_URL)
