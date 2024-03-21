import scrapy
from SicknessScraper.items import SicknessItem


class SicknessSpider(scrapy.Spider):
    name = "sickness"
    allowed_domains = ["www.webmd.com"]
    

    def parse(self, response):
        sicknesses = response.css('.link-list li')
        for sickness in sicknesses:
            sickness_url = sickness.css('a ::attr("href")').get()
            yield response.follow(sickness_url, callback=self.sickness_details_page)
        
        next_page = response.xpath("//div[@class='topics-list']/nav[@class='letter-nav']/ul/li[@class='active']/following-sibling::li/a/@href").get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)


    def sickness_details_page(self, response):
        title = response.css('.inner-article-container header h1 ::text').get()
        sicknessItem = SicknessItem()

        if(title != None):
            
            symptoms_response = response.xpath('//*[contains(text(), "symptoms")]/following-sibling::ul')
            
            all_symptoms = symptoms_response.css('li')
            
            all_symptoms_string = ""
            for symptom in all_symptoms:
                symptom = symptom.css('::text').get()
                if symptom is not None:
                    all_symptoms_string += str(symptom) + "\n"

            if len(all_symptoms_string) != 0:
                    sicknessItem["Sickness_Name"] = title,
                    sicknessItem["Symptoms"] = all_symptoms_string
                    yield sicknessItem 
