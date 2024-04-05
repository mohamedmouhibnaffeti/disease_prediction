# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import string
import re
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')


#cleaning words (removing stop words and other expressions zeydin)
def remove_words(sentence, words_to_remove):
    string_lower = sentence.lower()
    string_lower = string_lower.replace("\u2019", "'")
    string_lower = re.sub(r'[?!,]', '', string_lower)
    string_lower = re.sub(r':.*', '', string_lower)
    string_lower = re.sub(r'^\d+', '', string_lower)
    words = string_lower.split()
    filtered_words = [word for word in words if word not in words_to_remove]
    return ' '.join(filtered_words)

class SicknessscraperPipeline:
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        #cleaning sickness names
        sickness_title = adapter.get('Sickness_Name')
        sickness_title = sickness_title[0]
        words_to_remove = stopwords.words('english')
        words_to_remove += ["causes", "cause", "what's", "faq", "treatment", "what", "questions", "answered", "understanding", "--", "basics", "treatments"]

        adapter['Sickness_Name'] = remove_words(sickness_title, words_to_remove=words_to_remove)

        # cleaning symptoms
        symptoms = adapter.get('Symptoms')
        symptoms = symptoms.lower()
        symptoms = symptoms.replace("\u2019", "'")
        words = re.findall(r'\b\w+\b|\n', symptoms)
        filtered_words = [word for word in words if len(word) >= 3 or word == '\n']
        if len(filtered_words) >= 3:
            symptoms_res = ' '.join(filtered_words)
        else:
            symptoms_res = ''
        
        adapter['Symptoms'] = symptoms_res





        return item
