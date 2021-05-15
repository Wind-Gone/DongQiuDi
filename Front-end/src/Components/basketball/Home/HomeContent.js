import React from "react";
import {
  Menu,
  Dropdown,
  Button,
  Typography,
  Row,
  Tag,
  PageHeader,
  notification,
} from "antd";
import { EllipsisOutlined, LikeTwoTone, FrownTwoTone } from "@ant-design/icons";
import ReactionButton from "./ReactionButton";
import "./HomeContent.css";
import NBA from './NBA.jpg';

const { Paragraph } = Typography;


const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://china.nba.com/?gr=www"
      >
        NBA中国官网
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://sports.qq.com/nba/"
      >
        NBA腾讯体育
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://sports.sohu.com/s/nba/"
      >
        NBA搜狐体育
      </a>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu}>
    <Button
      style={{
        border: "none",
        padding: 0,
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: "top",
        }}
      />
    </Button>
  </Dropdown>
);

const routes = [
  {  
    breadcrumbName: "懂球帝",
  },
  {
    breadcrumbName: "NBA",
  },
  {
    breadcrumbName: "季后赛 AND 总决赛",
  },
];

const IconLink = ({ src, text }) => (
  <a className="example-link">
    <img className="example-link-icon" src={src} alt={text} />
    {text}
  </a>
);

const content = (
  <>
    <Paragraph>
      NBA季后赛指的是在每年4月中旬NBA常规赛结束后，NBA联盟根据各队82场常规赛战绩，按照NBA联盟排名规则分别排出东部和西部前八名之间进行的，最终获胜者获得NBA总冠军的比赛。
    </Paragraph>
    <Paragraph>
     在这里，我们通过精确的机器学习算法，为您提供更为准确的季后赛和总决赛预测（预测准确率达到90%），您可以在这里对未来的比赛走势有一个更明确的观感
    </Paragraph>
    <div>
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
        text="高精确度"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
        text="详细的比赛信息"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
        text="详细的球员战队信息"
      />
    </div>
  </>
);

const Content = ({ children, extraContent }) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div className="image">{extraContent}</div>
  </Row>
);

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "感谢支持",
    description: "我们会继续努力，谢谢您的支持！",
  });
};

const openNotificationWithIconError = (type) => {
  notification[type]({
    message: "谢谢您的意见",
    description: "我们会不断改进，谢谢您的意见！",
  });
};

const HomeContent = () => {
  return (
    <div id="components-page-header-demo-content">
      <PageHeader
        title="季后赛 And 总决赛"
        className="site-page-header"
        subTitle="预测"
        tags={<Tag color="blue">一个月后开始</Tag>}
        extra={[
          <Button
            key="3"
            icon={<LikeTwoTone />}
            onClick={() => openNotificationWithIcon("success")}
          >
            点赞
          </Button>,
          <Button
            key="2"
            icon={<FrownTwoTone />}
            onClick={() => openNotificationWithIconError("error")}
          >
            拉踩
          </Button>,
          <ReactionButton />,
          <DropdownMenu key="more" />,
        ]}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
        breadcrumb={{ routes }}
      >
        <Content
          extraContent={
            <img
              src={NBA}
              alt="content"
              width={150}
              height={100}
            />
          }
        >
          {content}
        </Content>
      </PageHeader>
    </div>
  );
};

export default HomeContent;
