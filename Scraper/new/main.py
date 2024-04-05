import os
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_socketio import SocketIO
from scrapers.mayoclinic import MayoClinicScraper
import settings


def extract_file_names(files_list):
    file_names = set()
    for file_dict in files_list:
        file_names.add(file_dict.get('file name'))
    return list(file_names)

def find_file_or_class(file_name, class_name, python_files):
    for file_info in python_files:
        if file_info['file name'] == file_name or file_info['class name'] == class_name:
            return True
    return False




#app = Flask(__name__, template_folder='./')
app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
MayoClinic = MayoClinicScraper(socketio)



@app.route('/api/dataget', methods=['GET'])
def get_data():
    x=settings.python_files
    return jsonify(extract_file_names(x))


"""@app.route('/')
def index():
    return render_template('index.html')"""

@app.route('/api/start-scraping', methods=['POST'])
def start_collecting():
        MayoClinic.main_MayoClinicScraper()


@app.route('/stop_collecting')
def stop_collecting():
     pass

@app.route('/upload_scraper', methods=['POST'])
def upload_scraper():
    file = request.files['file']
    class_name = request.form['className']
    class_Function = request.form['classFunction']
    x=settings.python_files

    if find_file_or_class(file.filename[:(file.filename.rfind('.'))], class_name, x):
        return 'Scraper file already exists.'
    

    
    data= {"file name": file.filename[:(file.filename.rfind('.'))] , "class name": class_name, "function name": class_Function}
    x.append(data)
    with open('settings.py', 'w') as f:
        f.write(f'python_files={x}')
    file.save(os.path.join("./scrapers/", file.filename))
    return 'File uploaded successfully'




if __name__ == '__main__':
    socketio.run(app, debug=True, port=5002, allow_unsafe_werkzeug=True)
