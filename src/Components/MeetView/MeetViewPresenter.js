import React from "react";
import styled from "styled-components";
import ChatBox from "./ChatBox";

const Container = styled.div``;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url('${({ imageSrc }) => imageSrc}');
  background-position: center;
  background-size: cover;
`;

const CharacterImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: url('${({ imageSrc }) => imageSrc}');
  background-position: bottom;
  background-size: contain;
  background-repeat: no-repeat;
  transform-origin: bottom center;
  transform: scale(1.2);
`;

const MeetViewPresenter = ({ meetData, stepEvent, selectOption }) => {
  const { folderName, backgroundImage, characterImage, sceneSound } = meetData;
  return (
    <Container onClick={stepEvent}>
      {backgroundImage?.length > 0 && (
        <BackgroundImage
          imageSrc={`./res/img/background/${folderName}/${backgroundImage}`}
        ></BackgroundImage>
      )}
      {characterImage?.length > 0 && (
        <CharacterImage
          imageSrc={`./res/img/character/${folderName}/${characterImage}`}
        ></CharacterImage>
      )}
      <ChatBox meetData={meetData} selectOption={selectOption}></ChatBox>
    </Container>
  );
};

export default MeetViewPresenter;
