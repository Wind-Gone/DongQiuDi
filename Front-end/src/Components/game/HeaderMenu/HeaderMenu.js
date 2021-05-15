import { Menu } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Item } = Menu;

function HeaderMenu() {
  const history = useHistory();
  return (
    <div>
      <Menu theme="dark" mode="horizontal">
        <Item
          onClick={() => history.push("/game")}
          style={{ marginLeft: "10%", fontSize: 20 }}
        >
          首页
        </Item>
        <Item
          onClick={() => history.push("/game/matchList")}
          style={{ marginLeft: 10, fontSize: 20 }}
        >
          赛事
        </Item>
        <Item style={{ marginLeft: 10, fontSize: 20 }}>名人堂</Item>
        <Item style={{ float: "right", right: "10%" }}>LPL</Item>
        <Item style={{ float: "right", right: "10%" }}>LDL</Item>
        <Item style={{ float: "right", right: "10%" }}>德玛西亚杯</Item>
        <Item icon={<LinkOutlined />} style={{ float: "right", right: "10%" }}>
          外部链接
        </Item>
      </Menu>
    </div>
  );
}

export default HeaderMenu;
