import threading
import ctypes
import time


import os
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_socketio import SocketIO
from scrapers.mayoclinic import MayoClinicScraper
import settings
global_thread = None



def kill_thread():
    """Kill the global thread by raising SystemExit exception."""
    global global_thread

    if global_thread is None:
        print("No thread to kill.")
        return

    if global_thread.ident is None:
        print("Thread has not started.")
        return

    # Raise SystemExit exception in the thread
    tid = global_thread.ident
    exc = ctypes.py_object(SystemExit)
    res = ctypes.pythonapi.PyThreadState_SetAsyncExc(ctypes.c_long(tid), exc)
    if res == 0:
        print("Failed to kill the thread.")
    else:
        print("Thread killed.")



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







app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
totaldata=0
MayoClinic = MayoClinicScraper(socketio)




@app.route('/api/dataget', methods=['GET'])
def get_data():
    x=settings.python_files
    print(x)
    return jsonify(extract_file_names(x))



running = True
@app.route('/api/start-scraping', methods=['POST'])
def start_collecting():
    global global_thread
    global_thread = threading.Thread(target=MayoClinic.main_MayoClinicScraper)
    global_thread.start()
    return jsonify('scraper completed !')



@app.route('/api/stop-scraping', methods=['POST'])
def stop_collecting():
    kill_thread()
    return jsonify('scraper stoped !')


@app.route('/api/upload-scraper', methods=['POST'])
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

@app.route('/api/download-documentation')
def download_documentation():
    documentation_path = 'scrapers/book.py'
    return send_file(documentation_path, as_attachment=True)

@app.route('/api/delete-scraper', methods=['POST'])
def delete_scraper_route():
    try:
        file_name = request.json['fileName']
        python_files = settings.python_files
        updated_files = [file for file in python_files if file['file name'] != file_name]
        with open('settings.py', 'w') as f:
            f.write(f'python_files={updated_files}')
        scraper_path = os.path.join("./scrapers/", file_name + ".py")
        os.remove(scraper_path)
        return 'Scraper deleted successfully', 200
    except Exception as e:
        return str(e), 400


@app.route('/api/modify-scraper', methods=['POST'])
def modify_scraper():
    file_name = request.json['file']
    new_content = request.json['content']
    try:
        with open(os.path.join("./scrapers/", f'{file_name}.py'), 'w') as f:
            f.write(new_content)
        return 'Scraper modified successfully', 200
    except Exception as e:
        return str(e), 400
    

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)






































"""import os
from flask import Flask, jsonify, request, send_file
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







app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
totaldata=0
MayoClinic = MayoClinicScraper(socketio)




@app.route('/api/dataget', methods=['GET'])
def get_data():
    x=settings.python_files
    print(x)
    return jsonify(extract_file_names(x))



running = True
@app.route('/api/start-scraping', methods=['POST'])
def start_collecting():
    MayoClinic.main_MayoClinicScraper()
    return jsonify('scraper completed !')



@app.route('/api/stop-scraping', methods=['POST'])
def stop_collecting():
    pass


@app.route('/api/upload-scraper', methods=['POST'])
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

@app.route('/api/download-documentation')
def download_documentation():
    documentation_path = 'scrapers/book.py'
    return send_file(documentation_path, as_attachment=True)

@app.route('/api/delete-scraper', methods=['POST'])
def delete_scraper_route():
    try:
        file_name = request.json['fileName']
        python_files = settings.python_files
        updated_files = [file for file in python_files if file['file name'] != file_name]
        with open('settings.py', 'w') as f:
            f.write(f'python_files={updated_files}')
        scraper_path = os.path.join("./scrapers/", file_name + ".py")
        os.remove(scraper_path)
        return 'Scraper deleted successfully', 200
    except Exception as e:
        return str(e), 400


@app.route('/api/modify-scraper', methods=['POST'])
def modify_scraper():
    file_name = request.json['file']
    new_content = request.json['content']
    try:
        with open(os.path.join("./scrapers/", f'{file_name}.py'), 'w') as f:
            f.write(new_content)
        return 'Scraper modified successfully', 200
    except Exception as e:
        return str(e), 400
    

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)"""



