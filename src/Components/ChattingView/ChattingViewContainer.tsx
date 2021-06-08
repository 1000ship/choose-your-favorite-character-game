import React, { useEffect, useState } from "react"
import { RouteComponentProps, withRouter } from "react-router"
import { useRecoilState, useRecoilValue } from "recoil"
import { gameOverAtom } from "../../Constant/atoms"
import { gameConfigSelector, gameSceneSelector } from "../../Constant/selectors"
import { Chat } from "../../Constant/types"
import ChattingViewPresenter from "./ChattingViewPresenter"

const ChattingViewContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const gameConfig = useRecoilValue(gameConfigSelector)
  const [gameScene, setGameScene] = useRecoilState(gameSceneSelector)
  const [chatList, setChatList] = useState<Chat[]>([])
  const isGameOver = useRecoilValue(gameOverAtom)

  const selectOption = (optionIndex: number) => {
    if (isGameOver) return

    const { answer, reaction, nextId } = gameScene.options[optionIndex]

    // 채팅 렌더링
    setChatList((chatList) => {
      const result = [...chatList]
      if (answer?.length) result.push({ who: "right", message: answer })
      if (reaction?.length) result.push({ who: "left", message: reaction })
      return result
    })

    // 게임 씬 이동
    const nextScene = gameConfig.scenes?.find((scene) => scene.sceneId === nextId)
    if (!nextScene) throw new Error("nextScene is not present")
    setGameScene((gameScene) => ({ ...gameScene, ...nextScene }))
  }

  useEffect(() => {
    setChatList((chatList) => (gameScene.sceneScript?.length ? [...chatList, { who: "left", message: gameScene.sceneScript, isEnding: gameScene.sceneType === "ending" }] : chatList))
    if (gameScene.options.length === 0) {
      const nextScene = gameConfig?.scenes?.find((each) => each.sceneId === gameScene.nextSceneId)
      if (nextScene) setGameScene(nextScene)
    }
  }, [gameScene.sceneScript])

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight })
  }, [chatList])

  const onLogoClick = (e: React.MouseEvent) => {
    if (isGameOver) return
    history.push("/")
  }

  return <ChattingViewPresenter chatList={chatList} selectOption={selectOption} onLogoClick={onLogoClick}></ChattingViewPresenter>
}

export default withRouter(ChattingViewContainer)
