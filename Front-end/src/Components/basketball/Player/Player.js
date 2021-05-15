import { useSelector } from "react-redux";
import {useState} from 'react'
import Head from "../Head/Head";
import HeaderMenu from '../HeaderMenu/HeaderMenu'
import FixedItem from '../FixedItem/FixedItem'
import "./Player.css";
import { Card, Avatar, Button, Drawer,Col,Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ScheduleTwoTone,
  FireTwoTone,
  TagTwoTone 
} from "@ant-design/icons";
const { Meta } = Card;

const Player = (props) => {
  const players = useSelector((state) => state.playoff.player);
  const [drawer, setDrawer] = useState({
    player: "",
    age: "",
    content: "",
    position: "",
    salary: "",
    team: "",
  });
  const [visible, setVisible] = useState(false);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );


  const changeDrawer = (index) => {
    setDrawer({
      player: players[index].player,
      age: players[index].age,
      content: players[index].content,
      position: players[index].position,
      salary: players[index].salary,
      team: players[index].team,
    });
  };

  const showDrawer = (index) => {
    changeDrawer(index);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const playerCards = players.slice(0, 6).map((player,index) => {
    const url =
      "/images/playerPic/" + player.team + "队/" + player.player + ".JPG";
    console.log(url);
    return (
      <Card
        className="card"
        hoverable
        style={{ width: 300, marginBottom: 30 }}
        cover={<img style={{ height: 270 }} alt="example" src={url} />}
        actions={[
          <Button type="link" icon={<SettingOutlined key="setting" />} />,
          <Button type="link" icon={<EditOutlined key="edit" />} />,
          <Button type='link' onClick={()=>showDrawer(index)}>more</Button>,
        ]}
      >
        <Meta
          avatar={<FireTwoTone style={{ fontSize: "30px" }} />}
          title={player.player}
          description={player.team}
        />
      </Card>
    );
  });

  const secondPlayerCards = players.slice(6, 12).map((player,index) => {
    const url =
      "/images/playerPic/" + player.team + "队/" + player.player + ".JPG";
    console.log(url);
    return (
      <Card
        className="card"
        hoverable
        style={{ width: 300, marginBottom: 30 }}
        cover={<img style={{ height: 270 }} alt="example" src={url} />}
        actions={[
          <Button type="link" icon={<SettingOutlined key="setting" />} />,
          <Button type="link" icon={<EditOutlined key="edit" />} />,
          <Button type='link' onClick={()=>showDrawer(index+6)}>more</Button>,
        ]}
      >
        <Meta
          avatar={<FireTwoTone style={{ fontSize: "30px" }} />}
          title={player.player}
          description={player.team}
        />
      </Card>
    );
  });



  const playerCard = (
    <Card
      hoverable
      style={{ width: 300, marginBottom: 30 }}
      cover={
        <img
          alt="图片路径错误"
          src="/images/playerPic/76人队/富尔坎-科尔克马兹.JPG"
        />
      }
      actions={[
        <Button type="link" icon={<SettingOutlined key="setting" />} />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<FireTwoTone style={{ fontSize: "30px" }} />}
        title="阿里扎"
        description="开拖着"
      />
    </Card>
  );

  return (
    <>
    <Head />
    <HeaderMenu />
    <div className='player'>
      <h1 className="player-h">
        球员简介{" "}
        <ScheduleTwoTone
          hoverable
          twoToneColor="#52c41a"
          style={{ textAlign: "center", fontSize: "30px" }}
        />
      </h1>

      <h2 className="player-h">
        {players[0].team+" 六巨头 "}
        <TagTwoTone 
          hoverable
          twoToneColor="#eb2f96"
          style={{ textAlign: "center", fontSize: "20px" }}
        />
      </h2>
      <div className="player-container">{playerCards}</div>

      <h2 className="player-h">
        {players[6].team+" 六巨头 "}
        <TagTwoTone 
          hoverable
          twoToneColor="#eb2f96"
          style={{ textAlign: "center", fontSize: "20px" }}
        />
      </h2>
      <div className="player-container">{secondPlayerCards}</div>

      <Drawer
        width={640}
        title="View Profile"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            球员详细信息
          </p>
          <p className="site-description-item-profile-p">{drawer.player}</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Team" content={drawer.team} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Age" content={drawer.age} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Position" content={drawer.position} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Salary" content={drawer.salary} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="个人简介"
                content={drawer.content}
              />
            </Col>
          </Row>
      </Drawer>

    </div>
    <FixedItem />
    </>
  );
};

export default Player;
