import React from "react";
import styled from "styled-components";
import { CHAT_STEP_REACTION } from "./ChatBox";
import ScriptParser from "../../Utils/ScriptParser";
import MemoryData from "../../Utils/MemoryData";

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

const OptionSelector = ({ options, selectOption }) => {
  const onOptionClicked = (i) => (e) => {
    const specials = ScriptParser.getSpecials(options[i].answer);
    if (specials?.input) {
      let inputData = prompt("입력해주세요");
      if (!inputData || inputData?.length === 0) {
        return
      }
      MemoryData.setData(specials.input, inputData);
      selectOption(i, { [specials.input]: inputData });
    } else selectOption(i);
    e.stopPropagation();
  };

  return (
    <Container>
      <OptionList>
        {options.map(({ answer }, i) => (
          <OptionItem
            key={i}
            onClick={onOptionClicked(i)}
            dangerouslySetInnerHTML={{ __html: ScriptParser.getText(answer) }}
          ></OptionItem>
        ))}
      </OptionList>
    </Container>
  );
};

export default OptionSelector;
