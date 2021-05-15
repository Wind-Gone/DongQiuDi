import React from "react";
import { Radar } from "@ant-design/charts";
import { DataSet } from "@antv/data-set";

const PlayerRadar = () => {
  const data = [
    { item: "投篮", '哈登': 70, '詹姆斯': 30 },
    { item: "三分", '哈登': 60, '詹姆斯': 70 },
    { item: "罚球", '哈登': 50, '詹姆斯': 60 },
    { item: "篮板", '哈登': 40, '詹姆斯': 50 },
    { item: "助攻", '哈登': 60, '詹姆斯': 70 },
    { item: "抢断", '哈登': 70, '詹姆斯': 50 },
    { item: "盖帽", '哈登': 50, '詹姆斯': 40 },
    { item: "得分", '哈登': 30, '詹姆斯': 40 },
  ];
  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['哈登', '詹姆斯'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });
  const config = {
    data: dv.rows,
    xField: 'item',
    yField: 'score',
    seriesField: 'user',
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 80,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
      },
    },
    // 开启面积
    area: {},
    // 开启辅助点
    point: {},
  };

  return <Radar {...config} />;
};

export default PlayerRadar;
