import React, { useEffect, useState } from "react";
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
import VideoPage from "./Pages/VideoPage";
import InfoPage from "./Pages/InfoPage";
import CameraPage from "./Pages/CameraPage";
import ScriptParser from "./Utils/ScriptParser";

// for bug fix
// const str = "고마워요 저도 제가 어떻게 해야 될지 모르겠어서 마음 고생 많이 했는데 이렇게 얘기하니 뭔가 기분이 나아진 것 같아요. 고마워요. {snd:28 고마워요 저도 제가 어떻게 해야 될지 모르겠어서 마음 고생 많이 했는데 이렇게 얘기하니 뭔가 기분이 나아진 것 같아요. 고마워요.mp3} {img:15 감동.png}"
// console.log(ScriptParser.getSpecials(str))

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/camera" component={CameraPage}></Route>
          <Route path="/choice" component={ChoicePage}></Route>
          <Route path="/pre-game" component={PreGamePage}></Route>
          <Route path="/game" component={GamePage}></Route>
          <Route path="/video" component={VideoPage}></Route>
          <Route path="/info" component={InfoPage}></Route>
          <Route path="/" component={OpeningPage}></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
