import React from "react";
import styled from "styled-components";
import BackgroundResource from "../Resources/Images/gameover.png";

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`;
const BackgroundImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

const GameOverModal = (props) => {
  return (
    <>
      {props.isOpened && (
        <Container>
          <BackgroundImage src={BackgroundResource}></BackgroundImage>
        </Container>
      )}
    </>
  );
};

export default GameOverModal;
