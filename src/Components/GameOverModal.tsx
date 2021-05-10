import React from "react";
import styled from "styled-components";
import BackgroundResource from "../Resources/Images/gameover.png";

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  width: 350px;
  @media (min-width: 768px) {
    width: 600px;
  }

  animation-name: slidein;
  animation-duration: 5s;

  @keyframes slidein {
    from {
      top: 150%;
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const BackgroundImage = styled.img`
  width: 100%;
  object-fit: contain;
`;
const Content = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GameOverText = styled.div`
  font-weight: 600;
  font-size: 2.4em;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    font-size: 4em;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const Button = styled.div`
  background-image: linear-gradient(#ee609c, #b565d9);
  border-radius: 10px;
  padding: 20px;
  white-space: nowrap;
  color: white;
  font-size: 1em;
  flex: 1;
  margin: 4px;
  text-align: center;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 1.5em;
  }
`;

export interface GameOverModalProps {
  isOpened: boolean;
  resetGame: Function;
  exitGame: Function;
}
const GameOverModal: React.FC<GameOverModalProps> = (props) => {
  const { isOpened, resetGame, exitGame } = props;
  const onResetClick = (e: React.MouseEvent) => resetGame();
  const onOtherGameClick = (e: React.MouseEvent) => exitGame();
  return (
    <>
      {isOpened && (
        <Container>
          <BackgroundImage src={BackgroundResource}></BackgroundImage>
          <Content>
            <GameOverText>GAME OVER</GameOverText>
            <ButtonGroup>
              <Button onClick={onResetClick}>처음부터</Button>
              <Button onClick={onOtherGameClick}>다른 캐릭터 선택하기</Button>
            </ButtonGroup>
          </Content>
        </Container>
      )}
    </>
  );
};

export default GameOverModal;
