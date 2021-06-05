import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { gameSceneSelector } from "../../Constant/selectors"
import ChatBox from "./ChatBox"

const Container = styled.div``

const BackgroundImage = styled.div<{ imageSrc: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url("${({ imageSrc }) => imageSrc}");
  background-position: center;
  background-size: cover;
`

const CharacterImage = styled.div<{ imageSrc: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: url("${({ imageSrc }) => imageSrc}");
  background-position: bottom;
  background-size: contain;
  background-repeat: no-repeat;
  transform-origin: bottom center;
  transform: scale(1.1);
`

export interface MeetViewPresenterProps {
  stepFromScript: React.MouseEventHandler
  stepFromReaction: React.MouseEventHandler
  selectOption: Function
}
const MeetViewPresenter: React.FC<MeetViewPresenterProps> = ({ stepFromScript, stepFromReaction, selectOption }) => {
  const gameScene = useRecoilValue(gameSceneSelector)
  const [state, setState] = useState({
    backgroundImagePath: "",
    characterImagePath: "",
  })

  useEffect(() => {
    if (gameScene.characterImagePath && gameScene.characterImagePath.length > 0) {
      const imgTag = document.createElement("img")
      imgTag.src = gameScene.characterImagePath as string
      imgTag.onload = (e) => setState((state) => ({ ...state, characterImagePath: gameScene?.characterImagePath ?? "" }))
    } else {
      setState((state) => ({ ...state, characterImagePath: "" }))
    }
  }, [gameScene.characterImagePath])

  useEffect(() => {
    if (gameScene.backgroundImagePath && gameScene.backgroundImagePath.length > 0) {
      const imgTag = document.createElement("img")
      imgTag.src = gameScene.backgroundImagePath as string
      imgTag.onload = (e) => setState((state) => ({ ...state, backgroundImagePath: gameScene?.backgroundImagePath ?? "" }))
    } else {
      setState((state) => ({ ...state, backgroundImagePath: "" }))
    }
  }, [gameScene.backgroundImagePath])

  return (
    <Container onClick={gameScene.step === "script" ? stepFromScript : gameScene.step === "reaction" ? stepFromReaction : undefined}>
      {state.backgroundImagePath.length && <BackgroundImage imageSrc={state.backgroundImagePath || ""}></BackgroundImage>}
      {state.characterImagePath.length && <CharacterImage imageSrc={state.characterImagePath || ""}></CharacterImage>}
      <ChatBox selectOption={selectOption}></ChatBox>
    </Container>
  )
}

export default MeetViewPresenter
