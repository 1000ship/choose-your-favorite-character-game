import React, { useEffect, useState } from "react";
import "./App.css";
import ChattingView from "./Components/ChattingView";
import MeetView from "./Components/MeetView";
import GlobalStyles from "./GlobalStyles";
import ScriptInterpreter from "./Utils/ScriptInterpreter";
import BGMPlayer from "./Utils/BGMPlayer";
import { loadScript } from "./Utils/api";
import { SCENE_TYPE_TEXT } from "./Utils/constant";

// BGMPlayer.play('amy.mp3')

const scriptInterpreter = new ScriptInterpreter();

function App() {
  const [sceneType, setSceneType] = useState(SCENE_TYPE_TEXT);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    loadScript("amy_male.txt").then((data) => {
      scriptInterpreter.setScenes(data);
      setScriptLoaded(true);
      setSceneType(scriptInterpreter.currentScene.sceneType);
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* {scriptLoaded &&
        (scriptInterpreter.currentScene.sceneType === SCENE_TYPE_TEXT ? (
          <ChattingView
            scriptInterpreter={scriptInterpreter}
            setSceneType={setSceneType}
          ></ChattingView>
        ) : (
          <MeetView
            scriptInterpreter={scriptInterpreter}
            setSceneType={setSceneType}
          ></MeetView>
        ))} */}
      {scriptLoaded && (
        <MeetView
          scriptInterpreter={scriptInterpreter}
          setSceneType={setSceneType}
        ></MeetView>
      )}
    </>
  );
}

export default App;
