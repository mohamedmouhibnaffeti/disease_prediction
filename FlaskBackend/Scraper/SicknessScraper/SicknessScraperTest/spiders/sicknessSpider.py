import scrapy
from SicknessScraperTest.items import SicknessItem

class SicknessspiderSpider(scrapy.Spider):
    name = "sicknessSpider"
    allowed_domains = ["books.toscrape.com"]
    start_urls = ["https://books.toscrape.com"]

    def parse(self, response):
        books = response.css('article.product_pod')
        for book in books: 
            details_page = book.css('h3 a::attr(href)').get()
            if details_page is not None:
                if 'catalogue/' in details_page:
                    details_page_url = 'https://books.toscrape.com/' + details_page
                else:
                    details_page_url = 'https://books.toscrape.com/catalogue/' + details_page
                yield response.follow(details_page_url, callback=self.parse_book_page)
            """yield{
                'Name' : book.css('h3 a::text').get(),
                'Price' : book.css('.product_price .price_color::text').get(),
                'URL' : book.css('h3 a').attrib['href']
            }        """

        next_page = response.css('li.next a::attr(href)').get()
        if next_page is not None:
            if 'catalogue/' in next_page:
                next_page_url = 'https://books.toscrape.com/' + next_page
            else:
                next_page_url = 'https://books.toscrape.com/catalogue/' + next_page
            yield response.follow(next_page_url, callback=self.parse)

    
    def parse_book_page(self, response):
        table_rows = response.css('table tr')
        sicknessItem = SicknessItem()

        sicknessItem['url'] = response.url,
        sicknessItem['title'] = response.css('.product_main h1::text').get(),
        sicknessItem['upc'] = table_rows[0].css('td ::text').get(),
        sicknessItem['product_type'] = table_rows[1].css('td ::text').get(),
        sicknessItem['price_excl_tax'] = table_rows[2].css('td ::text').get(),
        sicknessItem['price_incl_tax'] = table_rows[3].css('td ::text').get(),
        sicknessItem['tax'] = table_rows[4].css('td ::text').get(),
        sicknessItem['availability'] = table_rows[5].css('td ::text').get(),
        sicknessItem['num_reviews'] = table_rows[6].css('td ::text').get(),
        sicknessItem['stars'] = response.css('p.star-rating').attrib['class'],
        sicknessItem['category'] = response.xpath("//ul[@class='breadcrumb']/li[@class='active']/preceding-sibling::li[1]/a/text()").get(),
        sicknessItem['description'] = response.xpath("//div[@id='product_description']/following-sibling::p/text()").get(),
        sicknessItem['price'] = response.css('p.price_color ::text').get(),

        yield sicknessItem