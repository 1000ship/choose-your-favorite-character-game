import React, { useMemo, useState } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import styled from "styled-components"
import OptionMessage from "../Components/ChattingView/OptionMessage"
import { userConfigSelector } from "../Constant/selectors"
import CYFCLogoImage from "../Resources/Images/cyfc_top_logo.png"
import useScriptParser from "../Utils/useScriptParser"

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
  overflow: hidden;
`
const LeftMessage = styled.span`
  align-self: flex-start;
  margin: 5px;
  padding: 15px;
  border-radius: 15px 15px 15px 3px;
  background-image: linear-gradient(#e86ecb, #a21ccb);
  color: white;
  @media (min-width: 768px) {
    font-size: 2em;
  }
  position: relative;
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
  @media (min-width: 768px) {
    font-size: 2em;
  }
  position: relative;
  animation-duration: 1s;
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

/*
당신의 이름은?
당신의 성별은?
당신의 성지향성은? -- 헤테로 / 게이 / 레즈비언 / 바이섹슈얼
당신의 직업은? -- 학생 / 유학생 / 취준생 / 직장인 / (직접 입력)
당신의 사진을 찍어주세요
*/

const PreGamePage: React.FC<RouteComponentProps> = (props) => {
  const [userConfig, setUserConfig] = useRecoilState(userConfigSelector)
  const { history } = props
  const scriptParser = useScriptParser()

  console.log(userConfig)
  const sameGenderLabel = useMemo(() => {
    return userConfig.gender === "male" ? "게이" : "레즈비언"
  }, [userConfig.gender])
  let qna = [
    { question: "당신의 이름은?", options: [{ answer: "나의 이름은 {input:name}" }] },
    {
      question: "당신의 성별은?",
      options: [
        { answer: "남자", key: "gender", value: "male" },
        { answer: "여자", key: "gender", value: "female" },
      ],
    },
    {
      question: "당신의 성지향성은?",
      options: [
        { answer: "헤테로", key: "sexualOrientation", value: "opposite" },
        { answer: sameGenderLabel, key: "sexualOrientation", value: "same" },
        { answer: "바이섹슈얼", key: "sexualOrientation", value: "both" },
      ],
    },
    {
      question: "당신의 직업은?",
      options: [
        { answer: "학생", key: "job", value: "student" },
        { answer: "유학생", key: "job", value: "international" },
        { answer: "취준생", key: "job", value: "yet" },
        { answer: "직장인", key: "job", value: "officer" },
        { answer: "{input:job}" },
      ],
    },
    { question: "당신의 사진을 찍어주세요.", options: [{ answer: "📷", camera: true }] },
  ]

  const [state, setState] = useState({
    chatList: [
      {
        who: "left",
        message: qna[0].question,
      },
    ],
    options: qna[0].options,
    step: 0 as number,
  })

  const selectOption = (i: number, inputData: any = {}) => {
    for (let key in inputData) setUserConfig((userConfig) => ({ ...userConfig, [key]: inputData[key] }))
    const selectedOption = state.options[i]
    if (["key", "value"].every((each) => each in selectedOption)) {
      const { key, value } = selectedOption as any
      setUserConfig((userConfig) => ({ ...userConfig, [key]: value }))
    } else if ("camera" in selectedOption) {
      // 카메라
      if (!!navigator?.getUserMedia) history.push(`/camera`)
      else {
        ;(document.getElementById("camera") as HTMLInputElement).click()
        history.push("/choice")
      }
    }
    setState((state) => ({
      ...state,
      chatList: [...state.chatList, { who: "right", message: `${state.options[i].answer}` }, { who: "left", message: `${qna[state.step + 1].question}` }],
      options: qna[state.step + 1].options,
      step: state.step + 1,
    }))
  }

  const onLogoClick = (e: React.MouseEvent) => history.push("/")

  const { chatList, options } = state
  return (
    <Container>
      <input hidden type="file" id="camera" name="camera" capture="camera" accept="image/*" />
      <AppBar>
        <LogoImage src={CYFCLogoImage} alt="CYFC" onClick={onLogoClick}></LogoImage>
      </AppBar>
      <Contents>
        {chatList.map(({ who, message }, i) =>
          who === "left" ? (
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
        {options?.length > 0 && <OptionMessage options={options} selectOption={selectOption}></OptionMessage>}
      </Contents>
    </Container>
  )
}

export default withRouter(PreGamePage)
