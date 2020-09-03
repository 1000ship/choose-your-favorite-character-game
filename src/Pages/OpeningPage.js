import React from "react";
import styled from "styled-components";
import PointerImage from "../Resources/Images/pointer.png";
import { withRouter } from "react-router-dom";
import BGMPlayer from "../Utils/BGMPlayer";
import { BGM_MAIN } from "../Utils/constant";
import InfoImageResource from "../Resources/Images/information_icon.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
`;

const LogoImage = styled.img`
  width: 30%;
  height: 30%;
  object-fit: contain;
`;

const InfoImage = styled.img`
  position: absolute;
  right: 5vw;
  top: 5vw;
  width: 8%;
  height: 8%;
  object-fit: contain;
  cursor: pointer;
`;

const OpeningPage = ({ history }) => {
  const onClick = (e) => {
    history.push("/pre-game");
    BGMPlayer.play(BGM_MAIN);
  };

  const onInfoClick = (e) => {
    e.stopPropagation();
    history.push("/info");
  };
  return (
    <Container onClick={onClick}>
      <InfoImage onClick={onInfoClick} src={InfoImageResource}></InfoImage>
      <LogoImage src={PointerImage}></LogoImage>
    </Container>
  );
};

export default withRouter(OpeningPage);
