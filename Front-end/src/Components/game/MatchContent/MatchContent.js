import React from "react";
import { Card, Button } from "antd";
import { useHistory } from "react-router-dom";
import "./index.css";
import { FormProvider } from "antd/lib/form/context";
import { useDispatch } from "react-redux";
import spring from "./spring.jpg";
import summer from "./summer.jpg";
import {
  getLplGame,
  getLplPlayer,
  getTop3Game,
  getTop3Player,
} from "../../../actions/playoffAction";

const { Meta } = Card;

function MatchContent(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (year, season) => {
    dispatch(getLplGame(year, season));
    dispatch(getLplPlayer(year, season));
    dispatch(getTop3Player(year, season));
    dispatch(getTop3Game(year, season));
    const linkurl = "/game/matchAnalysis/" + year + "/" + season;
    history.push(linkurl);
  };

  const { cardIndex } = props;

  const Card2021 = (
    <div
      className="card"
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Card
        onClick={() => handleClick('2021', 'spring')}
        bordered={false}
        hoverable
        style={{ width: 280 }}
        cover={
          <img
            alt="example"
            style={{ borderRadius: "50%", width: 280, height: 280 }}
            src={spring}
          />
        }
      >
        <Meta
          title={<h2>春季赛</h2>}
          description={
            <Button type="primary" style={{ borderRadius: 20 }} size="large">
              {" "}
              Go To See Details !{" "}
            </Button>
          }
        />
      </Card>
    </div>
  );

  const Card2020 = (year) => (
    <div
      className="card"
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Card
        onClick={() => handleClick(year, "spring")}
        bordered={false}
        hoverable
        style={{ width: 280 }}
        cover={
          <img
            alt="example"
            style={{ borderRadius: "50%", width: 280, height: 280 }}
            src={spring}
          />
        }
      >
        <Meta
          title={<h2>春季赛</h2>}
          description={
            <Button type="primary" style={{ borderRadius: 20 }} size="large">
              {" "}
              Go To See Details !{" "}
            </Button>
          }
        />
      </Card>

      <Card
        onClick={() => handleClick(year, "summer")}
        bordered={false}
        hoverable
        style={{ width: 280 }}
        cover={
          <img
            alt="example"
            style={{ borderRadius: "50%", width: 280, height: 280 }}
            src={summer}
          />
        }
      >
        <Meta
          title={<h2>夏季赛</h2>}
          description={
            <Button type="primary" style={{ borderRadius: 20 }} size="large">
              {" "}
              Go To See Details !{" "}
            </Button>
          }
        />
      </Card>
    </div>
  );

  return (
    <div className='match-content' style={{ width: "80%", margin: "0 auto", marginTop: 20  }}>
      <h1 className="match-h1">国内赛事</h1>
      {cardIndex == 1 ? Card2021 : Card2020(props.year) };
    </div>
  );
}

export default MatchContent;
