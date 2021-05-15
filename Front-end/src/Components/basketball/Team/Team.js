import { useSelector } from "react-redux";
import Head from "../Head/Head";
import HeaderMenu from '../HeaderMenu/HeaderMenu'
import FixedItem from '../FixedItem/FixedItem'
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
import PlayoffTimeline  from '../Timeline/PlayoffTimeline'
import './index.css'
const { Paragraph } = Typography;

const Team = () => {
  const team = useSelector((state) => state.playoff.team);
  const round = useSelector(state => state.playoff.text.round)
  const url = "/images/teamPic/" + team[0].team + "队" + ".jpg";
  const url2 = "/images/teamPic/" + team[1].team + "队" + ".jpg";

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
      breadcrumbName: '第'+round+'场',
    },
    {
      breadcrumbName: team[0].team+' vs '+team[1].team,
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
      <Paragraph>球队详细介绍如下：</Paragraph>
      <Paragraph>
        {team[0].team + "："}
        <a>{team[0].content}</a>
      </Paragraph>
    </>
  );

  const content2 = (
    <>
      <br />
      <Paragraph>球队详细介绍如下：</Paragraph>
      <Paragraph>
        {team[1].team + "："}
        <a>{team[1].content}</a>
      </Paragraph>
    </>
  );

  return (
    <>
    <Head />
    <HeaderMenu />
    <div className='team'>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="page-header"
          ghost={false}
          onBack={() => window.history.back()}
          title={team[0].team}
          subTitle={"简介"}
          breadcrumb={{ routes }}
          tags={<Tag color="blue">胜</Tag>}
        >
          <Descriptions size="small" column={2}>
            <Descriptions.Item label="球队全称">
              <a>{team[0].team}</a>
            </Descriptions.Item>
            <Descriptions.Item label="建队时间">
              <a>{team[0].createTime}</a>
            </Descriptions.Item>
            <Descriptions.Item label="所在城市">
              <a>{team[0].city}</a>
            </Descriptions.Item>
            <Descriptions.Item label="代表球星">
              <a>{team[0].star}</a>
            </Descriptions.Item>
          </Descriptions>
          <Content extraContent={<img src={url} alt="content" width="250" />}>
            {content}
          </Content>
        </PageHeader>
      </div>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="page-header"
          ghost={false}
          onBack={() => window.history.back()}
          title={team[1].team}
          subTitle={"简介"}
          breadcrumb={{ routes }}
          tags={<Tag color="blue">输</Tag>}
        >
          <Descriptions size="small" column={2}>
            <Descriptions.Item label="球队全称">
              <a>{team[1].team}</a>
            </Descriptions.Item>
            <Descriptions.Item label="建队时间">
              <a>{team[1].createTime}</a>
            </Descriptions.Item>
            <Descriptions.Item label="所在城市">
              <a>{team[1].city}</a>
            </Descriptions.Item>
            <Descriptions.Item label="代表球星">
              <a>{team[1].star}</a>
            </Descriptions.Item>
          </Descriptions>
          <Content extraContent={<img src={url2} alt="content" width="250" />}>
            {content2}
          </Content>
        </PageHeader>
        <PlayoffTimeline />
      </div>
    </div>
    <FixedItem />
    </>
  );
};

export default Team;
