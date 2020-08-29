import React, { useEffect, useState } from "react";
import "./App.css";
import ChattingView from "./Components/ChattingView";
import MeetView from "./Components/MeetView";
import GlobalStyles from "./GlobalStyles";
import ScriptInterpreter from "./Utils/ScriptInterpreter";
import BGMPlayer from "./Utils/BGMPlayer";
import { loadScript } from "./Utils/api";

// BGMPlayer.play('amy.mp3')

const scriptInterpreter = new ScriptInterpreter();

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    loadScript("amy_male.txt").then((data) => {
      scriptInterpreter.setScenes(data);
      setScriptLoaded(true);
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      {scriptLoaded && (
        <ChattingView scriptInterpreter={scriptInterpreter}></ChattingView>
      )}
    </>
  );
}

export default App;
