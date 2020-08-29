import React, { useState, useEffect } from "react";
import ChattingViewPresenter from "./ChattingViewPresenter";

const ChattingViewContainer = ({ scriptInterpreter }) => {
  const [chatList, setChatList] = useState([
    { who: "left", message: "당신의 이름은?" },
    { who: "right", message: "나의 이름은 ..." },
  ]);

  useEffect(() => stepNextStep(), []);

  const stepNextStep = () => {
    const { sceneScript } = scriptInterpreter.currentScene;
    setChatList((chatList) => {
      const result = [...chatList]
      if(sceneScript?.length > 0) result.push({ who: "left", message: sceneScript })
      return result
    })
  };

  const selectOption = (optionIndex) => {
    const {answer, reaction, nextId} = scriptInterpreter.currentScene.options[optionIndex]
    setChatList((chatList) => {
      const result = [...chatList]
      if(answer?.length > 0) result.push({ who: "right", message: answer })
      if(reaction?.length > 0) result.push({ who: "left", message: reaction })
      return result
    })
    scriptInterpreter.getNextScene( nextId )
    stepNextStep()
  }

  return (
    <ChattingViewPresenter
      chatList={chatList}
      scene={scriptInterpreter.currentScene}
      selectOption={selectOption}
    ></ChattingViewPresenter>
  );
};

export default ChattingViewContainer;
