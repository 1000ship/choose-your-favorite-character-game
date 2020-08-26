import React from 'react';
import './App.css';
import ChattingView from './Components/ChattingView/ChattingViewContainer'
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles/>
      <ChattingView></ChattingView>
    </>
  );
}

export default App;
