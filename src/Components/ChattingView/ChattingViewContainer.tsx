import React, { useState, useEffect } from "react";
import ChattingViewPresenter from "./ChattingViewPresenter";
import {
  SCENE_TYPE_MEET,
  SCENE_TYPE_CHANGE_DURATION,
  SCENE_TYPE_ENDING,
} from "../../Constant";
import { endingCounter } from "../../Utils/api";
import { RouteComponentProps, withRouter } from "react-router";
import { Chat } from "../../Constant/types";

interface ChattingViewContainerProps extends RouteComponentProps {
  scriptInterpreter: any;
  setSceneType: any;
  setGameOver: any;
  currentCharacterName: any;
  history: any;
}
const ChattingViewContainer: React.FC<ChattingViewContainerProps> = ({
  scriptInterpreter,
  setSceneType,
  setGameOver,
  currentCharacterName,
  history,
}) => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [isEnding, setEnding] = useState(false);

  useEffect(() => doCurrentScene());

  const doCurrentScene = () => {
    const {
      sceneType,
      sceneScript,
      options,
      nextSceneId,
      characterName,
      sceneId,
    } = scriptInterpreter.currentScene;
    if (sceneType === SCENE_TYPE_MEET) {
      setTimeout(
        () => setSceneType(SCENE_TYPE_MEET),
        SCENE_TYPE_CHANGE_DURATION
      );
      return;
    }
    setChatList((chatList) => {
      const result = [...chatList];
      if (sceneScript?.length > 0)
        result.push({
          who: characterName === "{name}" ? "right" : "left",
          message: sceneScript,
          isEnding: sceneType === SCENE_TYPE_ENDING,
        });
      return result;
    });
    if (sceneType === SCENE_TYPE_ENDING){
      setEnding(true);
      endingCounter.countUp(currentCharacterName, sceneId)
    }
    if (options?.length === 0) {
      scriptInterpreter.getNextScene(nextSceneId);
      doCurrentScene();
    }
  };

  const selectOption = (optionIndex: number) => {
    const { answer, reaction, nextId } = scriptInterpreter.currentScene.options[
      optionIndex
    ];
    setChatList((chatList) => {
      const result = [...chatList];
      if (answer?.length > 0) result.push({ who: "right", message: answer });
      if (reaction?.length > 0) result.push({ who: "left", message: reaction });
      return result;
    });
    scriptInterpreter.getNextScene(nextId);
    doCurrentScene();
  };

  const stepFromEnding = () => {
    setGameOver(true);
  };

  const onLogoClick = () => {
    history.push('/')
  }

  return (
    <ChattingViewPresenter
      chatList={chatList}
      scene={scriptInterpreter.currentScene}
      selectOption={selectOption}
      stepFromEnding={isEnding ? stepFromEnding : null}
      onLogoClick={onLogoClick}
    ></ChattingViewPresenter>
  );
};

export default withRouter(ChattingViewContainer);
