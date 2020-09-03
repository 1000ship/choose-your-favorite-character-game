import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import BackButtonResource from "../Resources/Images/statement_back.png";
import SkipButtonResource from "../Resources/Images/video_skip.png";
import { BGM_AMY, BGM_BELLA, BGM_CLAIR } from "../Utils/constant";
import BGMPlayer from "../Utils/BGMPlayer";
import SoundPlayer from "../Utils/SoundPlayer";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
  display: flex;
  justify-content: center;
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
`;
const SkipButton = styled.img`
  position: absolute;
  right: 5vw;
  bottom: 5vh;
  width: 20vw;
  cursor: pointer;
`;
const VideoPage = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const characterName = pathname.replace("/video/", "");

  const onBackClick = (e) => {
    history.push("/choice");
  };

  const onSkipClick = (e) => {
    history.push(`/game/${characterName}`);
    let bgmFile;
    switch (characterName) {
      case "amy":
        bgmFile = BGM_AMY;
        break;
      case "bella":
        bgmFile = BGM_BELLA;
        break;
      case "clair":
        bgmFile = BGM_CLAIR;
        break;
    }
    if (bgmFile) BGMPlayer.play(bgmFile);
    SoundPlayer.play("Amy", "iphone sound.mp3");
  };

  return (
    <Container>
      <BackButton onClick={onBackClick} src={BackButtonResource}></BackButton>
      <SkipButton onClick={onSkipClick} src={SkipButtonResource}></SkipButton>
      <VideoView autoPlay controls>
        <source src={`./res/videos/${characterName}.mov`} type="video/mp4" />
      </VideoView>
    </Container>
  );
};

export default withRouter(VideoPage);
