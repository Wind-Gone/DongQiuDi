import {
  GET_TEAM,
  GET_PLAYER,
  GET_TEXT,
  GET_LPLGAME,
  GET_LPLPLAYER,
  GET_TOP3GAME,
  GET_TOP3PLAYER,
  GET_HISTORY,
  GET_GRAPH
} from "../actions/type";

const initialState = {
  team: [],
  player: [],
  text: [],
  lplGame: [],
  lplPlayer: [],
  top3Player: [],
  top3Game: [],
  historyPlayer: [],
  graphdata: []
};

export default function playoffReducers(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM:
      return {
        ...state,
        team: action.payload,
      };
    case GET_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case GET_PLAYER:
      return {
        ...state,
        player: action.payload,
      };
    case GET_LPLPLAYER:
      return {
        ...state,
        lplPlayer: action.payload,
      };
    case GET_LPLGAME:
      return {
        ...state,
        lplGame: action.payload,
      };
    case GET_TOP3GAME:
      return {
        ...state,
        top3Game: action.payload,
      };
    case GET_TOP3PLAYER:
      return {
        ...state,
        top3Player: action.payload,
      };
    case GET_HISTORY:
      return {
        ...state,
        historyPlayer: action.payload,
      };
      case GET_GRAPH:
        return {
          ...state,
          graphdata: action.payload,
        };
    default:
      return state;
  }
}
