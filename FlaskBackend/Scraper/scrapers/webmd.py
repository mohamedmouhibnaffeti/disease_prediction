import csv
import json
from time import sleep
import requests
from bs4 import BeautifulSoup

class WebMDScraper:
    BASE_URL = "https://www.webmd.com/a-to-z-guides/health-topics"
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

    def __init__(self, socketio):
        self.socketio = socketio

    def write_csv_data(self, data):
        with open("data.csv", mode='a', newline='') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerows([data])  # Writing a list containing the data


    def extract_symptoms(self, url):
        response = requests.get(url, headers=self.HEADERS)
        soup = BeautifulSoup(response.content, 'html.parser')
        symptoms_heading = soup.find('h2', string=lambda text: text and 'symptoms' in text.lower())
        if symptoms_heading:
            symptoms_lists = symptoms_heading.find_next_siblings('ul')
            symptoms_list = [symptom.text.strip() for ul in symptoms_lists for symptom in ul.find_all('li')]
            return symptoms_list
        else:
            return []

    def extract_disease(self, url):
        response = requests.get(url, headers=self.HEADERS)
        soup = BeautifulSoup(response.content, 'html.parser')
        link_tags = soup.find('ul', class_='link-list').find_all('li')
        for tag in link_tags:
            name = tag.text.strip()
            link = tag.a['href'] 
            symptoms = self.extract_symptoms(link)
            data = {'name': name, 'url': link, 'symptoms': symptoms}
            if symptoms:
                    self.write_csv_data([name, symptoms])
                    self.socketio.emit('newdata', {"name" : name, "symptoms": symptoms})

    def main_webmd(self):
        print("Starting WebMDScraper")
        response = requests.get(self.BASE_URL, headers=self.HEADERS)
        soup = BeautifulSoup(response.content, 'lxml')
        link_tags = soup.find('nav', class_='letter-nav').find('ul').find_all('a')
        links = [tag['href'] for tag in link_tags]
        for url in links:
            self.extract_disease(url)
        return links
