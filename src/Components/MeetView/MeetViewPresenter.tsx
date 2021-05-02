import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { gameSceneSelector } from "../../Constant/selectors";
import { MeetData } from "../../Constant/types";
import ChatBox from "./ChatBox";

const Container = styled.div``;

const BackgroundImage = styled.div<{imageSrc: string}>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url('${({ imageSrc }) => imageSrc}');
  background-position: center;
  background-size: cover;
`;

const CharacterImage = styled.div<{imageSrc: string}>`
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
  transform: scale(1.1);
`;

export interface MeetViewPresenterProps {
  meetData: MeetData;
  stepEvent: any;
  selectOption: any;
}
const MeetViewPresenter:React.FC<MeetViewPresenterProps> = ({ meetData, stepEvent, selectOption }) => {
  const gameScene = useRecoilValue(gameSceneSelector)

  return (
    <Container onClick={stepEvent}>
      {gameScene?.backgroundImagePath?.length && (
        <BackgroundImage
          imageSrc={gameScene?.backgroundImagePath || ""}
        ></BackgroundImage>
      )}
      {gameScene?.characterImagePath?.length && (
        <CharacterImage
          imageSrc={gameScene?.characterImagePath || ""}
        ></CharacterImage>
      )}
      <ChatBox meetData={meetData} selectOption={selectOption}></ChatBox>
    </Container>
  );
};

export default MeetViewPresenter;
