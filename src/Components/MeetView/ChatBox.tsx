import React from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { MEET_STEP_OPTION, MEET_STEP_REACTION } from "../../Constant"
import { gameSceneSelector } from "../../Constant/selectors"
import useScriptParser from "../../Utils/useScriptParser"
import OptionSelector from "./OptionSelector"

const Container = styled.div`
  position: absolute;
  left: 10%;
  bottom: 30px;
  width: 80%;
  @media (max-width: 1024px) {
    left: 0;
    bottom: 0;
    width: 100%;
  }
`
const Contents = styled.div`
  border: 3px solid #a21ccb;
  border-radius: 32px;
  border-image-slice: 1;
  color: #662d91;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 16px 24px;

  display: flex;
  flex-direction: column;
  margin: 3% 10%;
  @media (max-width: 1024px) {
    margin: 3% 6px;
  }
`
const NameText = styled.span`
  font-weight: bolder;
  font-size: 44px;
  margin-bottom: 20px;
  color: #662d91;
  @media (max-width: 1024px) {
    margin-bottom: 10px;
    font-size: 24px;
  }
`
const TalkText = styled.span`
  font-size: 36px;
  margin-left: 10px;
  color: black;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
`

export interface ChatBoxProps {
  selectOption: Function
}
const ChatBox: React.FC<ChatBoxProps> = ({ selectOption }) => {
  const gameScene = useRecoilValue(gameSceneSelector)
  const scriptParser = useScriptParser()

  return (
    <Container>
      {/* <ChatBoxImage src={ChatBoxBackgroundImage}></ChatBoxImage> */}
      <Contents>
        {gameScene.step !== MEET_STEP_OPTION ? (
          <>
            {gameScene.characterName?.length > 0 && (
              <NameText
                dangerouslySetInnerHTML={{
                  __html: scriptParser.getText(gameScene.characterName),
                }}
              ></NameText>
            )}
            <TalkText
              dangerouslySetInnerHTML={{
                __html: scriptParser.getText(gameScene?.step === MEET_STEP_REACTION ? gameScene.selectedOption?.reaction ?? "" : gameScene.sceneScript),
              }}
            ></TalkText>
          </>
        ) : (
          <OptionSelector options={gameScene.options} selectOption={selectOption}></OptionSelector>
        )}
      </Contents>
    </Container>
  )
}

export default ChatBox
