import React from "react";
import styled from "styled-components";
import { CHAT_STEP_REACTION } from "./ChatBox";

const Container = styled.div``;
const OptionList = styled.ul``;
const OptionItem = styled.li`
  font-size: 2.2vw;
  cursor: pointer;
  font-weight: 400;
  margin-bottom: 0.5vw;
  &:hover {
    font-weight: 600;
  }
`;

const OptionSelector = ({ options, setChatState }) => {
  const onOptionClicked = (reaction, nextId) => (e) => {
    e.stopPropagation()
    setChatState({ step: CHAT_STEP_REACTION, reaction, nextId });
  };
  return (
    <Container>
      <OptionList>
        {options.map(({ answer, reaction, nextId }, i) => (
          <OptionItem key={i} onClick={onOptionClicked(reaction, nextId)}>
            {answer}
          </OptionItem>
        ))}
      </OptionList>
    </Container>
  );
};

export default OptionSelector;
