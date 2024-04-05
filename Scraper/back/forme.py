import requests
from bs4 import BeautifulSoup

def get_keywords(url):
    # Define a custom User-Agent
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    
    # Send GET request to the URL with custom headers
    response = requests.get(url, headers=headers)
    
    # Check if request was successful
    if response.status_code == 200:
        # Parse HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the div with class "card"
        card_div = soup.find('div', class_='card')
        
        if card_div:
            # Find the paragraph tag inside the card div
            keywords_p = card_div.find('p', class_=None)
            
            if keywords_p:
                # Extract the keywords
                keywords = keywords_p.get_text(strip=True)
                return keywords
            else:
                print("Keywords not found")
        else:
            print("Card div not found")
    else:
        print("Failed to retrieve data. Status code:", response.status_code)

def save_to_txt(keywords, filename):
    with open(filename, 'w') as file:
        file.write(keywords)

# Example usage
url = 'https://cs.tut.ac.jp/en/lab/'
keywords = get_keywords(url)
if keywords:
    print("Keywords:", keywords)
    save_to_txt(keywords, 'keywords.txt')
    print("Keywords saved to keywords.txt")
