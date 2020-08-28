import React from 'react';
import './App.css';
import ChattingView from './Components/ChattingView'
import MeetView from './Components/MeetView'
import GlobalStyles from './GlobalStyles';
import ScriptInterpreter from './Utils/ScriptInterpreter';

function App() {
  var scriptInterpreter = new ScriptInterpreter("amy_male.json")

  return (
    <>
      <GlobalStyles/>
      <MeetView scriptInterpreter={scriptInterpreter}></MeetView>
    </>
  );
}

export default App;
