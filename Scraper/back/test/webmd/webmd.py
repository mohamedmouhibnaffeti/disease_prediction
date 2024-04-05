import json
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.webmd.com/a-to-z-guides/health-topics"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

def extract_symptoms(url):
    response = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')
    symptoms_heading = soup.find('h2', string=lambda text: text and 'symptoms' in text.lower())
    if symptoms_heading:
        symptoms_lists = symptoms_heading.find_next_siblings('ul')
        symptoms_list = [symptom.text.strip() for ul in symptoms_lists for symptom in ul.find_all('li')]
        return symptoms_list
    else:
        return []


            
def extract_disease(url):
    response = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')
    link_tags = soup.find('ul', class_='link-list').find_all('li')
    for tag in link_tags:
        name = tag.text.strip()
        link = tag.a['href'] 
        symptoms = extract_symptoms(link)
        data = {'name': name, 'url': link, 'symptoms': symptoms}
        if symptoms:

            with open("C:/Users/mouss/OneDrive/Bureau/PFE/disease_prediction/Scraper/test/datawith.json", 'a') as json_file:
                json.dump(data, json_file, indent=4)
                json_file.write('\n')


def main_webmd():
    response = requests.get(BASE_URL, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'lxml')
    link_tags = soup.find('nav', class_='letter-nav').find('ul').find_all('a')
    links = [tag['href'] for tag in link_tags]
    for url in links:
        extract_disease(url)
    return links

