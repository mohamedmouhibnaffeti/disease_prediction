"""from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from twisted.internet import reactor
from bookspider import BookspiderSpider
from sk import SicknessSpider

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/scrape', methods=['POST'])
def scrape():
    configure_logging()
    runner = CrawlerRunner()
    d = runner.crawl(BookspiderSpider, socketio=socketio)
    d.addBoth(lambda _: reactor.stop())
    reactor.run()
    return jsonify({"message": "Scraping initiated! kkk"})

if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)

"""
"""
from flask import Flask, jsonify
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
            #fetch item
            with open('result2.csv', 'a', newline='', encoding='utf-8') as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerow([item.get("Sickness_Name", ""), item.get("Symptoms", "")])


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
    return jsonify({'message': 'Scraping process completed successfully!'})

@app.route('/api/stop-scraping', methods=['POST'])
def stop_scraping():
    global scraping_process
    scraping_process.terminate()
    scraping_process.join()

    return jsonify({'message': 'Scraping process stopped successfully!'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
"""


"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from twisted.internet import reactor
from bookspider import BookspiderSpider
from sk import SicknessSpider
from scrapy.crawler import CrawlerProcess
from multiprocessing import Process

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


scraping_process = None

def startScraping():
    try:
        process = CrawlerProcess()
        process.crawl(BookspiderSpider, socketio=socketio)
        process.start()
        process.join()
        print('Scraping completed successfully!')
        return True
    except Exception as e:
        print(f'Error while starting scraping: {e}')
        return False


@app.route('/scrape', methods=['POST'])
def trigger_scraping():
    global scraping_process

    if scraping_process and scraping_process.is_alive():
        return jsonify({'message': 'Scraping process is already running!'})

    scraping_process = Process(target=startScraping)
    scraping_process.start()
    scraping_process.join()
    return jsonify({'message': 'Scraping process completed successfully!'})

@app.route('/api/stop-scraping', methods=['POST'])
def stop_scraping():
    global scraping_process
    scraping_process.terminate()
    scraping_process.join()

    return jsonify({'message': 'Scraping process stopped successfully!'})











if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True, use_reloader=True)
"""


"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from twisted.internet import reactor
from bookspider import BookspiderSpider
from sk import SicknessSpider

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/scrape', methods=['POST'])
def scrape():
    configure_logging()
    runner = CrawlerRunner()
    d = runner.crawl(BookspiderSpider, socketio=socketio)
    d.addBoth(lambda _: reactor.stop())
    reactor.run()
    return jsonify({"message": "Scraping initiated! kkk"})

@app.route('/stop', methods=['GET'])
def stop():
    if reactor.running:
        reactor.stop()
        return jsonify({"stop": "Scraping stopped!"})
    else:
        return jsonify({"stop": "Scraping is not running."})


if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
    """


from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from sk import SicknessSpider


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


process = None

    
@app.route('/scrape', methods=['POST'])
def scrape():
    global process
    settings = get_project_settings()
    process = CrawlerProcess(settings=settings)
    process.crawl(SicknessSpider, socketio=socketio)
    process.start(install_signal_handlers=False)
    return jsonify({"message": "Scraping completed!"})

@app.route('/stop', methods=['GET'])
def stop():
    global process
    process.stop()
    return jsonify({"stop": "Scraping stopped!"})

if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
"""


from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from sk import SicknessSpider

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

process = None

@app.route('/scrape', methods=['POST'])
def scrape():
    global process
    settings = get_project_settings()
    process = CrawlerProcess(settings=settings)
    process.crawl(SicknessSpider, socketio=socketio)
    process.start(stop_after_crawl=False)
    return jsonify({"message": "Scraping started!"})

@app.route('/stop', methods=['POST'])
def stop():
    global process
    if process:
        process.stop()
        return jsonify({"message": "Scraping stopped!"})
    else:
        return jsonify({"message": "No scraping process running."})

@socketio.on('disconnect')
def test_disconnect():
    global process
    if process:
        process.stop()
        print("Socket disconnected. Scraping stopped.")

if __name__ == "__main__":
    socketio.run(app, debug=True, use_reloader=False)
"""