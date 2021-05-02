import React, { useEffect, useState } from "react";
import ChattingView from "../Components/ChattingView";
import MeetView from "../Components/MeetView";
import ScriptInterpreter from "../Utils/ScriptInterpreter";
import BGMPlayer from "../Utils/BGMPlayer";
import { loadScript } from "../Utils/api";
import { SCENE_TYPE_TEXT, BGM_MAIN } from "../Constant";
import { RouteComponentProps, withRouter } from "react-router-dom";
import GameOverModal from "../Components/GameOverModal";
import { useRecoilValue } from "recoil";
import { gameConfigAtom } from "../Constant/atoms";

// BGMPlayer.play('amy.mp3')

const scriptInterpreter = new ScriptInterpreter();

const GamePage:React.FC<RouteComponentProps> = (props) => {
  const {
    history,
  } = props;
  
  const gameConfig = useRecoilValue(gameConfigAtom)
  const folderName = `${gameConfig.characterName[0].toUpperCase()}${gameConfig.characterName.slice(
    1
  )}`;

  const [sceneType, setSceneType] = useState(SCENE_TYPE_TEXT);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    loadScript(`${gameConfig.characterName}.txt`).then((data) => {
      scriptInterpreter.setScenes(data);
      scriptInterpreter.setFolderName(folderName);
      setScriptLoaded(true);
      if( scriptInterpreter?.currentScene?.sceneType ) setSceneType(scriptInterpreter?.currentScene?.sceneType);
    });
  });

  const resetGame = () => {
    history.push(`/video/${gameConfig.characterName}`);
    BGMPlayer.pause()
  };

  const exitGame = () => {
    history.push("/choice");
    BGMPlayer.play(BGM_MAIN)
  };

  return (
    <>
      {scriptLoaded &&
        (sceneType === SCENE_TYPE_TEXT ? (
          <ChattingView
            scriptInterpreter={scriptInterpreter}
            setSceneType={setSceneType}
            setGameOver={setGameOver}
            currentCharacterName={gameConfig.characterName}
          ></ChattingView>
        ) : (
          <MeetView
            scriptInterpreter={scriptInterpreter}
            setSceneType={setSceneType}
            setGameOver={setGameOver}
            currentCharacterName={gameConfig.characterName}
          ></MeetView>
        ))}
      <GameOverModal
        isOpened={gameOver}
        resetGame={resetGame}
        exitGame={exitGame}
      ></GameOverModal>
    </>
  );
}

export default withRouter(GamePage);
