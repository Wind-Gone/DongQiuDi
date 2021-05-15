# encoding=utf-8
import jieba
import pyltp
import os
from pyltp import Postagger

model_pos = r'D:\Desktop\basketball-neo4j\model\ltp_data_v3.4.0'


def word_tokenize(words):
    words_list = jieba.lcut(words, cut_all=False)
    punctuations = [',', '.', ':', ';', '？', '(', ')', '[', ']', '&', '!', '*', '@', '#', '$', '%', '?']
    words_list = [word for word in words_list if word not in punctuations]
    print("Default Mode: " + "/ ".join(words_list))  # 精确模式
    print(words_list)
    return words_list


def is_all_chinese(strs):
    for _char in strs:
        if not '\u4e00' <= _char <= '\u9fa5':
            return False
    return True


def process_EnglishName(words_list):
    if is_all_chinese(words_list[0]) and is_all_chinese(words_list[2]) and words_list[1] == "-":
        words_list[0] = words_list[0] + words_list[1] + words_list[2]
        words_list.remove(words_list[1])
        words_list.remove(words_list[1])
    print(words_list)
    return words_list


def PosTag(words_list):
    pos_model_path = os.path.join(model_pos, 'pos.model')
    postagger = Postagger()
    postagger.load(pos_model_path)
    postags = postagger.postag(words_list)
    pos_str = '\t'.join(postags)
    pos_list = pos_str.split("\t")
    print(pos_str)
    postagger.release()
    return pos_list


def load_synonyms(file_path):
    synonyms = []
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            synonyms.append(line.strip().split(' '))
    return synonyms


def nlp_graph_query(words):
    words_list = word_tokenize(words)
    words_list = process_EnglishName(words_list)
    synonyms = load_synonyms(r"D:\Desktop\basketball-neo4j\NLP\relation.txt")
    for i in range(len(words_list)):
        for j in range(len(synonyms)):
            # print(synonyms[j][0].strip(), words_list[i].strip(), synonyms[j][0].strip() == words_list[i].strip())
            if synonyms[j][0] == words_list[i]:
                words_list[i] = synonyms[j][1]
    print(words_list)
    result = []
    pos_list = PosTag(words_list)
    for i in range(0, len(pos_list)):
        if pos_list[i] == 'nh' or pos_list[i] == 'n':
            result.append(words_list[i])
    print(result)
    return result
#
#
# if __name__ == '__main__':
#     print(nlp_graph_query("勒布朗-詹姆斯的队友是谁？"))
