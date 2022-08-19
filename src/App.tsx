import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import GlobalStyles from './GlobalStyles';
import AdminPage from './Pages/AdminPage';
import CameraPage from './Pages/CameraPage';
import ChoicePage from './Pages/ChoicePage';
import GamePage from './Pages/GamePage';
import InfoPage from './Pages/InfoPage';
import OpeningPage from './Pages/OpeningPage';
import PreGamePage from './Pages/PreGamePage';
import VideoPage from './Pages/VideoPage';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Router>
          <Switch>
            <Route path="/camera" component={CameraPage} />
            <Route path="/choice" component={ChoicePage} />
            <Route path="/pre-game" component={PreGamePage} />
            <Route path="/game" component={GamePage} />
            <Route path="/video" component={VideoPage} />
            <Route path="/info" component={InfoPage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/" component={OpeningPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
        {process.env.NODE_ENV === 'development' && (
          <ToastContainer autoClose={3000} transition={Slide} />
        )}
      </React.Suspense>
    </RecoilRoot>
  );
}

export default App;
