import React, { useState, useEffect } from "react";
import { Menu, Tooltip } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css";
import {
  SmileTwoTone,
  TrophyTwoTone,
  CrownTwoTone,
  ReconciliationTwoTone,
  ScheduleTwoTone,
} from "@ant-design/icons";
import { useDispatch} from "react-redux";
import { getPlayer, getTeam, getText } from "../../../actions/playoffAction";

const { SubMenu } = Menu;

function HeaderMenu(props) {
  const [MenuDisabled, setMenuDisabled] = useState(true);
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  let location = useLocation();
  const dispatch = useDispatch();

  const changeRound = (winner, loser) => {
    if (MenuDisabled === true) {
      setMenuDisabled(false);
    }
    setWinner(winner);
    setLoser(loser);
    dispatch(getPlayer(winner, loser));
    dispatch(getTeam(winner, loser));
    dispatch(getText(winner, loser));
  };

  useEffect(() => {
    if (location.pathname !== "/basketball") {
      setMenuDisabled(false);
      let str = location.pathname.split("/");
      const winner=str[3];
      const loser=str[4];
      setWinner(winner);
      setLoser(loser);
    } else {
      setMenuDisabled(true);
    }
  }, [location]);

  const tooltip = winner + "/" + loser;
  return (
    <div>
      <Menu mode="horizontal" theme="dark" className="playoff-menu">
        <SubMenu key="round1" title="第一轮" icon={<SmileTwoTone />}>
          <Menu.ItemGroup title="西部">
            <Menu.Item
              key="round1:1"
              onClick={() => changeRound("开拓者", "雷霆")}
            >
              <Link to={"/basketball/playoff/开拓者/雷霆"}>西部第1 vs 西部第8</Link>{" "}
            </Menu.Item>
            <Menu.Item
              key="round1:2"
              onClick={() => changeRound("爵士", "掘金")}
            >
              {" "}
              <Link to={"/basketball/playoff/爵士/掘金"}> 西部第2 vs 西部第7</Link>
            </Menu.Item>
            <Menu.Item
              key="round1:3"
              onClick={() => changeRound("勇士", "快船")}
            >
              {" "}
              <Link to={"/basketball/playoff/勇士/快船"}> 西部第3 vs 西部第6</Link>
            </Menu.Item>
            <Menu.Item
              key="round1:4"
              onClick={() => changeRound("火箭", "马刺")}
            >
              {" "}
              <Link to={"/basketball/playoff/火箭/马刺"}> 西部第4 vs 西部第5</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="东部">
            <Menu.Item
              key="round1:5"
              onClick={() => changeRound("步行者", "76人")}
            >
              {" "}
              <Link to={"/basketball/playoff/步行者/76人"}> 东部第1 vs 东部第8</Link>
            </Menu.Item>
            <Menu.Item
              key="round1:6"
              onClick={() => changeRound("雄鹿", "活塞")}
            >
              {" "}
              <Link to={"/basketball/playoff/雄鹿/活塞"}> 东部第2 vs 东部第7</Link>
            </Menu.Item>
            <Menu.Item
              key="round1:7"
              onClick={() => changeRound("猛龙", "魔术")}
            >
              {" "}
              <Link to={"/basketball/playoff/猛龙/魔术"}> 东部第3 vs 东部第6</Link>
            </Menu.Item>
            <Menu.Item
              key="round1:8"
              onClick={() => changeRound("凯尔特人", "篮网")}
            >
              {" "}
              <Link to={"/basketball/playoff/凯尔特人/篮网"}> 东部第4 vs 东部第5</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="round2" title="第二轮" icon={<TrophyTwoTone />}>
          <Menu.ItemGroup title="西部">
            <Menu.Item
              key="round2:1"
              onClick={() => changeRound("勇士", "爵士")}
            >
              {" "}
              <Link to={"/basketball/playoff/勇士/爵士"}> 西部第1 vs 西部第4</Link>
            </Menu.Item>
            <Menu.Item
              key="round2:2"
              onClick={() => changeRound("开拓者", "火箭")}
            >
              {" "}
              <Link to={"/basketball/playoff/开拓者/火箭"}> 西部第2 vs 西部第3</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="东部">
            <Menu.Item
              key="round2:3"
              onClick={() => changeRound("雄鹿", "凯尔特人")}
            >
              {" "}
              <Link to={"/basketball/playoff/雄鹿/凯尔特人"}> 东部第1 vs 东部第4</Link>
            </Menu.Item>
            <Menu.Item
              key="round2:4"
              onClick={() => changeRound("猛龙", "步行者")}
            >
              {" "}
              <Link to={"/basketball/playoff/猛龙/步行者"}> 东部第2 vs 东部第3</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="round3" title="东决/西决" icon={<CrownTwoTone />}>
          <Menu.Item onClick={() => changeRound("勇士", "开拓者")}>
            <Link to={"/basketball/playoff/勇士/开拓者"}> 西决</Link>
          </Menu.Item>
          <Menu.Item onClick={() => changeRound("雄鹿", "猛龙")}>
            <Link to={"/basketball/playoff/雄鹿/猛龙"}> 东决</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key={"round4"}
          icon={<CrownTwoTone twoToneColor="#eb2f96" />}
        >
          <Link to={"/basketball/playoff/雄鹿/勇士"}> 总决赛</Link>
        </Menu.Item>
        <Menu.Item
          key="Two"
          disabled={MenuDisabled}
          icon={<ReconciliationTwoTone twoToneColor="#52c41a" />}
        >
          <Tooltip title={tooltip}>
            <Link to={`/basketball/team/${winner}/${loser}`}>球队资料</Link>
          </Tooltip>
        </Menu.Item>
        <Menu.Item
          key="Three"
          disabled={MenuDisabled}
          icon={<ScheduleTwoTone twoToneColor="#52c41a" />}
        >
          <Tooltip title={tooltip}>
            <Link to={`/basketball/player/${winner}/${loser}`}>球员简介</Link>
          </Tooltip>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default (HeaderMenu);
