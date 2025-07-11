from flask import Flask, jsonify
from flask_cors import CORS
import json
import os
app = Flask(__name__)
CORS(app)
DATA_DIR = 'data'

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    with open(path, 'r') as file:
        return json.load(file)

@app.route('/')
def home():
    return {'status': 'API is running'}

@app.route('/api/daily-sales')
def daily_sales():
    return jsonify(load_json('daily_sales.json'))

@app.route('/api/category-sales')
def category_sales():
    return jsonify(load_json('category_sales.json'))

@app.route('/api/courier-status')
def courier_status():
    return jsonify(load_json('courier_status.json'))

@app.route('/api/fulfilment-summary')
def fulfilment_summary():
    return jsonify(load_json('fulfilment_summary.json'))

@app.route('/api/state-sales')
def state_sales():
    return jsonify(load_json('state_sales.json'))

@app.route('/api/customer-clusters')
def customer_clusters():
    return jsonify(load_json('customer_clusters_kmeans.json'))

if __name__ == '__main__':
    app.run(debug=True)
