import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import CYFCLogoImage from "../Resources/Images/cyfc_top_logo.png";
import OptionMessage from "../Components/ChattingView/OptionMessage";
import ScriptParser from "../Utils/ScriptParser";
import MemoryData from "../Utils/MemoryData";

const AppBarHeight = 80;

const Container = styled.div``;

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
`;
const LogoImage = styled.img`
  height: 80%;
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${AppBarHeight}px;
  overflow: hidden;
`;
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
`;
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
`;

const PreGamePage = (props) => {
  const { history } = props;

  let question = [
    "당신의 이름은?",
    "당신의 성별은?",
    "당신의 직업은?",
    "당신의 사진을 찍어주세요.",
  ];
  let optionList = [
    [{ answer: "나의 이름은 {input:name}" }],
    [{ answer: "남자" }, { answer: "여자" }],
    [
      { answer: "직장인" },
      { answer: "대학생" },
      { answer: "취준생" },
      { answer: "유학생" },
    ],
    [{ answer: "📷" }],
  ];
  const [state, setState] = useState({
    chatList: [
      {
        who: "left",
        message: question[0],
      },
    ],
    options: optionList[0],
    step: 0,
  });

  const selectOption = (i, inputData = {}) => {
    for (let key in inputData) MemoryData.setData(key, inputData[key]);
    if (state.step === 1) {
      // 성별
      MemoryData.setData("gender", i === 0 ? "male" : "female");
    } else if (state.step === 3) {
      // 카메라

      if (navigator?.getUserMedia) {
        history.push(`/camera`);
      } else {
        document.getElementById("camera").click();
        history.push("/choice");
      }
    }
    setState((state) => ({
      ...state,
      chatList: [
        ...state.chatList,
        { who: "right", message: `${state.options[i].answer}` },
        { who: "left", message: `${question[state.step + 1]}` },
      ],
      options: optionList[state.step + 1],
      step: state.step + 1,
    }));
  };

  const onLogoClick = (e) => {
    history.push("/");
  };

  const { chatList, options } = state;
  return (
    <Container>
      <input
        hidden
        type="file"
        id="camera"
        name="camera"
        capture="camera"
        accept="image/*"
      />
      <AppBar>
        <LogoImage
          src={CYFCLogoImage}
          alt="CYFC"
          onClick={onLogoClick}
        ></LogoImage>
      </AppBar>
      <Contents>
        {chatList.map(({ who, message }, i) =>
          who === "left" ? (
            <LeftMessage
              key={i}
              dangerouslySetInnerHTML={{
                __html: ScriptParser.getText(message),
              }}
            ></LeftMessage>
          ) : (
            <RightMessage
              key={i}
              dangerouslySetInnerHTML={{
                __html: ScriptParser.getText(message, true),
              }}
            ></RightMessage>
          )
        )}
        {options?.length > 0 && (
          <OptionMessage
            options={options}
            selectOption={selectOption}
          ></OptionMessage>
        )}
      </Contents>
    </Container>
  );
};

export default withRouter(PreGamePage);
