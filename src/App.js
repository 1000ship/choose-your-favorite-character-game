import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import OpeningPage from './Pages/OpeningPage'
import ChoicePage from './Pages/OpeningPage'
import GamePage from './Pages/OpeningPage'

function App() {
  return <Router>
    <Switch>
      <Route path="/" exact component={OpeningPage}></Route>
      <Route path="/choice" exact component={ChoicePage}></Route>
      <Route path="/game" exact component={GamePage}></Route>
      <Redirect to="/"></Redirect>
    </Switch>
  </Router>
}

export default App;
