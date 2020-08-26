import React from 'react';
import './App.css';
import ChattingView from './Components/ChattingView'
import MeetView from './Components/MeetView'
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles/>
      <MeetView></MeetView>
    </>
  );
}

export default App;
