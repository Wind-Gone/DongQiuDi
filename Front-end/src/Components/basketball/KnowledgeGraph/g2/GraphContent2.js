import React, { useEffect, useState } from "react";
import { Input, Space, notification, Button } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import * as echarts from "echarts";
const { Search } = Input;
const onSearch = (value) => console.log(value);
export default function GraphContent2() {
  const [roleName, setroleName] = useState("");
  const [graphData, setgraphData] = useState("[]");
  const handleroleName = (e) => {
    setroleName(e.target.value);
  };
  const onSearch = () => {
    console.log("this", roleName);
    if (roleName !== "") getGraphJson();
  };
  const getGraphJson = () => {
    const url = "http://127.0.0.1:5000/kgforsolo";
    fetch(url, {
      headers: {
        Accept: "application/json",
      },
      method: "post",
      body: JSON.stringify(roleName),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(roleName));
        console.log("data", data);
        setgraphData(data);
        console.log("huhu", graphData);
      });
  };
  useEffect(() => {
    if (graphData != "[]") {
      console.log("czheffect", graphData);
      drawGraph();
    }
  }, [graphData]);
  var option;
  var myChart;
  const drawGraph = () => {
    console.log("that", graphData);
    myChart = echarts.init(document.getElementById("left"));
    myChart.showLoading();
    myChart.hideLoading();
    option = {
      title: {
        text: "球员个人简介",
        subtext: "Default layout",
        top: "bottom",
        left: "right",
      },
      animationDurationUpdate: 100,
      animationEasingUpdate: "quinticInOut",
      legend: [{
        data: graphData.categories.map(function (a) {
            return a.name;
        })
    }],
      series: [
        {
          type: "graph",
          layout: "force",
          symbolSize: 50,
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 4],
          categories: graphData.categories,
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 10,
              },
              formatter: "{c}",
            },
          },
          force: {
            repulsion: 100,
            edgeLength: [20, 200],
          },
          focusNodeAdjacency: true,
          draggable: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 10,
              },
            },
          },
          force: {
            repulsion: 1000,
          },
          tooltip: {
            formatter: function (node) {
              // 区分连线和节点，节点上额外显示其他数字
              if (!node.value) {
                return node.data.name;
              } else {
                return node.data.name + ":" + node.data.showNum;
              }
            },
          },
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 1,
              curveness: 0.3,
            },
          },
          nodes: [],
          links: [],
        },
      ],
    };
    if (option != "" && graphData != "[]") {
      console.log("1", option);
      console.log("2", graphData);
      option.series[0].nodes = graphData.data.map(function (node, idx) {
        node.id = idx;
        return node;
      });
      option.series[0].links = graphData.links;
      myChart.setOption(option, true);
    }
  };
  return (
    <div id="wholecontent">
      <div id="left"></div>
      <div id="right">
        <Search
          placeholder="请输入您感兴趣的球员姓名，如勒布朗-詹姆斯"
          allowClear
          enterButton="Search"
          size="large"
          onChange={handleroleName}
          onSearch={onSearch}
        />
      </div>
    </div>
  );
}
