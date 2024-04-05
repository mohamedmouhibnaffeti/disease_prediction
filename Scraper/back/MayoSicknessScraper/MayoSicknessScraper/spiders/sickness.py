import scrapy


class SicknessSpider(scrapy.Spider):
    name = "sickness"
    allowed_domains = ["www.mayoclinic.org"]
    start_urls = ["https://www.mayoclinic.org/diseases-conditions/index?letter=A"]

    def parse(self, response):
        datas = response.xpath("//*[@class='cmp-result-letters ']/following-sibling::ul/li/descendant::a/@href")
        for data in datas:
            if data is not None:
                nextPage = data.get()
                yield response.follow(nextPage, callback=self.sickness_details_page)
        next_page = response.xpath("//li[/descendant::a[@class='cmp-anchor--plain cmp-button cmp-button__link cmp-button__inner--type-alphabetFacet cmp-button__inner--type-alphabetFacet_selected']]/following-sibling::li/div/a[@class='cmp-anchor--plain cmp-button cmp-button__link cmp-button__inner--type-alphabetFacet ']/@href").get()
        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)
    
    def sickness_details_page(self, response):
        title = response.css('header .row h1 ::text').get()
        if(title != None):
            symptoms = response.xpath("//*[contains(text(), 'ymptoms')]/following-sibling::ul/li/text()")
            symptoms_string = ""
            for symptom in symptoms:
                sym = symptom.get()
                if(symptom is not None):
                    symptoms_string += str(sym) + "\n"
            
            if len(symptoms_string) != 0:
                yield{
                    "SicknessName" : title,
                    "Symptoms": symptoms_string
                }
            
