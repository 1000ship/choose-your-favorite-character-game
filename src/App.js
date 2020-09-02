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

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/choice" component={ChoicePage}></Route>
          <Route path="/pre-game" component={PreGamePage}></Route>
          <Route path="/game" component={GamePage}></Route>
          <Route path="/" component={OpeningPage}></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
