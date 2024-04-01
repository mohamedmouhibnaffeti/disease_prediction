import csv
import requests
import random
from bs4 import BeautifulSoup
from time import sleep

from fake_useragent import UserAgent

def get_random_user_agent():
    ua = UserAgent()
    return ua.random



def get_data(url): 
    proxies2 = [
    "89.213.228.82:3128",
    "38.162.24.73:3128",
    "38.162.18.141:3128",
    "38.162.5.98:3128",
    "38.162.18.153:3128",
    "89.213.228.183:3128",
    "38.162.9.141:3128",
    "89.213.231.20:3128",
    "38.162.9.105:3128",
    "38.162.1.58:3128",
    "38.162.21.208:3128",
    "38.162.29.124:3128",
    "38.162.26.214:3128",
    "38.162.21.91:3128",
    "38.162.23.231:3128",
    "38.162.15.168:3128",
    "89.213.229.100:3128",
    "38.162.28.164:3128",
    "89.213.229.139:3128",
    "38.162.6.186:3128",
    "38.162.13.42:3128",
    "89.213.230.54:3128",
    "154.6.97.37:3128",
    "154.6.98.154:3128",
    "38.162.30.172:3128",
    "38.162.4.218:3128",
    "38.162.3.34:3128",
    "38.162.21.234:3128",
    "38.162.20.148:3128",
    "38.162.17.132:3128",
    "38.162.1.244:3128",
    "38.162.3.15:3128",
    "38.162.7.5:3128",
    "38.162.3.100:3128",
    "38.162.13.65:3128",
    "38.162.22.45:3128",
    "38.162.5.51:3128",
    "38.162.15.107:3128",
    "38.162.21.2:3128",
    "89.213.231.22:3128",
    "38.162.21.99:3128",
    "38.162.16.189:3128",
    "38.162.21.240:3128",
    "38.162.27.125:3128",
    "89.213.231.137:3128",
    "38.162.21.134:3128",
    "38.162.8.122:3128",
    "38.162.11.92:3128",
    "38.162.1.129:3128",
    "38.162.23.88:3128",
    "38.162.23.133:3128",
    "38.162.13.57:3128",
    "38.162.7.246:3128",
    "154.6.99.185:3128",
    "38.162.2.174:3128",
    "89.213.228.64:3128",
    "154.6.97.232:3128",
    "154.6.96.228:3128",
    "38.162.30.157:3128",
    "38.162.31.52:3128",
    "38.162.4.77:3128",
    "38.162.10.23:3128",
    "38.162.28.43:3128",
    "38.162.17.236:3128",
    "38.162.20.114:3128",
    "38.162.10.56:3128",
    "89.213.231.218:3128",
    "38.162.30.167:3128",
    "154.6.97.5:3128",
    "38.162.15.160:3128",
    "38.162.18.103:3128",
    "38.162.6.92:3128",
    "154.6.98.111:3128",
    "38.162.0.204:3128",
    "38.162.7.104:3128",
    "38.162.20.170:3128",
    "38.162.7.165:3128",
    "38.162.15.251:3128",
    "38.162.20.150:3128",
    "38.162.29.170:3128",
    "38.162.9.93:3128",
    "89.213.229.138:3128",
    "38.162.18.113:3128",
    "38.162.20.23:3128",
    "38.162.24.100:3128",
    "154.6.99.88:3128",
    "38.162.6.156:3128",
    "38.162.14.194:3128",
    "38.162.6.60:3128",
    "38.162.13.162:3128",
    "38.162.31.216:3128",
    "38.162.12.80:3128",
    "38.162.24.180:3128",
    "38.162.6.243:3128",
    "38.162.16.212:3128",
    "38.162.17.190:3128",
    "89.213.228.68:3128",
    "38.162.24.178:3128",
    "38.162.24.65:3128",
    "154.6.99.83:3128"
]
    
    headers = {
        'User-Agent': get_random_user_agent(), 
        'Accept': 'text/html',
        'Content-Type': 'text/html',
        'X-Robots-Tag': 'noindex,noarchive,nofollow',
        'Accept-Language': 'en-US,en;q=0.5',
    }
    
    proxy= random.choice(proxies2)
    while proxy:
        try:

            UserAgent = {'User-Agent': get_random_user_agent()}
            response = requests.get(url, headers=headers, proxies={'http': proxy}, allow_redirects=True, timeout=5)
            soup = BeautifulSoup(response.content, 'html.parser')
            div= soup.find('div', id='page_specific_content')
            if div:
                return soup
            print("none")
        except Exception as e:
            print("Proxy:", proxy)
            print("Error:", e)
        sleep(4)
        proxy = random.choice(proxies2)


def get_links():
    soup= get_data("http://www.diseasesdatabase.com/index.asp")
    table = soup.find('table')
    links = table.find_all('a')
    link_list = [link['href'] for link in links] 
    return link_list

def extract_symptoms(html_content):
    symptoms_list = []
    symptoms_sections = html_content.find_all('dt', string='Symptoms and signs')
    for section in symptoms_sections:
        symptoms = section.find_next_sibling('dd').find_all('strong')
        for symptom in symptoms:
            symptoms_list.append(symptom.get_text())
    return symptoms_list

def extract_authers(html_content):
    symptoms_list = []
    symptoms_and_signs = html_content.find_all('dt', string='Symptoms and signs')
    for symptom in symptoms_and_signs:
        ul_tag = symptom.find_next_sibling('dd').find('ul')
        ul_tag.decompose()
        symptom.decompose()

    symptoms_sections = html_content.find_all('dt')
    for section in symptoms_sections:
        symptoms = section.find_next_sibling('dd').find_all('strong')
        for symptom in symptoms:
            symptoms_list.append(symptom.get_text())
    return symptoms_list

def may_cause(url): 
    data = get_data(url)
    data= data.find('div', id='page_specific_content')
    if data:
        dl_tag = data.find('dl')
        if dl_tag:
            li_elements = dl_tag.find_all('li')
            li_text_list = [li.get_text(strip=True) for li in li_elements]
            return li_text_list
    return []

def category(url):
    data = get_data(url)
    data= data.find('div', id='page_specific_content')
    if data:
        ul_elements = data.find('ul')
        li_texts = []
        li_elements = ul_elements.find_all('li')
        for li in li_elements:
                li_texts.append(li.get_text(strip=True))
        return li_texts
    return []

def save_to_csv(file_name, data):
    fieldnames = ['Name', 'symptoms', 'May_be_caused_by_or_feature_of', 'May_cause_or_feature', 'Belong_to_the_category']

    with open(file_name, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        # Check if the file is empty, if so, write the header
        file.seek(0, 2)  # Move the cursor to the end of the file
        if file.tell() == 0:
            writer.writeheader()

        # Write data to the file
        for entry in data:
            writer.writerow({
                'Name': entry['name'],
                'symptoms' : ', '.join(entry['symptoms']),
                'May_be_caused_by_or_feature_of': ', '.join(entry['may_be_caused_by_or_feature_of']),
                'May_cause_or_feature': ', '.join(entry['may_cause_or_feature']),
                'Belong_to_the_category': ', '.join(entry['belong_to_the_category'])
            })

def desias(url, number): 
    name = ''
    symptoms = []
    may_be_caused_by_or_feature_of = []
    may_cause_or_feature = []
    belong_to_the_category = []
    data = get_data(url)
    if data:
            name = data.find('div', id='menubar')
            content = data.find('div', id='page_specific_content')
            if name and content:
                name = name.find('h1').text.strip()
                name = name.replace("information", "").strip()
                links = content.find('ul')
                if links:
                    for link in links.find_all('a'):
                        title = link.text.strip()
                        href = link['href']
                        if "may be caused by or feature of" in title:
                            html_content = get_data(f'http://www.diseasesdatabase.com{href}')
                            symptoms += extract_symptoms(html_content)
                            may_be_caused_by_or_feature_of += extract_authers(html_content)
                        elif "may cause or feature" in title:
                            may_cause_or_feature += may_cause(f'http://www.diseasesdatabase.com/{href}')
                        elif "belong(s) to the category of" in title:
                            belong_to_the_category += category(f'http://www.diseasesdatabase.com/{href}')
                entry = {'name': name, 'symptoms' : symptoms, 'may_be_caused_by_or_feature_of': may_be_caused_by_or_feature_of, 'may_cause_or_feature': may_cause_or_feature, 'belong_to_the_category': belong_to_the_category}
                print(f'{number} -- {name}')
                save_to_csv('data.csv', [entry])

def main():
    number = 1
    print("Getting links")
    list_of_links = get_links()
    for link in list_of_links:
        print("Getting data")
        data = get_data(f'http://www.diseasesdatabase.com/{link}')
        if data:
                div = data.find('div', id='page_specific_content')
                if div:
                    links = div.find_all('a')
                    link_list = [link['href'] for link in links]
                    for link in link_list:
                        print("Getting desias")
                        desias(f'http://www.diseasesdatabase.com/{link}', number)
                        number += 1


main()
print("done")





























"""
html_content = get_data("http://www.diseasesdatabase.com/item_relationships.asp?glngUserChoice=14367&bytRel=2&blnBW=0&strBB=RL&blnClassSort=255&Key={74507E19-02E3-4E70-8445-A5B234DA9BD1}")
print(get_symptoms(html_content))
print('-------------------')
print(remove_symptoms_and_signs(html_content))"""






"""def get_symptoms(html_content): 
    data= html_content.find('div', id='page_specific_content')
    if data:
        symptoms_and_signs_section = data.find('dt', string='Symptoms and signs')
        if symptoms_and_signs_section:
            symptoms_and_signs_section = symptoms_and_signs_section.find_next_sibling('dd')
            symptoms_and_signs = [item.text.strip() for item in symptoms_and_signs_section.find_all('li')]
            return symptoms_and_signs
    return []"""

""""def remove_symptoms_and_signs(html_content):
    data= html_content.find('div', id='page_specific_content')
    symptoms_and_signs = data.find('dt', string='Symptoms and signs')
    if symptoms_and_signs:
        symptoms_and_signs.find_next_sibling('dd').decompose()
        symptoms_and_signs.decompose()
    li_tags = data.find_all('li')
    symptoms = [tag.get_text(strip=True) for tag in li_tags]
    return symptoms"""

"""def remove_and_return_item(input_list):
    if not input_list:
        return None

    removed_item = input_list.pop()
    return removed_item"""

"""def get_random_item(input_list):
    return random.choice(input_list)"""
user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
]
