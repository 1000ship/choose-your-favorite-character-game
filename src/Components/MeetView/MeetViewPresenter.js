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
  background-size: cover;
  background-repeat: no-repeat;
  transform-origin: bottom center;
  transform: scale(0.9);
`;

const MeetViewPresenter = ({ scene }) => {
  return (
    <Container>
      <BackgroundImage
        imageSrc={"./res/img/background/amy bar_final.png"}
      ></BackgroundImage>
      <CharacterImage
        imageSrc={"./res/img/character/02 궁금.png"}
      ></CharacterImage>
      <ChatBox
        scene={scene}
      ></ChatBox>
    </Container>
  );
};

export default MeetViewPresenter;
