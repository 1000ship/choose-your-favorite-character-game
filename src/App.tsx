import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import OpeningPage from "./Pages/OpeningPage";
import ChoicePage from "./Pages/ChoicePage";
import GamePage from "./Pages/GamePage";
import GlobalStyles from "./GlobalStyles";
import PreGamePage from "./Pages/PreGamePage";
import AdminPage from "./Pages/AdminPage";
import VideoPage from "./Pages/VideoPage";
import InfoPage from "./Pages/InfoPage";
import CameraPage from "./Pages/CameraPage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Router>
          <Switch>
            <Route path="/camera" component={CameraPage}></Route>
            <Route path="/choice" component={ChoicePage}></Route>
            <Route path="/pre-game" component={PreGamePage}></Route>
            <Route path="/game" component={GamePage} />
            <Route path="/video" component={VideoPage}></Route>
            <Route path="/info" component={InfoPage}></Route>
            <Route path="/admin" component={AdminPage}></Route>
            <Route path="/" component={OpeningPage}></Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </React.Suspense>
    </RecoilRoot>
  );
}

export default App;
