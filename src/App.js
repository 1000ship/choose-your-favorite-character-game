import React from 'react';
import './App.css';
import ChattingView from './Components/ChattingView'
import MeetView from './Components/MeetView'
import GlobalStyles from './GlobalStyles';
import ScriptInterpreter from './Utils/ScriptInterpreter';
import BGMPlayer from './Utils/BGMPlayer'

// BGMPlayer.play('amy.mp3')

function App() {
  var scriptInterpreter = new ScriptInterpreter("amy_male.txt")

  return (
    <>
      <GlobalStyles/>
      <MeetView scriptInterpreter={scriptInterpreter}></MeetView>
    </>
  );
}

export default App;
