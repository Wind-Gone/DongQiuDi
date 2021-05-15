import React, { useEffect, useState } from "react";
import { Input, Space, notification, Button } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import * as echarts from "echarts";
const { Search } = Input;
const onSearch = (value) => console.log(value);
export default function GraphContent3() {
  const [inputText, setinputText] = useState("");
  const [graphData, setgraphData] = useState("[]");
  const handleinputText = (e) => {
    setinputText(e.target.value);
  };
  const onSearch = () => {
    console.log("this", inputText);
    if (inputText !== "") getGraphJson();
  };
  const getGraphJson = () => {
    const url = "http://127.0.0.1:5000/kgforquery";
    fetch(url, {
      headers: {
        Accept: "application/json",
      },
      method: "post",
      body: JSON.stringify(inputText),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(inputText));
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
        top: "bottom",
        left: "right",
      },
      animationDurationUpdate: 100,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          type: "graph",
          layout: "force",
          symbolSize: 60,
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 4],
          categories: graphData.categories,
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
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
            repulsion: 2000,
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
          placeholder="问答系统(如:勒布朗-詹姆斯的队友是谁？)"
          allowClear
          enterButton="Search"
          size="large"
          onChange={handleinputText}
          onSearch={onSearch}
        />
      </div>
    </div>
  );
}
