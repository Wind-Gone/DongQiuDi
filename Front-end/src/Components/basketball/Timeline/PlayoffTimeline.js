import React from "react";
import { Timeline, Card, Col, Row } from "antd";
import { FireTwoTone } from "@ant-design/icons";
import './index.css'

function PlayoffTimeline() {
  return (
    <div>
      <br />
      <div className={"playoff-timeline"}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
            hoverable
              title="季后赛概览---第一轮"
              extra={
                <FireTwoTone
                  twoToneColor="#ff005c"
                  style={{ fontSize: "25px" }}
                />
              }
            >
              <Timeline mode="left">
                {/*季后赛第一轮*/}
                <Timeline.Item>
                  开拓者 vs 雷霆 季后赛第一轮第一场 2021-04-04{" "}
                </Timeline.Item>
                <Timeline.Item>
                  爵士 vs 掘金 季后赛第一轮第二场 2021-05-08{" "}
                </Timeline.Item>
                <Timeline.Item>
                  勇士 vs 快船 季后赛第一轮第三场 2021-03-12{" "}
                </Timeline.Item>
                <Timeline.Item>
                  火箭 vs 马刺 季后赛第一轮第四场 2021-05-01{" "}
                </Timeline.Item>
                <Timeline.Item color={"green"}>
                  步行者 vs 76人 季后赛第一轮第五场 2021-05-12{" "}
                </Timeline.Item>
                <Timeline.Item color={"green"}>
                  雄鹿 vs 马刺 季后赛第一轮第六场 2021-03-21{" "}
                </Timeline.Item>
                <Timeline.Item color={"green"}>
                  猛龙 vs 魔术 季后赛第一轮第七场 2021-04-17{" "}
                </Timeline.Item>
                <Timeline.Item color={"green"}>
                  凯尔特人 vs 篮网 季后赛第一轮第八场 2021-04-24{" "}
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              title="季后赛概览---第二轮"
              extra={
                <FireTwoTone
                  twoToneColor="#ff005c"
                  style={{ fontSize: "25px" }}
                />
              }
            >
              <Timeline mode={"left"}>
                {/*季后赛第二轮*/}
                <Timeline.Item>
                  勇士 vs 爵士 季后赛第一轮第一场 2021-06-01{" "}
                </Timeline.Item>
                <Timeline.Item>
                  开拓者 vs 火箭 季后赛第一轮第一场 2021-06-02{" "}
                </Timeline.Item>
                <Timeline.Item color={"green"}>
                  雄鹿 vs 凯尔特人 季后赛第一轮第一场 2021-06-03{" "}
                </Timeline.Item>
                <Timeline.Item color={"green"}>
                  猛龙 vs 步行者 季后赛第一轮第一场 2021-06-04{" "}
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
          <Col span={8}>
            <Card
                hoverable
              title="决赛概览"
              extra={
                <FireTwoTone
                  twoToneColor="#ff005c"
                  style={{ fontSize: "25px" }}
                />
              }
            >
              <Timeline mode={"left"}>
                {/*西决东决*/}
                <Timeline.Item>
                  勇士 vs 开拓者 季后赛第一轮第一场 2021-06-05{" "}
                </Timeline.Item>
                <Timeline.Item color={"green"}>
                  雄鹿 vs 猛龙 季后赛第一轮第一场 2021-06-06{" "}
                </Timeline.Item>

                {/*总决*/}
                <Timeline.Item color={"red"}>
                  雄鹿 vs 勇士 季后赛第一轮第一场 2021-06-07{" "}
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PlayoffTimeline;
