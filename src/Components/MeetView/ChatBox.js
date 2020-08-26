import React from "react";
import styled from "styled-components";
import ChatBoxBackgroundImage from '../../Resources/Images/game_chat_box.png'

const Container = styled.div`
  position: absolute;
  left: 10%;
  bottom: 30px;
  display: flex;
  justify-content: center;
  width: 80%;
`;
const ChatBoxImage = styled.img`
  width: 100%;
`;
const Contents = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 3% 10%;
`;
const NameText = styled.span`
  font-weight: bolder;
  font-size: 3vw;
  margin-bottom: 10px;
  color: #662d91;
`;
const TalkText = styled.span`
  font-size: 2vw;
  margin-left: 10px;
  color: black;
`;

const ChatBox = (props) => {
  return <Container>
    <ChatBoxImage src={ChatBoxBackgroundImage}></ChatBoxImage>
    <Contents>
      <NameText>Amy</NameText>
      <TalkText>my name is </TalkText>
    </Contents>
  </Container>;
};

export default ChatBox;
