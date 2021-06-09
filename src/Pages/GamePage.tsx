import React, { useEffect, useState } from "react"
import { RouteComponentProps, withRouter } from "react-router"
import { useRecoilState, useResetRecoilState } from "recoil"
import ChattingView from "../Components/ChattingView"
import GameOverModal from "../Components/GameOverModal"
import MeetView from "../Components/MeetView"
import { BGM_MAIN } from "../Constant"
import { gameOverAtom } from "../Constant/atoms"
import { gameConfigSelector, gameSceneSelector } from "../Constant/selectors"
import BGMPlayer from "../Utils/BGMPlayer"
import { useBGM, useSound } from "../Utils/Hook"

const GamePage: React.FC<RouteComponentProps> = (props) => {
  const { history } = props
  const [gameConfig, setGameConfig] = useRecoilState(gameConfigSelector)
  const [isGameOver, setGameOver] = useRecoilState(gameOverAtom)
  const [gameScene, setGameScene] = useRecoilState(gameSceneSelector)
  const resetGameConfig = useResetRecoilState(gameConfigSelector)
  const resetGameScene = useResetRecoilState(gameSceneSelector)
  const [layoutConfig, setLayoutConfig] = useState({
    viewType: "text" as "text" | "meet",
  })

  useBGM()
  useSound()
  useEffect(() => {
    const initScene = gameConfig?.scenes?.length ? gameConfig.scenes[0] : null
    if (initScene) {
      setGameScene((gameScene) => ({ ...gameScene, ...initScene }))
    }
  }, [gameConfig, setGameScene])

  useEffect(() => {
    if (gameScene.sceneType === "text") {
      setLayoutConfig((layoutConfig) => ({ ...layoutConfig, viewType: "text" }))
    } else if (gameScene.sceneType === "meet") {
      setLayoutConfig((layoutConfig) => ({ ...layoutConfig, viewType: "meet" }))
    } else if (gameScene.sceneType === "ending") {
      setGameOver(true)
    }
  }, [gameScene.sceneType, setLayoutConfig, setGameConfig, setGameOver])

  const resetGame = () => {
    resetGameConfig()
    resetGameScene()
    setGameOver(false)
    if (!gameConfig?.characterName) {
      history.push("/")
    } else {
      history.push(`/video/${gameConfig?.characterName}`)
      BGMPlayer.pause()
    }
  }

  const exitGame = () => {
    resetGameConfig()
    resetGameScene()
    setGameOver(false)
    history.push("/choice")
    BGMPlayer.play(BGM_MAIN)
  }

  return (
    <>
      {layoutConfig.viewType === "text" ? <ChattingView /> : layoutConfig.viewType === "meet" ? <MeetView /> : null}
      <GameOverModal isOpened={isGameOver ?? false} resetGame={resetGame} exitGame={exitGame} />
    </>
  )
}

export default withRouter(GamePage)
