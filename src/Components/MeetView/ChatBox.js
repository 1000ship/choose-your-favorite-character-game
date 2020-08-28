import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatBoxBackgroundImage from "../../Resources/Images/game_chat_box.png";
import OptionSelector from "./OptionSelector";

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

export const CHAT_STEP_SCRIPT = "script";
export const CHAT_STEP_OPTION = "option";
export const CHAT_STEP_REACTION = "reaction";

const ChatBox = ({ scriptInterpreter }) => {
  const {
    characterName = "",
    sceneScript = "",
    options = "",
  } = scriptInterpreter.currentScene;
  const [chatState, setChatState] = useState({
    step: CHAT_STEP_SCRIPT,
  });

  useEffect(() => {
    function clickEvent(e) {
      if (chatState.step === CHAT_STEP_OPTION) return;
      setChatState((chatState) => {
        const { step, nextId = null } = chatState;
        if (step === CHAT_STEP_SCRIPT) return { step: CHAT_STEP_OPTION };
        else if (step === CHAT_STEP_REACTION) {
          scriptInterpreter.getNextScene(nextId)
          return ({
            step: CHAT_STEP_SCRIPT
          })
        }
        return chatState;
      });
      e.stopPropagation();
    }
    window.addEventListener("click", clickEvent);
  }, []);

  return (
    <Container>
      <ChatBoxImage src={ChatBoxBackgroundImage}></ChatBoxImage>
      <Contents>
        {chatState.step !== CHAT_STEP_OPTION ? (
          <>
            <NameText>{characterName}</NameText>
            <TalkText>
              {chatState.step === CHAT_STEP_REACTION
                ? chatState.reaction
                : sceneScript}
            </TalkText>
          </>
        ) : (
          <OptionSelector
            options={options}
            setChatState={setChatState}
          ></OptionSelector>
        )}
      </Contents>
    </Container>
  );
};

export default ChatBox;
