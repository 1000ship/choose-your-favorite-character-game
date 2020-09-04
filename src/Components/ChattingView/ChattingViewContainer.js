import React, { useState, useEffect } from "react";
import ChattingViewPresenter from "./ChattingViewPresenter";
import {
  SCENE_TYPE_MEET,
  SCENE_TYPE_CHANGE_DURATION,
  SCENE_TYPE_ENDING,
} from "../../Utils/constant";
import SoundPlayer from "../../Utils/SoundPlayer";

const ChattingViewContainer = ({ scriptInterpreter, setSceneType }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => doCurrentScene(), []);

  const doCurrentScene = () => {
    const {
      sceneType,
      sceneScript,
      options,
      nextSceneId,
      characterName,
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
          isEnding: sceneType === SCENE_TYPE_ENDING
        });
      return result;
    });
    if (options?.length === 0) {
      scriptInterpreter.getNextScene(nextSceneId);
      doCurrentScene();
    }
  };

  const selectOption = (optionIndex) => {
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

  return (
    <ChattingViewPresenter
      chatList={chatList}
      scene={scriptInterpreter.currentScene}
      selectOption={selectOption}
    ></ChattingViewPresenter>
  );
};

export default ChattingViewContainer;
