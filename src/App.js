import React, { useEffect, useState } from "react";
import "./App.css";
import ChattingView from "./Components/ChattingView";
import MeetView from "./Components/MeetView";
import GlobalStyles from "./GlobalStyles";
import ScriptInterpreter from "./Utils/ScriptInterpreter";
import BGMPlayer from "./Utils/BGMPlayer";
import { loadScript } from "./Utils/api";
import { SCENE_TYPE_TEXT } from "./Utils/constant";
import ScriptParser from "./Utils/ScriptParser";

// BGMPlayer.play('amy.mp3')

console.log("PARSE:", ScriptParser.getText( "{name} Hello {world} {img:07 뿌듯.png}" ) )

const scriptInterpreter = new ScriptInterpreter();

function App() {
  const [sceneType, setSceneType] = useState(SCENE_TYPE_TEXT);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    let what = ""
    what = window.prompt("amy_male.txt/amy_female.txt/bella.txt/clair.txt");
    if (what?.length === 0) what = "amy_male.txt";
    let folderName;
    switch (what) {
      case "amy_male.txt":
      case "amy_female.txt":
        folderName = "Amy";
        break;
      case "bella.txt":
        folderName = "Bella";
        break;
      case "clair.txt":
        folderName = "Clair";
        break;
    }
    loadScript(what).then((data) => {
      scriptInterpreter.setScenes(data);
      scriptInterpreter.setFolderName(folderName);
      setScriptLoaded(true);
      setSceneType(scriptInterpreter.currentScene.sceneType);
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      {scriptLoaded &&
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
        ))}
    </>
  );
}

export default App;
