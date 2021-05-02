import React, { useState } from "react";
import ChattingViewPresenter from "./ChattingViewPresenter";
import { RouteComponentProps, withRouter } from "react-router";
import { Chat } from "../../Constant/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameConfigSelector, gameSceneSelector } from "../../Constant/selectors";

const ChattingViewContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const gameConfig = useRecoilValue(gameConfigSelector)
  const [gameScene, setGameScene] = useRecoilState(gameSceneSelector)
  const [chatList, setChatList] = useState<Chat[]>([]);
  
  const selectOption = (optionIndex: number) => {
    const { answer, reaction, nextId } = gameScene.options[optionIndex];

    // 채팅 렌더링
    setChatList((chatList) => {
      const result = [...chatList];
      if (answer?.length) result.push({ who: "right", message: answer });
      if (reaction?.length) result.push({ who: "left", message: reaction });
      return result;
    });

    // 게임 씬 이동
    const nextScene = gameConfig.scenes?.find( scene => scene.sceneId === nextId )
    if( !nextScene ) throw new Error( "nextScene is not present")
    setGameScene( gameScene => ({...gameScene, ...nextScene}) )
  };

  const onLogoClick = (e: React.MouseEvent) => {
    history.push('/')
  }

  return (
    <ChattingViewPresenter
      chatList={chatList}
      selectOption={selectOption}
      onLogoClick={onLogoClick}
    ></ChattingViewPresenter>
  );
};

export default withRouter(ChattingViewContainer);
