import React from "react";
import { useSelector } from "react-redux";
import { Table, Card ,Tag , Badge} from "antd";
import {CrownTwoTone,FundTwoTone} from '@ant-design/icons'
import rng from './rng.jpg'
import team1 from './team1.jpg'
import team2 from './team2.jpg'
import team3 from './team3.jpg'

const { Meta } = Card;

function GameColumn() {
  const data = useSelector((state) => state.playoff.lplGame);
  const topGame = useSelector((state) => state.playoff.top3Game);

  const columns = [
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
      render: (text) => <Badge count={text}  />,
    },
    {
      title: "年份",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "球队",
      dataIndex: "team",
      key: "team",
      render: team => (<Tag color='green' key={team}>{team}</Tag>)
    },
    {
      title: "季度",
      dataIndex: "season",
      key: "season",
    },

    {
      title: "场数",
      dataIndex: "appearances",
      key: "appearances",
    },
    {
      title: "胜率",
      dataIndex: "winRate",
      key: "winRate",
      render: winRate => (<Tag color='blue' key={winRate}>{winRate}</Tag>)
    },
    {
      title: "总击杀",
      dataIndex: "totalKills",
      key: "totalKills",
    },
    {
      title: "总死亡",
      dataIndex: "totalDeath",
      key: "totalDeath",
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
      title: "场均金钱",
      dataIndex: "averageMoney",
      key: "averageMoney",
    },
    {
      title: "场均小龙",
      dataIndex: "averageSmallDragon",
      key: "averageSmallDragon",
    },
    {
      title: "场均大龙",
      dataIndex: "averageBigDragon",
      key: "averageBigDragon",
    },
  ];

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1 style={{textAlign:'center',fontSize:'50px',color:'#b83b5e' }}><CrownTwoTone twoToneColor='#eb2f96' /> TOP 3</h1>
      <div style={{ display: "flex", justifyContent: "space-around",textAlign:'center',marginBottom:20 }}>
        <div>
          <Card
            hoverable
            bordered={false}
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                style={{borderRadius:'50%'}}
                src={team1}
              />
            }
          >
            <Meta title={"战队："+topGame[0].team} description={"胜率 最高： "+topGame[0].winRate+'%'} />
          </Card>
        </div>
        <div>
          <Card
            hoverable
            bordered={false}
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                style={{borderRadius:'50%'}}
                src={team2}
              />
            }
          >
            <Meta title={"战队："+topGame[1].team} description={"总击杀数 最高： "+topGame[1].totalKills }/>
          </Card>
        </div>
        <div>
          <Card
            hoverable
            bordered={false}
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                style={{borderRadius:'50%'}}
                src={team3}
              />
            }
          >
            <Meta title={"战队："+topGame[2].team} description={"小龙数 最高："+topGame[2].averageSmallDragon} />
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

export default GameColumn;
