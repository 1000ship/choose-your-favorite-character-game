import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { BGM_MAIN, RESOURCE_PATH } from '../Constant';
import { gameConfigAtom } from '../Constant/atoms';
import BackButtonResource from '../Resources/Images/statement_back.png';
import SkipButtonResource from '../Resources/Images/video_skip.png';
import BGMPlayer from '../Utils/BGMPlayer';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const VideoView = styled.video`
  height: 100%;
`;

const BackButton = styled.img`
  position: absolute;
  left: 5vw;
  top: 5vh;
  width: 20vw;
  cursor: pointer;
  z-index: 1;
`;
const SkipButton = styled.img`
  position: absolute;
  right: 5vw;
  bottom: 5vh;
  width: 20vw;
  cursor: pointer;
  z-index: 1;
`;

export type CharacterName =
  | 'amy_male'
  | 'amy_female'
  | 'bella'
  | 'clair'
  | 'andrew'
  | 'brian_male'
  | 'brian_female'
  | 'carl';

const VideoPage: React.FC<RouteComponentProps> = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const characterName = pathname.replace('/video/', '') as CharacterName;
  const setGameConfig = useSetRecoilState(gameConfigAtom);

  const onBackClick = (e: React.MouseEvent) => {
    history.push('/choice');
    BGMPlayer.play(BGM_MAIN);
  };

  const onSkipClick = (e: React.MouseEvent) => {
    setGameConfig((gameConfig) => ({ ...gameConfig, characterName }));
    history.push(`/game/${characterName}`);
  };

  const extensionDictionary = {
    amy_male: 'mp4',
    amy_female: 'mp4',
    bella: 'mp4',
    clair: 'mp4',
    andrew: 'mp4',
    brian_male: 'mp4',
    brian_female: 'mp4',
    carl: 'mp4',
  };

  return (
    <Container>
      <BackButton onClick={onBackClick} src={BackButtonResource} />
      <SkipButton onClick={onSkipClick} src={SkipButtonResource} />
      <VideoView autoPlay controls>
        <source
          src={`${RESOURCE_PATH}/videos/${characterName}.${extensionDictionary[characterName]}`}
          type="video/mp4"
        />
      </VideoView>
    </Container>
  );
};

export default withRouter(VideoPage);
