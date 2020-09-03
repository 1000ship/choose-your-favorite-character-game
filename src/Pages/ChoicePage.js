import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import ChoiceAlertResource from "../Resources/Images/choice_alert.png";
import AmyResource from "../Resources/Images/amy.png";
import BellaResource from "../Resources/Images/bella.png";
import ClairResource from "../Resources/Images/clair.png";
import AmyNameResource from "../Resources/Images/amy_name.png";
import BellaNameResource from "../Resources/Images/bella_name.png";
import ClairNameResource from "../Resources/Images/clair_name.png";
import { BGM_AMY, BGM_BELLA, BGM_CLAIR } from "../Utils/constant";
import BGMPlayer from "../Utils/BGMPlayer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
`;

const ChoiceAlert = styled.img`
  width: 85%;
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translate(-50%, 0px);
`;

const CharacterSet = styled.div`
  padding: 0px 5%;
  width: 90%;
  height: 83%;
  display: flex;
  justify-content: space-evenly;
`;

const CharacterImage = styled.div`
  background-image: url(${({ imageSrc }) => imageSrc});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom center;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  cursor: pointer;
`;

const CharacterName = styled.img`
  padding: 0px 24%;
  width: 52%;
  margin-bottom: 10%;
`;

const ChoicePage = ({ history }) => {
  const onCharacterClick = (name) => (e) => {
    history.push(`/video/${name}`);
  };

  return (
    <Container>
      <ChoiceAlert src={ChoiceAlertResource}></ChoiceAlert>
      <CharacterSet>
        <CharacterImage
          onClick={onCharacterClick("amy")}
          imageSrc={AmyResource}
        >
          <CharacterName src={AmyNameResource}></CharacterName>
        </CharacterImage>
        <CharacterImage
          onClick={onCharacterClick("bella")}
          imageSrc={BellaResource}
        >
          <CharacterName src={BellaNameResource}></CharacterName>
        </CharacterImage>
        <CharacterImage
          onClick={onCharacterClick("clair")}
          imageSrc={ClairResource}
        >
          <CharacterName src={ClairNameResource}></CharacterName>
        </CharacterImage>
      </CharacterSet>
    </Container>
  );
};

export default withRouter(ChoicePage);
