import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Select, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Heatmap, G2 } from "@ant-design/charts";
import { getRookiePlayer } from "../../../actions/playoffAction";
import { $ } from "react-jquery-plugin";
import * as d3 from "d3";
import { isCompositeComponent } from "react-dom/test-utils";
const { Option } = Select;

function HzrHeatmap() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRookiePlayer);
  }, []);
  const historyGame = useSelector((state) => state.playoff.historyPlayer);
  const columns = [
    {
      title: "ID",
      dataIndex: "playerID",
      key: "playerID",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "新秀球员姓名",
      dataIndex: "playerName",
      key: "playerName",
    },
    {
      title: "大学担任位置",
      dataIndex: "currentRole",
      key: "currentRole",
    },
    {
      title: "NBA预计担任位置",
      dataIndex: "predicted_role",
      key: "predicted_role",
    },
    {
      title: "标签",
      dataIndex: "labels",
      key: "labels",
    },
  ];

  return (
    <div>
      <Table
        bordered={true}
        pagination={{
          position: ["bottomCenter"],
          pageSize: 6,
          showQuickJumper: true,
        }}
        columns={columns}
        dataSource={historyGame}
      />
    </div>
  );
}
export default HzrHeatmap;
