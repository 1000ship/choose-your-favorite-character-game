import React, { useEffect, useState } from "react";
import ChattingView from "../Components/ChattingView";
import MeetView from "../Components/MeetView";
import GlobalStyles from "../GlobalStyles";
import ScriptInterpreter from "../Utils/ScriptInterpreter";
import BGMPlayer from "../Utils/BGMPlayer";
import { loadScript } from "../Utils/api";
import { SCENE_TYPE_TEXT } from "../Utils/constant";
import { withRouter } from "react-router-dom";
import MemoryData from "../Utils/MemoryData";

// BGMPlayer.play('amy.mp3')

const scriptInterpreter = new ScriptInterpreter();

function GamePage(props) {
  const {location: {pathname}} = props
  let characterName = pathname.replace("/game/", "")
  const folderName = `${characterName[0].toUpperCase()}${characterName.slice(1)}`

  const [sceneType, setSceneType] = useState(SCENE_TYPE_TEXT);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    if( characterName === "amy" )
      characterName = `${characterName}_${MemoryData.getData("gender", "male")}.txt`
    else
      characterName = `${characterName}.txt`
    console.log( characterName, folderName )
    loadScript(characterName).then((data) => {
      scriptInterpreter.setScenes(data);
      scriptInterpreter.setFolderName(folderName);
      setScriptLoaded(true);
      setSceneType(scriptInterpreter.currentScene.sceneType);
    });
  }, []);

  return (
    <>
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

export default withRouter(GamePage);
