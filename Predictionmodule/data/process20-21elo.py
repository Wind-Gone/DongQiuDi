# -*- coding: utf-8 -*-
import csv
import importlib
import os
import os.path
import random
import re
import sys
import time
import shutil
import csv
import pandas as pd
import numpy as np

dict = {}


def revise_postfix(path):
    file_list = os.listdir(path)
    for file in file_list:
        cur_path = os.path.join(path, file)
        if os.path.isdir(cur_path):
            revise_postfix(cur_path)
        else:
            new_suf = cur_path.replace('.txt', '.csv')
            print(new_suf)
            shutil.move(cur_path, new_suf)


def process(path):
    file_list = os.listdir(path)
    for file in file_list:
        temp = 0
        data = pd.read_csv(path + "\\" + file, encoding='unicode_escape')
        print(file)
        print(data)
        data = data.dropna(axis=0)
        for i in range(0, len(data)):
            temp += data.iloc[i]['PTS/G']
        dict[file] = temp / len(data)
    print(dict)


if __name__ == '__main__':
    # revise_postfix(r'D:\hu\Study\Project\人工智能第五小组项目\详细数据\20-21球员数据')
    process(r'D:\hu\Study\Project\人工智能第五小组项目\详细数据\20-21球员数据')
    result = pd.DataFrame(columns=('TEAM', 'PER'))
    for key in dict.keys():
        print(key, ",", dict[key])
        a = {"TEAM": key, "PER": dict[key]}
        result.append(a, ignore_index=True)
    print(result)
