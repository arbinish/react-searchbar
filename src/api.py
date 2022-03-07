#!/usr/bin/env python3

from flask import Flask, jsonify, request
import json
from pathlib import Path


static_path = Path(".").absolute().parent / "build" / "static"
app = Flask(__name__, static_folder=static_path)
index_file = None

@app.route('/')
def index():
    return index_file

@app.route("/api/v1/names")
def get_names():
    params = request.args.get("q")
    print("params", params)
    if not params:
        response = jsonify(data=name_db)
    response = jsonify(data=[d for d in name_db if d["firstname"].lower().startswith(params.lower())])
    response.cache_control.max_age = 300
    response.add_etag()
    response.make_conditional(request)
    return response


if __name__ == "__main__":
    name_db = []
    country_db = []
    with open("names.json") as fd:
        name_db = json.load(fd)

    with open("country.json") as fd:
        country_db = json.load(fd)
    
    with open(static_path.parent / 'index.html') as fd:
        index_file = fd.read()
    app.run(debug=True)
