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

# 显示所有列
pd.set_option('display.max_columns', None)
# 显示所有行
pd.set_option('display.max_rows', None)
# 设置value的显示长度为100，默认为50
pd.set_option('max_colwidth', 100)


def process2(file_path):
    file_list = os.listdir(file_path)
    for file in file_list:
        temp = 0
        data = pd.read_excel(file_path + "\\" + file, engine='openpyxl')
        print(data)
        year = '2021'
        (team, post) = file.split(".")
        print(team)
        relation = '队友'
        result = pd.DataFrame(columns=['球员1', '球员2', '关系', '球队', '年份'])
        for i in range(len(data) - 1):
            for j in range(i + 1, len(data)):
                a = {"球员1": data.iloc[i]['球员'], "球员2": data.iloc[j]['球员'], "关系": relation, "球队": team, "年份": year}
                result = result.append(a, ignore_index=True)
        result['球员1'].replace(regex=True, inplace=True, to_replace=r'\d+', value=r'')
        result['球员2'].replace(regex=True, inplace=True, to_replace=r'\d+', value=r'')
        print(result)
        result.to_csv(r'D:\Desktop\basketball-neo4j\data\player\Result.csv', sep='\t', index=False,
                      encoding="utf_8_sig", mode='a')
        print('done')


if __name__ == '__main__':
    process2(r'D:\Desktop\basketball-neo4j\data\player\excel')
