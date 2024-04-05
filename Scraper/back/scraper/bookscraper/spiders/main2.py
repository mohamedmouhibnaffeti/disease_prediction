import subprocess

def scrape():
    command = ["scrapy", "crawl", "SicknessSpider"]
    process = subprocess.Popen(command)
    process.wait()  # Wait for the process to finish before exiting

if __name__ == "__main__":
    scrape()
