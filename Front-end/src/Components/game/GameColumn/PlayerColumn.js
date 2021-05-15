import React from "react";
import { useSelector } from "react-redux";
import { Table, Card ,Tag , Badge} from "antd";
import {CrownTwoTone,FundTwoTone} from '@ant-design/icons'
import gala from "./gala.png";
import ming from './ming.png'
import y4 from './y4.png'

const { Meta } = Card;

function PlayerColumn() {
  const data = useSelector((state) => state.playoff.lplPlayer);
  const top3Player = useSelector((state) => state.playoff.top3Player);
  const columns = [
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
      render: (text) => <Badge count={text}  />,
    },

    {
      title: "姓名",
      dataIndex: "player",
      key: "player",
      render: player => <a>{player}</a>
    },
    {
      title: "年份",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "季度",
      dataIndex: "season",
      key: "season",
    },

    {
      title: "位置",
      dataIndex: "position",
      key: "position",
      render: position => (<Tag color='green' key={position}>{position}</Tag>)

    },
    {
      title: "出场次数",
      dataIndex: "appearances",
      key: "appearances",
    },
    {
      title: "总击杀",
      dataIndex: "totalKill",
      key: "totalKill",
    },
    {
      title: "总助攻",
      dataIndex: "totalAss",
      key: "totalAss",
    },
    {
      title: "总死亡",
      dataIndex: "totalDeath",
      key: "totalDeath",
    },
    {
      title: "KDA",
      dataIndex: "kda",
      key: "kda",
      render: kda => <Tag color='blue'>{kda}</Tag>
    },
    {
      title: "场均金钱",
      dataIndex: "averageMoney",
      key: "averageMoney",
    },
    {
      title: "场均击杀",
      dataIndex: "averageK",
      key: "averageK",
    },
    {
      title: "场均插眼",
      dataIndex: "averageEyes",
      key: "averageEyes",
    },
    {
      title: "场均排眼",
      dataIndex: "averageKillEyes",
      key: "averageKillEyes",
    },
    {
      title: "场均参团率",
      dataIndex: "averageParticipation",
      key: "averageParticipation",
    },
    {
      title: "MVP次数",
      dataIndex: "mvp",
      key: "mvp",
    },
  ];

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1 style={{textAlign:'center',fontSize:'50px',color:'#b83b5e' }}><CrownTwoTone twoToneColor='#eb2f96' /> TOP 3</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <Card
            hoverable
            bordered={false}
            style={{ width: 240 }}
            cover={
              <img alt="example" style={{ borderRadius: "50%" }} src={gala} />
            }
          >
            <Meta title={"选手："+top3Player[0].player} description={"补刀 最高： "+top3Player[0].averageK} />
          </Card>
        </div>
        <div>
          <Card
            hoverable
            bordered={false}
            style={{ width: 240 }}
            cover={<img alt="example"  style={{ borderRadius: "50%" }} src={ming} />}
          >
            <Meta title={"选手："+top3Player[1].player} description={"MVP数 最高："+top3Player[1].mvp} />
          </Card>
        </div>
        <div>
          <Card
            hoverable
            bordered={false}
            style={{ width: 240 }}
            cover={<img alt="example"  style={{ borderRadius: "50%" }} src={y4} />}
          >
            <Meta title={"选手："+top3Player[2].player} description={"KDA 最高："+top3Player[2].kda} />
          </Card>
        </div>
      </div>
      <Table
        title = {() => (<a style={{textAlign:'center'}}><FundTwoTone /> 详细数据</a>)}
        bordered={true}
        pagination={{ position: ["bottomCenter"] , pageSize:6,showQuickJumper:true }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}

export default PlayerColumn;
