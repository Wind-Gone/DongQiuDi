import {
  GET_TEXT,
  GET_PLAYER,
  GET_TEAM,
  GET_LPLGAME,
  GET_LPLPLAYER,
  GET_TOP3GAME,
  GET_TOP3PLAYER,
  GET_HISTORY,
  GET_GRAPH,
} from "./type";

export const getText = (winner, loser) => (dispatch) => {
  console.log("gettext");
  const url = "http://localhost:8800/playoff/getText/" + winner + "/" + loser;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_TEXT,
        payload: data,
      });
    });
};

export const getPlayer = (winner, loser) => (dispatch) => {
  console.log("getplayer");
  const url = "http://localhost:8800/playoff/getPlayer/" + winner + "/" + loser;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_PLAYER,
        payload: data,
      });
    });
};

export const getTeam = (winner, loser) => (dispatch) => {
  console.log("getTeam");
  const url = "http://localhost:8800/playoff/getTeam/" + winner + "/" + loser;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_TEAM,
        payload: data,
      });
    });
};

export const getLplGame = (year, season) => (dispatch) => {
  const url = "http://localhost:8800/game/getGame/" + year + "/" + season;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_LPLGAME,
        payload: data,
      });
    });
};

export const getLplPlayer = (year, season) => (dispatch) => {
  const url = "http://localhost:8800/game/getPlayer/" + year + "/" + season;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_LPLPLAYER,
        payload: data,
      });
    });
};

export const getTop3Game = (year, season) => (dispatch) => {
  const url = "http://localhost:8800/game/getTop3Game/" + year + "/" + season;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_TOP3GAME,
        payload: data,
      });
    });
};

export const getTop3Player = (year, season) => (dispatch) => {
  const url = "http://localhost:8800/game/getTop3Player/" + year + "/" + season;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_TOP3PLAYER,
        payload: data,
      });
    });
};

export const getRookiePlayer = () => (dispatch) => {
  const url = "http://localhost:8800/ball/getRookiePlayer/";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      dispatch({
        type: GET_HISTORY,
        payload: data,
      });
    });
};

export const getGraphJson = (roleName) => (dispatch) => {
  const url = "http://127.0.0.1:5000/search_name";
  fetch(url, {
    headers: {
      Accept: "application/json",
    },
    method: "post",
    body: JSON.stringify(roleName),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(JSON.stringify(roleName))
      console.log("data", data);
      dispatch({
        type: GET_GRAPH,
        payload: data,
      });
    });
};
