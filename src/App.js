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
import ScriptParser from "./Utils/ScriptParser";

// for bug fix
// const str = "아 저 그런 영화 딱 질색인데 ㅎㅎ 영화 취향 진짜 안 맞네요! {snd:17 아 저 그런 영화 딱 질색인데 ㅎㅎ 영화 취향 진짜 안 맞네요.mp3}  {img:16 띠껍.png}"
// console.log(ScriptParser.getSpecials(str))

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
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
