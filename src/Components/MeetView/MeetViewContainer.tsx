import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';

import { gameOverAtom } from '../../Constant/atoms';
import { isiOS } from '../../Constant/environment';
import {
  gameConfigSelector,
  gameSceneSelector,
} from '../../Constant/selectors';

import MeetViewPresenter from './MeetViewPresenter';

interface MeetViewContainerProps {
  playSound: (path: string) => void;
}

const MeetViewContainer: React.FC<MeetViewContainerProps> = (props) => {
  const { playSound } = props;

  const gameConfig = useRecoilValue(gameConfigSelector);
  const [gameScene, setGameScene] = useRecoilState(gameSceneSelector);
  const gameOver = useRecoilValue(gameOverAtom);

  const stepFromScript = useCallback(
    (e: React.MouseEvent) => {
      if (gameOver) return;

      if (gameScene?.options?.length === 0) {
        // console.log( "케이스 #1 첫 대사 후 선택지 없으면 바로 다음 대사로 이동" )
        const nextScene = gameConfig.scenes?.find(
          (scene) => scene.sceneId === gameScene?.nextSceneId,
        );
        if (nextScene) {
          if (nextScene.sceneScript?.length === 0) {
            // 다음 장면으로 넘어가되, 대사가 없으면 바로 선택지로 이동
            setGameScene({ ...nextScene, step: 'option' });
          } else {
            // 모바일 웹 목소리 재생--------
            if (nextScene.sceneSound) {
              if (process.env.NODE_ENV === 'development')
                toast.info('사용자 음성을 재생합니다. ' + nextScene.sceneSound);
              if (isiOS) setTimeout(() => playSound(nextScene.sceneSound), 100);
            }
            // ----------------------------

            setGameScene({ ...nextScene, step: 'script' });
          }
        }
      } else {
        // console.log( "케이스 #2  선택지 있으면 선택지 고르기" )
        setGameScene((gameScene) => ({ ...gameScene, step: 'option' }));
      }
    },
    [gameScene, gameConfig.scenes, setGameScene, gameOver],
  );

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (gameOver) return;

      // 케이스 #3 선택한 선택지로 재생
      if (gameScene.options[optionIndex].reaction?.length === 0) {
        // 선택지에 대한 리액션이 없을 경우, 바로 다음 씬으로 이동
        const { nextId } = gameScene.options[optionIndex];
        const nextScene = gameConfig.scenes?.find(
          (scene) => scene.sceneId === nextId,
        );
        if (nextScene) {
          if (nextScene.sceneScript?.length === 0) {
            // 다음 장면으로 넘어가되, 대사가 없으면 바로 선택지로 이동
            setGameScene({ ...nextScene, step: 'option' });
          } else {
            // 모바일 웹 목소리 재생--------
            if (nextScene.sceneSound) {
              if (process.env.NODE_ENV === 'development')
                toast.info('사용자 음성을 재생합니다. ' + nextScene.sceneSound);
              if (isiOS) setTimeout(() => playSound(nextScene.sceneSound), 100);
            }
            // ----------------------------

            setGameScene({ ...nextScene, step: 'script' });
          }
        }
      } else {
        // 리액션이 있을 경우, 리액션 반응
        setGameScene((gameScene) => ({
          ...gameScene,
          step: 'reaction',
          optionIndex,
        }));
      }
    },
    [gameScene, gameConfig.scenes, setGameScene, gameOver],
  );

  const stepFromReaction = useCallback(
    (e: React.MouseEvent) => {
      if (gameOver) return;

      setGameScene((gameScene) => {
        if (
          typeof gameScene?.optionIndex === 'number' &&
          gameScene.optionIndex >= 0
        ) {
          const nextId = gameScene.selectedOption?.nextId;
          const nextScene = gameConfig.scenes?.find(
            (scene) => scene.sceneId === nextId,
          );
          if (nextScene) {
            if (nextScene.sceneScript?.length === 0) {
              // 다음 장면으로 넘어가되, 대사가 없으면 바로 선택지로 이동
              return { ...nextScene, step: 'option' };
            }

            // 모바일 웹 목소리 재생 ------------------
            if (nextScene.sceneSound) {
              if (process.env.NODE_ENV === 'development')
                toast.info('사용자 음성을 재생합니다. ' + nextScene.sceneSound);
              if (isiOS) setTimeout(() => playSound(nextScene.sceneSound), 100);
            }
            // -------------------------------------

            return { ...nextScene, step: 'script' };
          }
        }
        return gameScene;
      });
    },
    [gameConfig.scenes, setGameScene, gameOver],
  );

  return (
    <MeetViewPresenter
      stepFromScript={stepFromScript}
      stepFromReaction={stepFromReaction}
      selectOption={selectOption}
    />
  );
};

export default MeetViewContainer;
