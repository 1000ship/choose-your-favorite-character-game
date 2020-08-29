import React, { useState, useEffect } from "react";
import MeetViewPresenter from "./MeetViewPresenter";
import {
  SCENE_TYPE_TEXT,
  SCENE_TYPE_ENDING,
  MEET_STEP_OPTION,
  MEET_STEP_REACTION,
  MEET_STEP_SCRIPT,
  SCENE_TYPE_CHANGE_DURATION,
} from "../../Utils/constant";

const MeetViewContainer = ({ scriptInterpreter, setSceneType }) => {
  const [meetData, setMeetData] = useState({
    step: MEET_STEP_SCRIPT,
    characterName: "",
    sceneScript: "",
    options: [],
    optionIndex: 0,
  });

  useEffect(() => doCurrentScene(), []);

  const createInitScene = (newScene, data = {}) => {
    const {
      characterName,
      sceneScript,
      backgroundImage,
      characterImage,
      sceneType,
      options,
      nextSceneId
    } = newScene;
    let updateData = {
      step: MEET_STEP_SCRIPT,
      characterName,
      sceneScript,
      options,
      nextSceneId
    };
    if (backgroundImage?.length > 0)
      updateData.backgroundImage = backgroundImage;
    if (characterImage?.length > 0) updateData.characterImage = characterImage;
    if (sceneType === SCENE_TYPE_ENDING) updateData.characterImage = "";
    if (sceneScript?.length === 0) updateData.step = MEET_STEP_OPTION;
    return Object.assign(Object.assign({}, data), updateData);
  };

  const doCurrentScene = () => {
    const { sceneType } = scriptInterpreter.currentScene;
    if (sceneType === SCENE_TYPE_TEXT) {
      setTimeout(
        () => setSceneType(SCENE_TYPE_TEXT),
        SCENE_TYPE_CHANGE_DURATION
      );
      return;
    }
    setMeetData((data) => createInitScene(scriptInterpreter.currentScene));
  };

  const stepFromScript = () => {
    setMeetData((data) => {
      if (data.options?.length === 0) {
        scriptInterpreter.getNextScene(data.nextSceneId);
        return createInitScene(scriptInterpreter.currentScene, data);
      } else {
        return { ...data, step: MEET_STEP_OPTION };
      }
    });
  };

  const stepFromReaction = () => {
    setMeetData((data) => {
      const { options, nextSceneId } = scriptInterpreter.currentScene;
      const { optionIndex } = data;
      const nextId =
        options?.length > 0 ? options[optionIndex].nextId : nextSceneId;
      scriptInterpreter.getNextScene(nextId);
      return createInitScene(scriptInterpreter.currentScene, data);
    });
  };

  const selectOption = (optionIndex) => {
    setMeetData((data) => {
      let result = {
        ...data,
        step: MEET_STEP_REACTION,
        optionIndex,
      };
      if (data.options[optionIndex].reaction?.length === 0) {
        const nextId =
          data.options?.length > 0 ? data.options[optionIndex].nextId : data.nextSceneId;
        scriptInterpreter.getNextScene(nextId);
        return createInitScene(scriptInterpreter.currentScene, data);
      }
      return result;
    });
  };

  return (
    <MeetViewPresenter
      meetData={meetData}
      stepEvent={
        meetData.step === MEET_STEP_SCRIPT
          ? stepFromScript
          : meetData.step === MEET_STEP_REACTION
          ? stepFromReaction
          : null
      }
      selectOption={selectOption}
    ></MeetViewPresenter>
  );
};

export default MeetViewContainer;
