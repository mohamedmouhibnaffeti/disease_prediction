import requests
from bs4 import BeautifulSoup
from flask_socketio import SocketIO

class BookScraper:
    session = requests.Session()
    base_url = 'https://books.toscrape.com/'
    collecting = False

    def __init__(self, socketio):
        self.socketio = socketio

    def scrape(self, url):
        response = self.session.get(url)
        return BeautifulSoup(response.text, 'html.parser')

    def parse_book_page(self, url):
        soup = self.scrape(url)
        book_data = {
            'url': url,
            'title': soup.select_one('.product_main h1').get_text(strip=True),
            'product_type': soup.select("table tr")[1].select_one("td").get_text(strip=True),
            'price_excl_tax': soup.select("table tr")[2].select_one("td").get_text(strip=True),
            'price_incl_tax': soup.select("table tr")[3].select_one("td").get_text(strip=True),
            'tax': soup.select("table tr")[4].select_one("td").get_text(strip=True),
            'availability': soup.select("table tr")[5].select_one("td").get_text(strip=True),
            'num_reviews': soup.select("table tr")[6].select_one("td").get_text(strip=True),
            'stars': soup.select_one("p.star-rating")['class'],
            'category': soup.select_one("ul.breadcrumb li.active").find_previous_sibling("li").find('a').get_text(strip=True),
            'description': soup.select_one("div#product_description + p").get_text(strip=True),
            'price': soup.select_one('p.price_color').get_text(strip=True),
        }
        self.socketio.emit('book_data', {'book': book_data})

    def parse_books(self, url):
        self.collecting = True
        while self.collecting:
            soup = self.scrape(url)
            for book in soup.select('article.product_pod'):
                relative_url = book.select_one('h3 a')['href']
                book_url = self.base_url + ('catalogue/' + relative_url if 'catalogue/' not in relative_url else relative_url)
                self.parse_book_page(book_url)

            next_page = soup.select_one('li.next a')['href']
            url = self.base_url + ('catalogue/' + next_page if next_page and 'catalogue/' not in next_page else next_page) if next_page else None
            if not url:
                break

    def stop_collection(self):
        self.collecting = False
