import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useRecoilState, useResetRecoilState } from "recoil";
import ChattingView from "../Components/ChattingView";
import GameOverModal from "../Components/GameOverModal";
import MeetView from "../Components/MeetView";
import { BGM_MAIN } from "../Constant";
import { gameConfigSelector, gameSceneSelector } from "../Constant/selectors";
import BGMPlayer from "../Utils/BGMPlayer";
import { useSound } from "../Utils/Hook";

const GamePage: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const [gameConfig, setGameConfig] = useRecoilState(gameConfigSelector);
  const [gameScene, setGameScene] = useRecoilState(gameSceneSelector);
  const resetGameConfig = useResetRecoilState(gameConfigSelector)
  const [layoutConfig, setLayoutConfig] = useState({
    viewType: "text" as "text" | "meet",
  })

  useSound()
  useEffect(() => {
    const initScene = gameConfig?.scenes?.length ? gameConfig.scenes[0] : null;
    if (initScene) {
      setGameScene((gameScene) => ({ ...gameScene, ...initScene }));
    }
  }, [gameConfig, setGameScene]);
  useEffect(() => {
    if( gameScene.sceneType === "text" ) {
      setLayoutConfig( layoutConfig => ({...layoutConfig, viewType: "text"}));
    } else if ( gameScene.sceneType === "meet" ) {
      setLayoutConfig( layoutConfig => ({...layoutConfig, viewType: "meet"}));
    } else if ( gameScene.sceneType === "ending") {
      setGameConfig( gameConfig => ({...gameConfig, isGameOver: true}))
    }
  }, [gameScene.sceneType, setLayoutConfig, setGameConfig])

  const resetGame = () => {
    resetGameConfig()
    if (!gameConfig?.characterName) {
      history.push("/");
    } else {
      history.push(`/video/${gameConfig?.characterName}`);
      BGMPlayer.pause();
    }
  };

  const exitGame = () => {
    resetGameConfig()
    history.push("/choice");
    BGMPlayer.play(BGM_MAIN);
  };

  return (
    <>
      {layoutConfig.viewType === "text" ? <ChattingView />
      : layoutConfig.viewType === "meet" ? <MeetView /> : null }
      <GameOverModal isOpened={gameConfig.isGameOver ?? false} resetGame={resetGame} exitGame={exitGame} />
    </>
  );
};

export default withRouter(GamePage);
