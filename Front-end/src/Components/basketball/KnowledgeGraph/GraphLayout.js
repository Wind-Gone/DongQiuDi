import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Switch,
  Divider,
  message,
  Image,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Head from "../Head/Head";
import tsIcon from "../../../logo.png";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MailOutlined,
} from "@ant-design/icons";
import TweenOne from "rc-tween-one";
import "./index.css";
import PathPlugin from "rc-tween-one/lib/plugin/PathPlugin";
import GraphContent from "./GraphContent";
TweenOne.plugins.push(PathPlugin);
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const GraphLayout = () => {
  const [theme, setTheme] = React.useState("light");

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };

  return (
    <Layout>
      <Head></Head>
      <Layout>
        <Sider width={250} className="site-layout-background">
          <Switch onChange={changeTheme} style={{ margin: 30 }} /> 切换风格
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1", "sub2", "sub3"]}
            style={{ height: "100%", borderRight: 0 }}
            theme={theme}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="知识图谱">
              <Menu.Item key="1">
                <a href="http://localhost:3000/#/basketball/knowledgegraph/g1">
                  球员关系分布图
                </a>
              </Menu.Item>
              <Menu.Item key="2">
                <a href="http://localhost:3000/#/basketball/knowledgegraph/g2">
                  球员个人信息
                </a>
              </Menu.Item>
              <Menu.Item key="3">
                <a href="http://localhost:3000/#/basketball/knowledgegraph/g3">
                  球员问答系统
                </a>
              </Menu.Item>
              <Menu.Item key="4">邀请好友</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="季后赛板块">
              <Menu.Item key="5">
                <a href="http://localhost:3000/#/basketball">季后赛首页</a>
              </Menu.Item>
              <Menu.Item key="6">博客</Menu.Item>
              <Menu.Item key="7">体育竞猜</Menu.Item>
              <Menu.Item key="8">消费记录</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="首页">
              <Menu.Item key="9">
                {" "}
                <a href="http://localhost:3000">网站首页</a>
              </Menu.Item>
              <Menu.Item key="10">开始预测</Menu.Item>
              <Menu.Item key="11">彩蛋板块</Menu.Item>
              <Menu.Item key="12">操作记录</Menu.Item>
            </SubMenu>
            <Image width={250} src={tsIcon} />
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <HomeOutlined />
              <span>控制台</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <UserOutlined />
              <span>可视化</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 580,
            }}
          >
            <GraphContent></GraphContent>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GraphLayout;
