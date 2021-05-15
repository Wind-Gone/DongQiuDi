# coding=gbk
import csv
import math
import random
import xgboost as xgb
import numpy as np
import pandas as pd
from sklearn import linear_model
from sklearn.model_selection import cross_val_score, train_test_split

# from tensorflow.python.keras.layers import Dense, Activation, Dropout
# from tensorflow.python.keras.models import Sequential

X = []
y = []
a = 1600  # 左边界
b = 2000  # 右边界

'''
当每支队伍没有elo等级分时，赋予其基础elo等级分
'''
# elo_init = 1800
elos1 = {}
elos2 = {}
gp_state = {}

'''
按照球员战斗力进行初始elo等级的分配,最后将elo值划分到指定区间
'''

team_ability = pd.read_csv(
    r'D:\Desktop\DongQiuDi\data\19-20ELO.csv', encoding='gb18030')
original = pd.DataFrame(team_ability, columns=['TEAM', 'PER'])
XMIN = original.min()['PER']
XMAX = original.max()['PER']
original['PER'] = a + (b - a) / (XMAX - XMIN) * (original['PER'] - XMIN)
team_ability_2 = pd.read_csv(
    r'D:\Desktop\DongQiuDi\data\20-21ELO.csv', encoding='gb18030')
original_2 = pd.DataFrame(team_ability, columns=['TEAM', 'PER'])
XMIN_2 = original_2.min()['PER']
XMAX_2 = original_2.max()['PER']
original_2['PER'] = a + (b - a) / (XMAX_2 - XMIN_2) * (original_2['PER'] - XMIN_2)

'''
以Opponent，Team, Miscellaneous表数据进行每支队伍数据的初始化
'''


def team_initialize(O, T, M):
    new_M = M.drop(['Rk', 'Arena'], axis=1)
    new_O = O.drop(['Rk', 'G', 'MP'], axis=1)
    new_T = T.drop(['Rk', 'G', 'MP'], axis=1)
    state1 = pd.merge(new_T, new_O, how='left', on='Team')
    # state1 = pd.merge(state1, new_T, how='left', on='Team')
    return state1.set_index('Team', inplace=False, drop=True)


'''
整合数据，建立即将处理的数据集
'''


def setData(data):
    print("建立数据集..")
    X = []
    skip = 0
    for index, row in data.iterrows():

        Wteam = row['Wteam']
        Lteam = row['Lteam']

        team1_elo = elo_init(Wteam, 0)
        team2_elo = elo_init(Lteam, 0)

        # 给主场比赛的队伍加上120的elo值
        if row['WLOC'] == 'H':
            team1_elo += 120
        else:
            team2_elo += 120

        # 把elo当为评价每个队伍的第一个特征值
        tip1 = [team1_elo]
        tip2 = [team2_elo]

        # 添加我们从basketball reference.com获得的每个队伍的统计信息
        for key, value in gp_state.loc[Wteam].iteritems():
            tip1.append(value)
        for key, value in gp_state.loc[Lteam].iteritems():
            tip2.append(value)

        # 将两支队伍的特征值随机的分配在每场比赛数据的左右两侧
        # 并将对应的0/1赋给y值
        if random.random() > 0.5:
            X.append(tip1 + tip2)
            y.append(0)
        else:
            X.append(tip2 + tip1)
            y.append(1)

        if skip == 0:
            print('X', X)
            skip = 1

        # 根据这场比赛的数据更新队伍的elo值
        new_wscore, new_lscore = elo_cal(Wteam, Lteam)
        elos1[Wteam] = new_wscore
        elos1[Lteam] = new_lscore

    return np.nan_to_num(X), y


'''
elo值的分配
if 
flag == 0：
分配的是18-19赛季
flag == 1：
分配的是19-20赛季
'''


def elo_init(team, flag):
    if flag == 0:
        try:
            return elos1[team]
        except:
            temp = original["TEAM"] == team
            elos1[team] = original.loc[temp, ["PER"]].values[0][0]
            return elos1[team]
    elif flag == 1:
        try:
            return elos2[team]
        except:
            temp = original["TEAM"] == team
            elos2[team] = original.loc[temp, ["PER"]].values[0][0]
            return elos2[team]


'''
计算每个球队的elo值
'''


def elo_cal(wteam, lteam):
    wscore = elo_init(wteam, 0)
    lscore = elo_init(lteam, 0)
    in_score = wscore - lscore
    exp = (in_score * -1) / 400
    odds = 1 / (1 + math.pow(10, exp))

    if wscore < 2100:
        k = 32
    elif wscore >= 2100 and wscore < 2400:
        k = 24
    else:
        k = 16

    # 更新 rank 数值
    new_wscore = round(wscore + (k * (1 - odds)))
    new_lscore = round(lscore + (k * (0 - odds)))
    return new_wscore, new_lscore


'''
进行新赛季的预测
'''


def result_predition(team_1, team_2, model, flag):
    tips = []

    # team 1，客场队伍
    tips.append(elo_init(team_1, flag))
    for key, value in gp_state.loc[team_1].iteritems():
        tips.append(value)

    # team 2，主场队伍
    tips.append(elo_init(team_2, flag) + 120)
    for key, value in gp_state.loc[team_2].iteritems():
        tips.append(value)

    tips = np.nan_to_num(tips)
    tips = np.array(tips).reshape((1, -1))
    tips = xgb.DMatrix(tips)
    print(tips)
    return model.predict(tips)


if __name__ == '__main__':
    O = pd.read_csv(r'D:\Desktop\DongQiuDi\data\19-20O.csv')
    for i in range(len(O)):
        if O['Team'][i][-1] == '*':
            O['Team'][i] = O['Team'][i][:-1]
    T = pd.read_csv(r'D:\Desktop\DongQiuDi\data\19-20T.csv')
    for i in range(len(T)):
        if T['Team'][i][-1] == '*':
            T['Team'][i] = T['Team'][i][:-1]
    M = pd.read_csv(r'D:\Desktop\DongQiuDi\data\19-20MiscellaneousStats.csv')
    for i in range(len(M)):
        if M['Team'][i][-1] == '*':
            M['Team'][i] = M['Team'][i][:-1]
    gp_state = team_initialize(O, T, M)
    result_data = pd.read_excel(r'D:\Desktop\DongQiuDi\data\19-20Result.xlsx', engine='openpyxl')
    print(result_data)
    X, y = setData(result_data)
    # 训练网络模型
    print("Fitting on %d game samples.." % len(X))
    params = {
        'booster': 'gbtree',
        'objective': 'binary:logistic',
        'eval_metric': 'auc',
        'gamma': 0.1,
        'max_depth': 8,
        'alpha': 0,
        'lambda': 0,
        'subsample': 0.7,
        'colsample_bytree': 0.5,
        'min_child_weight': 3,
        'eta': 0.03,
        'nthread': -1,
        'seed': 2021,
    }
    print("X", X)
    print("Y", y)
    train_x, test_x, train_y, test_y = train_test_split(X, y, random_state=2021, test_size=0.25)
    print(train_x, test_x, train_y, test_y)
    dtrain = xgb.DMatrix(train_x, label=train_y)
    dtest = xgb.DMatrix(test_x)
    watchlist = [(dtrain, 'train')]
    model = xgb.train(params, dtrain, num_boost_round=60, evals=watchlist)
    # 输出概率
    ypred = model.predict(dtest)
    # 设置阈值, 输出一些评价指标，选择概率大于0.5的为1，其他为0类
    y_pred = (ypred >= 0.5) * 1
    from sklearn import metrics

    print('AUC: %.4f' % metrics.roc_auc_score(test_y, ypred))
    print('ACC: %.4f' % metrics.accuracy_score(test_y, y_pred))
    print('Recall: %.4f' % metrics.recall_score(test_y, y_pred))
    print('F1-score: %.4f' % metrics.f1_score(test_y, y_pred))
    print('Precesion: %.4f' % metrics.precision_score(test_y, y_pred))
    print(metrics.confusion_matrix(test_y, y_pred))

    # model = linear_model.LogisticRegression(solver='liblinear', max_iter=100)
    # model.fit(X, y)
    #
    # # 利用10折交叉验证计算训练正确率
    # print("Doing cross-validation..")
    # print(cross_val_score(model, X, y, cv=10, scoring='accuracy', n_jobs=-1).mean())
    # model = Sequential([
    #     Dense(32, input_dim=len(X[0])),
    #     Dropout(0.5),
    #     Activation('relu'),
    #     Dense(32),
    #     Dropout(0.5),
    #     Activation('softmax'),
    # ])
    # # optimizer：优化器，这里是用Adam优化模型，loss：计算损失，这里用的是二分类的交叉熵
    # model.compile(loss='binary_crossentropy', optimizer='adam')
    #
    # # 开始训练，每次选取100个样本进行训练
    # model.fit(X, y, epochs=1000, batch_size=100)
    # rst = model.predict_classes(X)
    # # 模型评估
    # counter = 0
    # for i in range(0, len(X)):
    #     if rst[i] == y[i]:
    #         counter += 1
    # z = counter / len(X)
    # print(z)
    # score = model.evaluate(X, y, batch_size=100)
    # print(score)
    # 利用训练好的model进行预测
    print('Predicting on new schedule..')
    schedule1920 = pd.read_csv(r'D:\Desktop\DongQiuDi\data\20-21Schedule.csv')
    result = []
    for index, row in schedule1920.iterrows():
        team1 = row['Vteam']
        team2 = row['Hteam']
        pred = result_predition(team1, team2, model, 1)
        print(pred)
        prob = pred[0]
        if prob > 0.5:
            winner = team1
            loser = team2
            result.append([winner, loser, prob])
        else:
            winner = team2
            loser = team1
            result.append([winner, loser, 1 - prob])

    with open(r'D:\Desktop\DongQiuDi\data\20-21Result.csv', 'w') as f:
        writer = csv.writer(f)
        writer.writerow(['win', 'lose', 'probability'])
        writer.writerows(result)
        print('done.')

    # pd.read_csv(r'D:\Desktop\DongQiuDi\data\20-21Result.csv', header=0)
