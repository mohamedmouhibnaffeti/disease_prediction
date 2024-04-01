import scrapy


class DatabaseSpider(scrapy.Spider):
    name = "database"
    allowed_domains = ["www.diseasesdatabase.com"]
    start_urls = ["https://www.diseasesdatabase.com"]

    def parse(self, response):
        pass
