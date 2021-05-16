import React from "react"
import styled from "styled-components"
import { RouteComponentProps, withRouter } from "react-router-dom"
import BackButtonResource from "../Resources/Images/statement_back.png"
import SkipButtonResource from "../Resources/Images/video_skip.png"
import { BGM_AMY, BGM_BELLA, BGM_CLAIR, BGM_MAIN } from "../Constant"
import BGMPlayer from "../Utils/BGMPlayer"
import SoundPlayer from "../Utils/SoundPlayer"
import { useSetRecoilState } from "recoil"
import { gameConfigAtom } from "../Constant/atoms"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
  display: flex;
  justify-content: center;
`

const VideoView = styled.video`
  height: 100%;
`

const BackButton = styled.img`
  position: absolute;
  left: 5vw;
  top: 5vh;
  width: 20vw;
  cursor: pointer;
  z-index: 1;
`
const SkipButton = styled.img`
  position: absolute;
  right: 5vw;
  bottom: 5vh;
  width: 20vw;
  cursor: pointer;
  z-index: 1;
`

const VideoPage: React.FC<RouteComponentProps> = (props) => {
  const {
    history,
    location: { pathname },
  } = props
  const characterName = pathname.replace("/video/", "")
  const setGameConfig = useSetRecoilState(gameConfigAtom)

  const onBackClick = (e: React.MouseEvent) => {
    history.push("/choice")
    BGMPlayer.play(BGM_MAIN)
  }

  const onSkipClick = (e: React.MouseEvent) => {
    let bgmFile
    switch (characterName) {
      case "amy":
        bgmFile = BGM_AMY
        break
      case "bella":
        bgmFile = BGM_BELLA
        break
      case "clair":
        bgmFile = BGM_CLAIR
        break
    }
    setGameConfig((gameConfig) => ({ ...gameConfig, characterName }))
    if (bgmFile) BGMPlayer.play(bgmFile)
    SoundPlayer.play_old("Amy", "iphone sound.mp3")
    history.push(`/game/${characterName}`)
  }

  return (
    <Container>
      <BackButton onClick={onBackClick} src={BackButtonResource}></BackButton>
      <SkipButton onClick={onSkipClick} src={SkipButtonResource}></SkipButton>
      <VideoView autoPlay controls>
        <source src={`./res/videos/${characterName}.mov`} type="video/mp4" />
      </VideoView>
    </Container>
  )
}

export default withRouter(VideoPage)
