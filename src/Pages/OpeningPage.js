import React from "react";
import styled from "styled-components";
import PointerImage from "../Resources/Images/pointer.png";
import { withRouter } from "react-router-dom";
import BGMPlayer from "../Utils/BGMPlayer";
import { BGM_MAIN } from "../Utils/constant";
import InfoImageResource from "../Resources/Images/information_icon.png";
import CYFCImageResource from "../Resources/Images/cyfc_white_logo.png";
import ParagraphImageResource from "../Resources/Images/gamestartscene.png";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 70%;
  align-items: center;
`;
const LogoImage = styled.div`
  background-size: contain;
background-repeat: no-repeat;
  background-position: bottom;
  background-image: url(${({srcImage})=>srcImage});
  flex:5;
  object-fit: contain;
  width: 100%;
  transform: translate(-20px, 0);
  margin-bottom: 20px;
`;
const CYFCImage = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${({srcImage})=>srcImage});
  flex:1;
  object-fit: contain;
  width: 100%;
`;
const ParagraphImage = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  background-image: url(${({srcImage})=>srcImage});
  flex:1;
  object-fit: contain;
  width: 100%;
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
      <LogoContainer>
      <LogoImage srcImage={PointerImage}></LogoImage>
      <CYFCImage srcImage={CYFCImageResource}></CYFCImage>
      <ParagraphImage srcImage={ParagraphImageResource}></ParagraphImage></LogoContainer>
    </Container>
  );
};

export default withRouter(OpeningPage);
