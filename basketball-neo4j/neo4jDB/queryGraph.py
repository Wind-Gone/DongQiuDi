from NLP.query import nlp_graph_query
from neo4jDB.initConfig import graph, CA_LIST


def formJSON(data):
    json_data = {'data': [], "links": []}
    d = []
    for i in data:
        d.append(i['p.Name'] + "_" + i['p.cate'])
        d.append(i['n.Name'] + "_" + i['n.cate'])
        d = list(set(d))
    name_dict = {}
    count = 0
    for j in d:
        j_array = j.split("_")
        data_item = {}
        name_dict[j_array[0]] = count
        count += 1
        data_item['name'] = j_array[0]
        data_item['category'] = CA_LIST[j_array[1]]
        json_data['data'].append(data_item)
    for i in data:
        link_item = {'source': name_dict[i['p.Name']], 'target': name_dict[i['n.Name']], 'value': i['r.relation']}
        json_data['links'].append(link_item)
    print(json_data)
    return json_data


def query(name):
    data = graph.run(
        "match(p )-[r]->(n:Player{Name:'%s'}) return  p.Name,r.relation,n.Name,p.cate,n.cate\
        Union all\
    match(p:Player {Name:'%s'}) -[r]->(n) return p.Name, r.relation, n.Name, p.cate, n.cate" % (name, name)
    )
    data = list(data)
    return formJSON(data)


def get_answer(array):
    data_array = []
    print("2", array)
    for i in range(len(array) - 1):
        if i:
            name = data_array[-1]['p.Name']
        else:
            name = array[0]
        print(name)
        print(array[i + 1])
        data = graph.run(
            "match(p:Player{Name:%s})-[r:%s]-> (n) return  p.Name,n.Name,r.relation,p.cate,n.cate" % (
                '\''+name+'\'', '`'+array[i + 1]+'`')
        )
        data = list(data)
        print(data)
        data_array.extend(data)
        print("***" * 20)
    return formJSON(data_array)


# if __name__ == '__main__':
#     question = nlp_graph_query("勒布朗-詹姆斯的队友是谁？")
#     get_answer(question)
