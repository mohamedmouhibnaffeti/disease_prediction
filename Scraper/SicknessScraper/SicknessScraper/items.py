# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class SicknessscraperItem(scrapy.Item):
    # define the fields for your item here like:
    name = scrapy.Field()
    pass

class SicknessItem(scrapy.Item):
    Sickness_Name = scrapy.Field()
    Symptoms = scrapy.Field()
