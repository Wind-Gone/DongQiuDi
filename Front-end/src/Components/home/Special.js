import { Card, Button } from "antd";
import React from "react";
import { DownCircleTwoTone, EyeOutlined } from "@ant-design/icons";
import {useHistory} from 'react-router-dom'
import "./Special.css";
import jack from "./jack.png";
import james from "./james.png";
import Stephen from "./Stephen.JPG";

const { Meta } = Card;

function Special() {
  const history =useHistory();

  const handleClick= (index) => {
    if(index==1){
        history.push('/game')
    }else {
        window.open('http://localhost:8800')
    }

  }

  return (
    <div id="special">
      <h3>当前模块 (开发中)</h3>
      <div className="card">
        <Card
          onClick={()=>handleClick(1)}
          bordered={false}
          hoverable
          style={{ width: 280 }}
          cover={
            <img alt="example" style={{ width: 280, height: 240 }} src={jack} />
          }
        >
          <Meta
            title={
              <h2>
                <DownCircleTwoTone /> ESports For LPL
              </h2>
            }
            description={
              <Button size="large" type="primary" style={{ borderRadius: 10 ,borderTopRightRadius:70,borderEndEndRadius:70 }}>
                Go To The LPL Homepage{" "}
              </Button>
            }
          />
        </Card>
        <Card
          onClick={()=>handleClick(2)}
          hoverable
          style={{ width: 280 }}
          cover={
            <img
              alt="example"
              style={{ width: 280, height: 240 }}
              src={Stephen}
            />
          }
        >
          <Meta
            title={
              <h2>
                <DownCircleTwoTone /> Sports For NBA
              </h2>
            }
            description={
              <Button size="large" type="primary" style={{borderRadius: 10 ,borderTopRightRadius:70,borderEndEndRadius:70 }}>
                Go To The NBA Homepage{" "}
              </Button>
            }
          />
        </Card>
      </div>
      <div className='card'>
          <Card hoverable style={{ width: 240 }} bordered={false}>
            <Meta title="精确" description="通过逻辑回归、knn聚类、神经网络提供可靠的预测" />
          </Card>
          <Card hoverable style={{ width: 240 }} bordered={false}>
            <Meta title="丰富" description="包含各类电竞及体育赛事，满足用户的各种要求" />
          </Card>
          <Card hoverable style={{ width: 240 }} bordered={false}>
            <Meta title="精美" description="页面整洁，操作方便，给用户良好的观赛体验" />
          </Card>
      </div>
    </div>
  );
}

export default Special;
