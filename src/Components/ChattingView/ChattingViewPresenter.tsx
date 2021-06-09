import React, { useCallback } from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { gameOverAtom } from "../../Constant/atoms"
import { gameSceneSelector } from "../../Constant/selectors"
import { Chat } from "../../Constant/types"
import CYFCLogoImage from "../../Resources/Images/cyfc_top_logo.png"
import useScriptParser from "../../Utils/useScriptParser"
import OptionMessage from "./OptionMessage"

const AppBarHeight = 80

const Container = styled.div``

const AppBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${AppBarHeight}px;
  border-bottom: 2px solid #bcbcbc;
  background-color: white;
`
const LogoImage = styled.img`
  height: 80%;
  cursor: pointer;
`

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${AppBarHeight}px;
  overflow-x: hidden;
  overflow-y: scroll;
`
const DateText = styled.span`
  color: #939393;
  margin: 10px;
`
const LeftMessage = styled.span`
  align-self: flex-start;
  margin: 5px;
  padding: 15px;
  border-radius: 15px 15px 15px 3px;
  background-image: linear-gradient(#e86ecb, #a21ccb);
  color: white;
  @media (min-width: 1024px) {
    font-size: 2em;
  }

  animation-duration: 1s;
  animation-name: slide-right;
  @keyframes slide-right {
    from {
      transform: translate(-150%, 0);
    }
    to {
      transform: translate(0, 0);
    }
  }
`
const RightMessage = styled.span`
  align-self: flex-end;
  margin: 5px;
  padding: 12px;
  border: 3px solid #a21ccb;
  border-radius: 15px 15px 3px 15px;
  border-image-slice: 1;
  color: #662d91;
  @media (min-width: 1024px) {
    font-size: 2em;
  }

  animation-duration: 0.5s;
  animation-name: slide-left;
  @keyframes slide-left {
    from {
      transform: translate(150%, 0);
    }
    to {
      transform: translate(0, 0);
    }
  }
`

const EndingMessage = styled.span`
  align-self: flex-end;
  margin: 5px;
  padding: 12px;
  border: 3px solid #662d91;
  border-radius: 40px 40px 10px 40px;
  border-image-slice: 1;
  color: #662d91;
  width: calc(100% - 44px);
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1024px) {
    font-size: 2em;
  }
`

export interface ChattingViewPresenterProps {
  chatList: Chat[]
  selectOption: Function
  onLogoClick: React.MouseEventHandler<HTMLElement>
}
const ChattingViewPresenter: React.FC<ChattingViewPresenterProps> = ({ chatList, selectOption, onLogoClick }) => {
  const gameScene = useRecoilValue(gameSceneSelector)
  const isGameOver = useRecoilValue(gameOverAtom)
  const scriptParser = useScriptParser()

  const messageContentsRef = useCallback((el) => {
    if (el) window.scrollTo(0, window.outerHeight)
  }, [])

  return (
    <Container>
      <AppBar>
        <LogoImage src={CYFCLogoImage} alt="CYFC" onClick={onLogoClick}></LogoImage>
      </AppBar>
      <Contents ref={messageContentsRef}>
        <DateText>오늘</DateText>
        {chatList.map(({ who, message, isEnding }, i) =>
          isEnding ? (
            <EndingMessage
              key={i}
              dangerouslySetInnerHTML={{
                __html: scriptParser.getText(message),
              }}
            ></EndingMessage>
          ) : who === "left" ? (
            <LeftMessage
              key={i}
              dangerouslySetInnerHTML={{
                __html: scriptParser.getText(message),
              }}
            ></LeftMessage>
          ) : (
            <RightMessage
              key={i}
              dangerouslySetInnerHTML={{
                __html: scriptParser.getText(message, true),
              }}
            ></RightMessage>
          ),
        )}
        {(!isGameOver && gameScene.options?.length && gameScene.sceneType !== "ending" && <OptionMessage selectOption={selectOption}></OptionMessage>) || null}
      </Contents>
    </Container>
  )
}

export default ChattingViewPresenter
