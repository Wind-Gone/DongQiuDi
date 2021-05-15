from flask import Flask, request, jsonify
import requests

from NLP.query import nlp_graph_query
from neo4jDB.queryGraph import query, get_answer
from flask_cors import *

app = Flask(__name__)
CORS(app, supports_credentials=True)

headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
}


@app.route('/search_name', methods=['GET', 'POST'])
def search_name():
    if request.method == 'POST':
        name = request.get_json("roleName")
    else:
        name = request.args.get("roleName")
    print(name)
    json_data = query(str(name))
    return jsonify(json_data)


@app.route('/kgforsolo', methods=['GET', 'POST'])
def kgforsolo():
    if request.method == 'POST':
        name = request.get_json("roleName")
    else:
        name = request.args.get("roleName")
    print(name)
    prefix = "https://api.ownthink.com/kg/knowledge"
    ownThinkUrl = prefix + "?entity=" + name
    response = requests.get(ownThinkUrl)
    raw_data = response.json()['data']['avp']
    print(response.json()['data'])
    nodes = []
    links = []
    nodedict = {}
    linksdict = {}
    catedict = []
    cnt = 1
    nodes.append({'name': response.json()['data']['entity'], 'id': 0, 'category': 0})
    for data in raw_data:
        nodedict['name'] = data[1]
        nodedict['id'] = cnt
        nodedict['category'] = cnt
        catedict.append({'name': '信息' + str(cnt)})
        links.append({'source': 0, 'target': cnt, 'value': data[0]})
        cnt += 1
        nodes.append(nodedict)
        nodedict = {}
        if cnt >= 20:
            break
    value = {}
    value['data'] = nodes
    value['links'] = links
    value['categories'] = catedict
    print(value)
    return value


@app.route('/kgforquery', methods=['GET', 'POST'])
def kgforquery():
    if request.method == 'POST':
        inputText = request.get_json("inputText")
    else:
        inputText = request.args.get("inputText")
    json_data = get_answer(nlp_graph_query(str(inputText)))
    return jsonify(json_data)


if __name__ == '__main__':
    app.run(debug=True)
