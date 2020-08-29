import React, { useState, useEffect } from "react";
import MeetViewPresenter from "./MeetViewPresenter";
import {
  SCENE_TYPE_TEXT,
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

  const createInitScene = (characterName, sceneScript, data = {}) =>
    Object.assign(data, {
      step: MEET_STEP_SCRIPT,
      characterName,
      sceneScript,
    });

  const doCurrentScene = () => {
    const {
      sceneType,
      characterName,
      sceneScript,
    } = scriptInterpreter.currentScene;
    if (sceneType === SCENE_TYPE_TEXT) {
      setTimeout(() => setSceneType(SCENE_TYPE_TEXT), SCENE_TYPE_CHANGE_DURATION);
      return;
    }
    setMeetData((data) => createInitScene(characterName, sceneScript));
  };

  const stepFromScript = () => {
    setMeetData((data) => {
      const { nextSceneId, options } = scriptInterpreter.currentScene;
      if (options?.length === 0) {
        scriptInterpreter.getNextScene(nextSceneId);
        const { characterName, sceneScript } = scriptInterpreter.currentScene;
        return { ...data, step: MEET_STEP_SCRIPT, characterName, sceneScript };
      } else {
        return { ...data, step: MEET_STEP_OPTION, options };
      }
    });
  };

  const stepFromReaction = () => {
    setMeetData((data) => {
      const { options, nextSceneId } = scriptInterpreter.currentScene;
      const { optionIndex } = data;
      const nextId =
        options?.length > 0 ? options[optionIndex].nextId : nextSceneId;
      const { characterName, sceneScript } = scriptInterpreter.getNextScene(
        nextId
      );
      return { ...data, step: MEET_STEP_SCRIPT, characterName, sceneScript };
    });
  };

  const selectOption = (optionIndex) => {
    setMeetData((data) => ({
      ...data,
      step: MEET_STEP_REACTION,
      optionIndex,
    }));
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
