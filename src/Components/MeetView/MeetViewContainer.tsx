import React, { useState, useEffect } from "react";
import MeetViewPresenter from "./MeetViewPresenter";
import {
  SCENE_TYPE_TEXT,
  SCENE_TYPE_ENDING,
  MEET_STEP_OPTION,
  MEET_STEP_REACTION,
  MEET_STEP_SCRIPT,
  SCENE_TYPE_CHANGE_DURATION,
  MEET_STEP_ENDING,
} from "../../Constant";
import ScriptParser from "../../Utils/ScriptParser";
import SoundPlayer from "../../Utils/SoundPlayer";
import { endingCounter } from "../../Utils/api";
import { MeetData, MeetStep, Scene } from "../../Constant/types";
import ScriptInterpreter from "../../Utils/ScriptInterpreter";

export interface MeetViewContainerProps {
  scriptInterpreter: ScriptInterpreter;
  setSceneType: Function;
  setGameOver: Function;
  currentCharacterName: string;
}

const MeetViewContainer: React.FC<MeetViewContainerProps> = ({
  scriptInterpreter,
  setSceneType,
  setGameOver,
  currentCharacterName,
}) => {
  const [meetData, setMeetData] = useState<MeetData>({
    step: MEET_STEP_SCRIPT as MeetStep,
    characterName: "" as string,
    sceneScript: "" as string,
    options: [] as any[],
    optionIndex: 0 as number,
    data: scriptInterpreter.folderName as string,
  });

  useEffect(() => doCurrentScene());

  const createInitScene = (newScene?: Scene | null, data = {}) => {
    if( !newScene ) return;
    const folderName = scriptInterpreter.folderName;
    const {
      characterName,
      sceneScript,
      backgroundImage,
      characterImage,
      sceneType,
      options,
      nextSceneId,
      sceneSound,
      sceneId,
    } = newScene;
    let updateData = {
      step: MEET_STEP_SCRIPT,
      characterName,
      sceneScript,
      options,
      nextSceneId,
      sceneSound,
      folderName,
      sceneId,
    } as any;
    if (backgroundImage?.length > 0) updateData.backgroundImage = backgroundImage.trim();
    if (characterImage?.length > 0) updateData.characterImage = characterImage.trim();
    if (sceneType === SCENE_TYPE_TEXT) setSceneType(SCENE_TYPE_TEXT);
    else if (sceneType === SCENE_TYPE_ENDING) {
      updateData.characterImage = "";
      updateData.step = MEET_STEP_ENDING;
      endingCounter.countUp(currentCharacterName, sceneId);
    }
    if (sceneScript?.length === 0) updateData.step = MEET_STEP_OPTION;
    if (sceneSound?.length > 0) SoundPlayer.play(folderName, sceneSound);
    return Object.assign(Object.assign({}, data), updateData);
  };

  const doCurrentScene = () => {
    const { sceneType } = scriptInterpreter?.currentScene || {};
    if (sceneType === SCENE_TYPE_TEXT) {
      setTimeout(() => setSceneType(SCENE_TYPE_TEXT), SCENE_TYPE_CHANGE_DURATION);
      return;
    }
    setMeetData((data) => createInitScene(scriptInterpreter?.currentScene, data));
  };

  const stepFromScript = () => {
    setMeetData((data) => {
      if (data.options?.length === 0) {
        if( data.nextSceneId ) scriptInterpreter.getNextScene(data.nextSceneId);
        return createInitScene(scriptInterpreter?.currentScene, data);
      } else {
        return { ...data, step: MEET_STEP_OPTION };
      }
    });
  };

  const stepFromReaction = () => {
    setMeetData((data) => {
      const { optionIndex } = data;
      const nextId = data.options?.length > 0 ? data.options[optionIndex].nextId : data.nextSceneId;
      scriptInterpreter.getNextScene(nextId);
      return createInitScene(scriptInterpreter?.currentScene, data);
    });
  };

  const stepFromEnding = () => {
    setGameOver(true);
  };

  const selectOption = (optionIndex: number) => {
    setMeetData((data) => {
      let result = {
        ...data,
        step: MEET_STEP_REACTION,
        optionIndex,
      } as any;
      if (data.options[optionIndex].reaction?.length === 0) {
        const nextId =
          data.options?.length > 0 ? data.options[optionIndex].nextId : data.nextSceneId;
        scriptInterpreter.getNextScene(nextId);
        return createInitScene(scriptInterpreter?.currentScene, data);
      }
      const script = data.options[optionIndex].reaction;
      const specialData = ScriptParser.getSpecials(script);
      if (specialData) console.log(specialData);
      if (specialData?.img) result.characterImage = specialData.img;
      if (specialData?.bg) result.backgroundImage = specialData.bg;
      if (specialData?.snd) {
        SoundPlayer.play(data?.folderName, specialData.snd);
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
          : meetData.step === MEET_STEP_ENDING
          ? stepFromEnding
          : null
      }
      selectOption={selectOption}
    ></MeetViewPresenter>
  );
};

export default MeetViewContainer;
