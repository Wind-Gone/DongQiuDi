import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PageHeader,
  Button,
  Descriptions,
  Tag,
  breadcrumb,
  notification,
  Row,
  Typography,
} from "antd";
import { EllipsisOutlined, LikeTwoTone, FrownTwoTone } from "@ant-design/icons";
import PlayoffTimeline  from '../Timeline/PlayoffTimeline';
import { useSelector } from "react-redux";
import "./index.css";
import Head from "../Head/Head";
import HeaderMenu from '../HeaderMenu/HeaderMenu'
import FixedItem from '../FixedItem/FixedItem'


const { Paragraph } = Typography;

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "感谢支持",
    description: "我们提供精确的预测！",
  });
};

const openNotificationWithIconError = (type) => {
  notification[type]({
    message: "谢谢您的意见",
    description: "我们会对该比赛结果预测重新评估！",
  });
};


function Playoff(props) {
  let { winner, loser } = useParams();
  const text = useSelector((state) => state.playoff.text);
  const { round, time, winnerText, loserText, place } = text;

  const url = "/images/teamPic/"+winner+'队'+'.jpg';

  const routes = [
    {
      breadcrumbName: "懂球帝",
    },
    {
      breadcrumbName: "NBA",
    },
    {
      path: "",
      breadcrumbName: "季后赛 AND 总决赛",
    },
    {
      breadcrumbName: "第" + round + "轮",
    },
  ];

  const Content = ({ children, extraContent }) => (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );

  const content = (
    <>
      <br />
      <Paragraph>
        比赛双方详细介绍如下：
      </Paragraph>
  
      <Paragraph>
        {winner + "："}
        <a>{winnerText}</a>
      </Paragraph>
      <Paragraph>
        {loser + "："}
        <a>{loserText}</a>
      </Paragraph>
    </>
  );

  return (
    <>
    <Head />
    <HeaderMenu />
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
      className='page-header'
        ghost={false}
        onBack={() => window.history.back()}
        title="季后赛 AND 总决赛"
        subTitle={"第" + round + "轮"}
        extra={[
          <Button
            key="3"
            icon={<LikeTwoTone />}
            onClick={() => openNotificationWithIcon("success")}
          >
            agree
          </Button>,
          <Button
            key="2"
            icon={<FrownTwoTone />}
            onClick={() => openNotificationWithIconError("error")}
          >
            disagree
          </Button>,
        ]}
        breadcrumb={{ routes }}
        tags={<Tag color="blue">预测</Tag>}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="比赛时间">
            <a>{time}</a>
          </Descriptions.Item>
          <Descriptions.Item label="比赛轮次">
            <a>{round}</a>
          </Descriptions.Item>
          <Descriptions.Item label="比赛场馆">
            <a>{place}</a>
          </Descriptions.Item>
          <Descriptions.Item label="winnner">
            <a>{winner}</a>
          </Descriptions.Item>
          <Descriptions.Item label="loser">
            <a>{loser}</a>
          </Descriptions.Item>
          <Descriptions.Item label="预测方式">
            <a>逻辑回归</a>
          </Descriptions.Item>
        </Descriptions>
        <Content
          extraContent={
            <img
              src={url}
              alt="content"
              width="250"
            />
          }
        >
          {content}
        </Content>
      </PageHeader>
      <PlayoffTimeline />
    </div>
    <FixedItem />
    </>
  );
}

export default Playoff;
