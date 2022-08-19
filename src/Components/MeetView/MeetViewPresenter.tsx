import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { gameSceneSelector } from '../../Constant/selectors';

import ChatBox from './ChatBox';

const Container = styled.div`
  overflow: hidden;
`;

const BackgroundImage = styled.div<{ imageSrc: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url('${({ imageSrc }) => imageSrc}');
  background-position: center;
  background-size: cover;
`;

const CharacterImage = styled.img`
  height: 90%;
  position: absolute;
  left: 50%;
  bottom: 0;
  object-position: bottom;
  object-fit: contain;
  transform-origin: bottom center;
  transform: scale(1.1) translate(-50%, 0);
`;

export interface MeetViewPresenterProps {
  stepFromScript: React.MouseEventHandler;
  stepFromReaction: React.MouseEventHandler;
  selectOption: Function;
}
const MeetViewPresenter: React.FC<MeetViewPresenterProps> = ({
  stepFromScript,
  stepFromReaction,
  selectOption,
}) => {
  const gameScene = useRecoilValue(gameSceneSelector);
  const [state, setState] = useState({
    backgroundImagePath: '',
    characterImagePath: '',
  });

  useEffect(() => {
    if (
      gameScene.characterImagePath &&
      gameScene.characterImagePath.length > 0
    ) {
      if (gameScene.characterImagePath.trim().toLowerCase() === 'x') {
        setState((state) => ({ ...state, characterImagePath: '' }));
        return;
      }

      const imgTag = document.createElement('img');
      imgTag.src = gameScene.characterImagePath as string;
      imgTag.onload = (e) =>
        setState((state) => ({
          ...state,
          characterImagePath: gameScene?.characterImagePath ?? '',
        }));
    } else {
      setState((state) => ({ ...state, characterImagePath: '' }));
    }
  }, [gameScene.characterImagePath, gameScene]);

  useEffect(() => {
    if (
      gameScene.backgroundImagePath &&
      gameScene.backgroundImagePath.length > 0
    ) {
      const imgTag = document.createElement('img');
      imgTag.src = gameScene.backgroundImagePath as string;
      imgTag.onload = (e) =>
        setState((state) => ({
          ...state,
          backgroundImagePath: gameScene?.backgroundImagePath ?? '',
        }));
    } else {
      setState((state) => ({ ...state, backgroundImagePath: '' }));
    }
  }, [gameScene.backgroundImagePath, gameScene]);

  return (
    <Container
      onClick={
        gameScene.step === 'script'
          ? stepFromScript
          : gameScene.step === 'reaction'
          ? stepFromReaction
          : stepFromScript
      }
    >
      {state.backgroundImagePath.length && (
        <BackgroundImage imageSrc={state.backgroundImagePath || ''} />
      )}
      {state.characterImagePath.length && (
        <CharacterImage src={state.characterImagePath || ''} />
      )}
      <ChatBox selectOption={selectOption} />
    </Container>
  );
};

export default MeetViewPresenter;
