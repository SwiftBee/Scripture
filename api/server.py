from crypt import methods
from flask import (
    Flask, 
    jsonify,
    request,
    Response,
)
from flask_cors import CORS
import json
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.before_first_request
def initialize():
    global bible_json
    bible_json = json.load(open('bible.json'))
    
    
@app.route('/get-bgimage', methods=['GET'])
def get_bgimage():
    pass

@app.route('/get-index', methods=['GET'])
def get_index():
    return jsonify(bible_json['metadata']['index'])


@app.route('/get-todays-verse', methods=['GET'])
def get_todays_verse():
    random.seed(datetime.today().strftime('%d/%m/%Y'))
    data = random.choice(bible_json["verses"])
    return jsonify(data)
    

@app.route('/get-chapter', methods=['GET'])
def get_verse() -> Response:
    book_name: str = request.args.get('book_name', '').strip().casefold()
    book_no: int = int(request.args.get('book_no', 0))
    chapter_list: list = list(map(int, request.args.get('chapter_no', '').split(',')))
    
    if len(chapter_list) == 1:
        chapter_no = chapter_list
    elif len(chapter_list) == 2:
        chapter_no = range(chapter_list[0], chapter_list[1] + 1)
        
    data = list(filter(lambda b: ((b['book_name']).casefold() == book_name or
                      b['book'] == book_no) and
                      b['chapter'] in chapter_no,
                      bible_json['verses']))
    return jsonify(data)


if __name__ == '__main__':
    app.run()