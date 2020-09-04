import React from "react";
import styled from "styled-components";
import CYFCLogoImage from "../../Resources/Images/cyfc_top_logo.png";
import OptionMessage from "./OptionMessage";
import ScriptParser from "../../Utils/ScriptParser";

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
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${AppBarHeight}px;
`;
const DateText = styled.span`
  color: #939393;
  margin: 10px;
`;
const LeftMessage = styled.span`
  align-self: flex-start;
  margin: 5px;
  padding: 15px;
  border-radius: 15px 15px 15px 3px;
  background-image: linear-gradient(#e86ecb, #a21ccb);
  color: white;
  @media (min-width: 768px){
    font-size: 2em;
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
  @media (min-width: 768px){
    font-size: 2em;
  }
`;

const ChattingViewPresenter = ({ chatList, scene, selectOption }) => (
  <Container>
    <AppBar>
      <LogoImage src={CYFCLogoImage} alt="CYFC"></LogoImage>
    </AppBar>
    <Contents>
      <DateText>오늘</DateText>
      {chatList.map(({ who, message }, i) =>
        who === "left" ? (
          <LeftMessage
            key={i}
            dangerouslySetInnerHTML={{ __html: ScriptParser.getText(message) }}
          ></LeftMessage>
        ) : (
          <RightMessage
            key={i}
            dangerouslySetInnerHTML={{ __html: ScriptParser.getText(message, true) }}
          ></RightMessage>
        )
      )}
      {scene.options?.length > 0 && scene.sceneType !== "ending" && (
        <OptionMessage
          options={scene.options}
          selectOption={selectOption}
        ></OptionMessage>
      )}
    </Contents>
  </Container>
);

export default ChattingViewPresenter;
