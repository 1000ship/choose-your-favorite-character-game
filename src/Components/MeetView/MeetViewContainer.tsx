import React, { useCallback } from "react";
import MeetViewPresenter from "./MeetViewPresenter";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameConfigSelector, gameSceneSelector } from "../../Constant/selectors";

const MeetViewContainer: React.FC = () => {
  const gameConfig = useRecoilValue(gameConfigSelector);
  const [gameScene, setGameScene] = useRecoilState(gameSceneSelector);

  const stepFromScript = useCallback(
    (e: React.MouseEvent) => {
      if (gameScene?.options?.length === 0) {
        // console.log( "케이스 #1 첫 대사 후 선택지 없으면 바로 다음 대사로 이동" )
        const nextScene = gameConfig.scenes?.find(
          (scene) => scene.sceneId === gameScene?.nextSceneId
        );
        if (nextScene) setGameScene({ ...nextScene, step: "script" });
      } else {
        // console.log( "케이스 #2  선택지 있으면 선택지 고르기" )
        setGameScene((gameScene) => ({ ...gameScene, step: "option" }));
      }
    },
    [gameScene, gameConfig.scenes, setGameScene]
  );

  const selectOption = useCallback(
    (optionIndex: number) => {
      // 케이스 #3 선택한 선택지로 재생
      if (gameScene.options[optionIndex].reaction?.length === 0) {
        // 선택지에 대한 리액션이 없을 경우, 바로 다음 씬으로 이동
        const nextId = gameScene.options[optionIndex].nextId;
        const nextScene = gameConfig.scenes?.find((scene) => scene.sceneId === nextId);
        if (nextScene) setGameScene({ ...nextScene, step: "script" });
      } else {
        // 리액션이 있을 경우, 리액션 반응
        setGameScene((gameScene) => ({ ...gameScene, step: "reaction", optionIndex }));
      }
    },
    [gameScene, gameConfig.scenes, setGameScene]
  );

  const stepFromReaction = useCallback(
    (e: React.MouseEvent) => {
      setGameScene((gameScene) => {
        if (typeof gameScene?.optionIndex === "number" && gameScene.optionIndex >= 0) {
          const nextId = gameScene.selectedOption?.nextId;
          const nextScene = gameConfig.scenes?.find((scene) => scene.sceneId === nextId);
          if (nextScene) return { ...nextScene, step: "script" };
        }
        return gameScene;
      });
    },
    [gameConfig.scenes, setGameScene]
  );

  return (
    <MeetViewPresenter
      stepFromScript={stepFromScript}
      stepFromReaction={stepFromReaction}
      selectOption={selectOption}
    ></MeetViewPresenter>
  );
};

export default MeetViewContainer;
