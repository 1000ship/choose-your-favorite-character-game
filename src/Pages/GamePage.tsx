import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import ChattingView from "../Components/ChattingView";
import GameOverModal from "../Components/GameOverModal";
import MeetView from "../Components/MeetView";
import { BGM_MAIN } from "../Constant";
import { gameConfigSelector, gameSceneSelector } from "../Constant/selectors";
import BGMPlayer from "../Utils/BGMPlayer";

const GamePage: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const gameConfig = useRecoilValue(gameConfigSelector);
  const [gameScene, setGameScene] = useRecoilState(gameSceneSelector);

  useEffect(() => {
    const initScene = gameConfig?.scenes?.length ? gameConfig.scenes[0] : null;
    if (initScene) {
      setGameScene((gameScene) => ({ ...gameScene, ...initScene }));
    }
  }, [gameConfig, setGameScene]);

  const resetGame = () => {
    if (!gameConfig?.characterName) {
      history.push("/");
    } else {
      history.push(`/video/${gameConfig?.characterName}`);
      BGMPlayer.pause();
    }
  };

  const exitGame = () => {
    history.push("/choice");
    BGMPlayer.play(BGM_MAIN);
  };

  return (
    <>
      {gameScene.sceneType === "text" ? (
        <ChattingView />
      ) : gameScene.sceneType === "meet" ? (
        <MeetView />
      ) : (
        <GameOverModal isOpened={true} resetGame={resetGame} exitGame={exitGame}></GameOverModal>
      )}
    </>
  );
};

export default withRouter(GamePage);
