import React from "react";
import {Card,Button} from 'antd';
import team1 from '../logo.png';

const {Meta} =Card


function SubHome() {
  return (
    <div style={{width:'80%',margin:'0 auto'}}>
      <div style={{ display: "flex", justifyContent: "space-around",textAlign:'center' }}>
        <Card
          hoverable
          
          style={{ width: 240 ,borderRadius:20}}
          cover={
            <img alt="example" style={{ borderRadius: "50%" }} src={team1} />
          }
        >
          <Meta
            title={"常规赛"}
            description={
              <Button type="primary" style={{ borderRadius: 20 }} size="large">
                {" "}
                Go To See Details !{" "}
              </Button>
            }
          />
        </Card>
        <Card
          hoverable
          bordered={false}
          style={{ width: 240 }}
          cover={
            <img alt="example" style={{ borderRadius: "50%" }} src={team1} />
          }
        >
          <Meta
            title='季后赛'
            description={
              <Button type="primary" style={{ borderRadius: 20 }} size="large">
                {" "}
                Go To See Details !{" "}
              </Button>
            }
          />
        </Card>
      </div>
    </div>
  );
}

export default SubHome;
