from py2neo import Graph, Node, Relationship
import py2neo

print(py2neo.__version__)
graph = Graph(host='localhost', auth=('neo4j', '123456'))
CA_LIST = {"76人": 0, "独行侠": 1, "湖人": 2, "黄蜂": 3, "掘金": 4, "爵士": 5, "开拓者": 6, "凯尔特人": 7,
           "快船": 8, "老鹰": 9, "篮网": 10, "尼克斯": 11, "热火": 12, "太阳": 13, "雄鹿": 14, "勇士": 15}
