import React from "react";
import styled from "styled-components";
import OptionSelector from "./OptionSelector";
import ChatBoxBackgroundImage from "../../Resources/Images/game_chat_box.png";
import { MEET_STEP_OPTION, MEET_STEP_REACTION } from "../../Constant";
import ScriptParser from "../../Utils/ScriptParser";
import { MeetData } from "../../Constant/types";

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
  meetData: MeetData;
  selectOption: Function;
}
const ChatBox: React.FC<ChatBoxProps> = ({ meetData, selectOption }) => {
  return (
    <Container>
      <ChatBoxImage src={ChatBoxBackgroundImage}></ChatBoxImage>
      <Contents>
        {meetData.step !== MEET_STEP_OPTION ? (
          <>
            <NameText
              dangerouslySetInnerHTML={{
                __html: ScriptParser.getText(meetData.characterName),
              }}
            ></NameText>
            <TalkText
              dangerouslySetInnerHTML={{
                __html: ScriptParser.getText(
                  meetData.step === MEET_STEP_REACTION
                    ? meetData.options[meetData.optionIndex].reaction
                    : meetData.sceneScript
                ),
              }}
            ></TalkText>
          </>
        ) : (
          <OptionSelector
            options={meetData.options}
            selectOption={selectOption}
          ></OptionSelector>
        )}
      </Contents>
    </Container>
  );
};

export default ChatBox;
