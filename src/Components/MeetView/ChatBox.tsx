import React from "react";
import styled from "styled-components";
import OptionSelector from "./OptionSelector";
import ChatBoxBackgroundImage from "../../Resources/Images/game_chat_box.png";
import { MEET_STEP_OPTION, MEET_STEP_REACTION } from "../../Constant";
import ScriptParser from "../../Utils/ScriptParser";
import { useRecoilValue } from "recoil";
import { gameSceneSelector } from "../../Constant/selectors";

const Container = styled.div`
  position: absolute;
  left: 10%;
  bottom: 30px;
  width: 80%;
`;
const ChatBoxImage = styled.img`
  width: 100%;
`;
const Contents = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 3% 10%;
`;
const NameText = styled.span`
  font-weight: bolder;
  font-size: 3vw;
  margin-bottom: 10px;
  color: #662d91;
`;
const TalkText = styled.span`
  font-size: 2vw;
  margin-left: 10px;
  color: black;
`;

export interface ChatBoxProps {
  selectOption: Function;
}
const ChatBox: React.FC<ChatBoxProps> = ({ selectOption }) => {
  const gameScene = useRecoilValue(gameSceneSelector)

  return (
    <Container>
      <ChatBoxImage src={ChatBoxBackgroundImage}></ChatBoxImage>
      <Contents>
        {gameScene.step !== MEET_STEP_OPTION ? (
          <>
            <NameText
              dangerouslySetInnerHTML={{
                __html: ScriptParser.getText(gameScene.characterName),
              }}
            ></NameText>
            <TalkText
              dangerouslySetInnerHTML={{
                __html: ScriptParser.getText(
                  gameScene?.step === MEET_STEP_REACTION
                    ? gameScene.selectedOption?.reaction ?? ""
                    : gameScene.sceneScript
                ),
              }}
            ></TalkText>
          </>
        ) : (
          <OptionSelector
            options={gameScene.options}
            selectOption={selectOption}
          ></OptionSelector>
        )}
      </Contents>
    </Container>
  );
};

export default ChatBox;
