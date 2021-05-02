import React from "react";
import "./App.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import OpeningPage from "./Pages/OpeningPage";
import ChoicePage from "./Pages/ChoicePage";
import GamePage from "./Pages/GamePage";
import GlobalStyles from "./GlobalStyles";
import PreGamePage from "./Pages/PreGamePage";
import AdminPage from "./Pages/AdminPage";
import VideoPage from "./Pages/VideoPage";
import InfoPage from "./Pages/InfoPage";
import CameraPage from "./Pages/CameraPage";
import DebugPage from "./Pages/DebugPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/camera" component={CameraPage}></Route>
          <Route path="/choice" component={ChoicePage}></Route>
          <Route path="/pre-game" component={PreGamePage}></Route>
          <Route path="/game/debug" component={DebugPage}/>
          <Route path="/game" component={GamePage}/>
          <Route path="/video" component={VideoPage}></Route>
          <Route path="/info" component={InfoPage}></Route>
          <Route path="/admin" component={AdminPage}></Route>
          <Route path="/" component={OpeningPage}></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
