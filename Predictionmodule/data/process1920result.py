import csv
import pandas as pd
import numpy as np

if __name__ == '__main__':
    csvfile = pd.read_csv(r'D:\Desktop\DongQiuDi\data\19-20OriginalResult.csv', encoding='gb18030')
    df3 = pd.DataFrame(columns=('Wteam', 'Lteam', 'WLOC'))
    for i in range(0, len(csvfile)):
        if csvfile.iloc[i]['HPTS'] < csvfile.iloc[i]['VPTS']:
            a = {"Wteam": csvfile.iloc[i]['Home'], "Lteam": csvfile.iloc[i]['Visitor'], "WLOC": 'H'}
            df3 = df3.append(a, ignore_index=True)
        else:
            a = {"Wteam": csvfile.iloc[i]['Visitor'], "Lteam": csvfile.iloc[i]['Home'], "WLOC": 'L'}
            df3 = df3.append(a, ignore_index=True)
    df3.to_excel(r'D:\Desktop\DongQiuDi\data\19-20Result.xlsx')
    print(df3)
