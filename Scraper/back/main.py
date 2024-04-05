from flask import Flask, jsonify, send_file
from flask_cors import CORS
from multiprocessing import Process
from scrapy.crawler import CrawlerProcess
from scrapy.signalmanager import dispatcher
from scrapy import signals
from MayoSicknessScraper.MayoSicknessScraper.spiders.sickness import SicknessSpider as MayoSpider
import csv

app = Flask(__name__)
CORS(app)

class SpiderOutputCollector:
    def __init__(self):
        self.items = []

    def collectOutput(self, item):
        self.items.append(item)

scraping_process = None

def startScraping(output_collector):
    try:
        process = CrawlerProcess()
        spider_output_collector = output_collector

        dispatcher.connect(spider_output_collector.collectOutput, signal=signals.item_scraped)

        process.crawl(MayoSpider)
        process.start()
        process.join()

        collected_items = spider_output_collector.items

        for item in collected_items:
            with open('result3.csv', 'a', newline='', encoding='utf-8') as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerow([item.get("SicknessName", ""), item.get("Symptoms", "")])


        print('Scraping completed successfully!')
        return True
    except Exception as e:
        print(f'Error while starting scraping: {e}')
        return False

@app.route('/api/start-scraping', methods=['POST'])
def trigger_scraping():
    global scraping_process

    if scraping_process and scraping_process.is_alive():
        return jsonify({'message': 'Scraping process is already running!'})

    output_collector = SpiderOutputCollector()
    scraping_process = Process(target=startScraping, args=(output_collector,))
    scraping_process.start()
    scraping_process.join()
    return send_file('./result3.csv', as_attachment=True)

@app.route('/api/stop-scraping', methods=['POST'])
def stop_scraping():
    global scraping_process
    scraping_process.terminate()
    scraping_process.join()

    return jsonify({'message': 'Scraping process stopped successfully!'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
