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
a = 1600  # ��߽�
b = 2000  # �ұ߽�

'''
��ÿ֧����û��elo�ȼ���ʱ�����������elo�ȼ���
'''
# elo_init = 1800
elos1 = {}
elos2 = {}
gp_state = {}

'''
������Աս�������г�ʼelo�ȼ��ķ���,���eloֵ���ֵ�ָ������
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
��Opponent��Team, Miscellaneous�����ݽ���ÿ֧�������ݵĳ�ʼ��
'''


def team_initialize(O, T, M):
    new_M = M.drop(['Rk', 'Arena'], axis=1)
    new_O = O.drop(['Rk', 'G', 'MP'], axis=1)
    new_T = T.drop(['Rk', 'G', 'MP'], axis=1)
    state1 = pd.merge(new_T, new_O, how='left', on='Team')
    # state1 = pd.merge(state1, new_T, how='left', on='Team')
    return state1.set_index('Team', inplace=False, drop=True)


'''
�������ݣ�����������������ݼ�
'''


def setData(data):
    print("�������ݼ�..")
    X = []
    skip = 0
    for index, row in data.iterrows():

        Wteam = row['Wteam']
        Lteam = row['Lteam']

        team1_elo = elo_init(Wteam, 0)
        team2_elo = elo_init(Lteam, 0)

        # �����������Ķ������120��eloֵ
        if row['WLOC'] == 'H':
            team1_elo += 120
        else:
            team2_elo += 120

        # ��elo��Ϊ����ÿ������ĵ�һ������ֵ
        tip1 = [team1_elo]
        tip2 = [team2_elo]

        # ������Ǵ�basketball reference.com��õ�ÿ�������ͳ����Ϣ
        for key, value in gp_state.loc[Wteam].iteritems():
            tip1.append(value)
        for key, value in gp_state.loc[Lteam].iteritems():
            tip2.append(value)

        # ����֧���������ֵ����ķ�����ÿ���������ݵ���������
        # ������Ӧ��0/1����yֵ
        if random.random() > 0.5:
            X.append(tip1 + tip2)
            y.append(0)
        else:
            X.append(tip2 + tip1)
            y.append(1)

        if skip == 0:
            print('X', X)
            skip = 1

        # �����ⳡ���������ݸ��¶����eloֵ
        new_wscore, new_lscore = elo_cal(Wteam, Lteam)
        elos1[Wteam] = new_wscore
        elos1[Lteam] = new_lscore

    return np.nan_to_num(X), y


'''
eloֵ�ķ���
if 
flag == 0��
�������18-19����
flag == 1��
�������19-20����
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
����ÿ����ӵ�eloֵ
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

    # ���� rank ��ֵ
    new_wscore = round(wscore + (k * (1 - odds)))
    new_lscore = round(lscore + (k * (0 - odds)))
    return new_wscore, new_lscore


'''
������������Ԥ��
'''


def result_predition(team_1, team_2, model, flag):
    tips = []

    # team 1���ͳ�����
    tips.append(elo_init(team_1, flag))
    for key, value in gp_state.loc[team_1].iteritems():
        tips.append(value)

    # team 2����������
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
    # ѵ������ģ��
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
    # �������
    ypred = model.predict(dtest)
    # ������ֵ, ���һЩ����ָ�꣬ѡ����ʴ���0.5��Ϊ1������Ϊ0��
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
    # # ����10�۽�����֤����ѵ����ȷ��
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
    # # optimizer���Ż�������������Adam�Ż�ģ�ͣ�loss��������ʧ�������õ��Ƕ�����Ľ�����
    # model.compile(loss='binary_crossentropy', optimizer='adam')
    #
    # # ��ʼѵ����ÿ��ѡȡ100����������ѵ��
    # model.fit(X, y, epochs=1000, batch_size=100)
    # rst = model.predict_classes(X)
    # # ģ������
    # counter = 0
    # for i in range(0, len(X)):
    #     if rst[i] == y[i]:
    #         counter += 1
    # z = counter / len(X)
    # print(z)
    # score = model.evaluate(X, y, batch_size=100)
    # print(score)
    # ����ѵ���õ�model����Ԥ��
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
