import { HashRouter, Switch, Route } from "react-router-dom";
import HeaderMenu from "./Components/basketball/HeaderMenu/HeaderMenu";
import BasketballHome from "./Components/basketball/Home/Home";
import GameHome from './Components/game/Home/Home'
import Player from "./Components/basketball/Player/Player";
import Playoff from "./Components/basketball/Playoff/Playoff";
import Team from "./Components/basketball/Team/Team";
import { Provider } from "react-redux";
import store from "./store";
import Home from './Components/home/Home';
import LplMatchList from './Components/game/MatchList/MatchList';
import MatchAnalysis from './Components/game/MatchAnalysis/MatchAnalysis';
import PlayerAnalysis from './Components/game/MatchAnalysis/PlayerAnalysis';
import SubHome from './Components/home/subHome/SubHome'
import HzrHeatmap from './Components/basketball/HeatMap/heatmap';
import KnowledgeGraph from "./Components/basketball/KnowledgeGraph/KnowledgeGraph";
import KGforsolo from "./Components/basketball/KnowledgeGraph/g2/KGforsolo";
import KGforquery from "./Components/basketball/KnowledgeGraph/g3/KGforquery";


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path="/basketball" component={BasketballHome} />
          <Route path="/basketball/player/:winner/:loser" component={Player} />
          <Route path="/basketball/playoff/:winner/:loser" component={Playoff} />
          <Route path="/basketball/team/:winner/:loser" component={Team} />
          <Route path="/basketball/knowledgegraph/g1" component={KnowledgeGraph} />
          <Route path="/basketball/knowledgegraph/g2" component={KGforsolo} />
          <Route path="/basketball/knowledgegraph/g3" component={KGforquery} />
          <Route path="/basketball/heatmap" component={HzrHeatmap} />

          <Route exact path="/game" component={GameHome} />
          <Route path="/game/matchList" component={LplMatchList} />
          <Route path='/game/matchAnalysis/:year/:season' component={MatchAnalysis} />
          <Route path='/game/playerAnalysis/:year/:season' component={PlayerAnalysis} />
          <Route path='/subhome' component={SubHome} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
