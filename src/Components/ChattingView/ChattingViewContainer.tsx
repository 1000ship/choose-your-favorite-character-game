import React, { useEffect, useState } from "react"
import { RouteComponentProps, withRouter } from "react-router"
import { useRecoilState, useRecoilValue } from "recoil"
import { gameOverAtom } from "../../Constant/atoms"
import { gameConfigSelector, gameSceneSelector } from "../../Constant/selectors"
import { Chat } from "../../Constant/types"
import { sleep } from "../../Utils/api"
import ChattingViewPresenter from "./ChattingViewPresenter"

const ChattingViewContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const gameConfig = useRecoilValue(gameConfigSelector)
  const [gameScene, setGameScene] = useRecoilState(gameSceneSelector)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [selectable, setSelectable] = useState<boolean>(true)
  const isGameOver = useRecoilValue(gameOverAtom)

  const selectOption = async (optionIndex: number) => {
    if (isGameOver) return

    const { answer, reaction, nextId } = gameScene.options[optionIndex]

    // 다음 선택지 설정까지 선택지 숨기기
    setSelectable(false)

    // 선택지 출력
    setChatList((chatList) => {
      const result = [...chatList]
      if (answer?.length) result.push({ who: "right", message: answer })
      return result
    })
    // 대기 후 응답 출력
    await sleep(1000)
    setChatList((chatList) => {
      const result = [...chatList]
      if (reaction?.length) result.push({ who: "left", message: reaction })
      return result
    })

    // 다음 씬 찾기
    const nextScene = gameConfig.scenes?.find((scene) => scene.sceneId === nextId)
    if (!nextScene) throw new Error("nextScene is not present")

    // 대기 후 게임 씬 이동
    const sleepTime = nextScene.sceneType === "text" ? 1000 : 4000
    await sleep(sleepTime)
    setGameScene((gameScene) => ({ ...gameScene, ...nextScene }))
  }

  useEffect(() => {
    if (gameConfig.sceneType !== "text") return
    setChatList((chatList) => {
      // 채팅 중복 방지 임시처리
      return gameScene.sceneScript?.length > 0 && !chatList.find((chat) => chat.message === gameScene.sceneScript)
        ? [...chatList, { who: "left", message: gameScene.sceneScript, isEnding: gameScene.sceneType === "ending" }]
        : chatList
    })
    const nextScene = gameConfig?.scenes?.find((each) => each.sceneId === gameScene.nextSceneId)

    if (gameScene.options.length === 0) {
      // 선택지가 없는 경우, 자동 씬 재생
      if (nextScene) {
        const sleepTime = nextScene?.sceneType === "text" ? 1500 : 4000
        sleep(sleepTime).then(() => {
          setGameScene(nextScene)
        })
      }
    } else {
      // 선택지가 있다면, 선택가능하게 설정
      setSelectable(true)
    }
  }, [gameScene, gameConfig.scenes, setGameScene])

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight })
  }, [chatList])

  const onLogoClick = (e: React.MouseEvent) => {
    if (isGameOver) return
    history.push("/")
  }

  return <ChattingViewPresenter chatList={chatList} selectOption={selectOption} onLogoClick={onLogoClick} selectable={selectable}></ChattingViewPresenter>
}

export default withRouter(ChattingViewContainer)
