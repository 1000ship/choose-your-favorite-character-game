import React from "react";
import styled from "styled-components";
import ScriptParser from "../../Utils/ScriptParser";

const RightMessage = styled.span`
  align-self: flex-end;
  margin: 15px;
  padding: 12px;
  border: 3px solid #a21ccb;
  border-radius: 15px 15px 3px 15px;
  border-image-slice: 1;
  color: #662d91;
`;

const OptionList = styled.ul``;
const OptionItem = styled.li`
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const OptionMessage = ({
  selectOption,
  options = [{ answer: "ㅎㅇ", reaction: "?", nextId: "" }],
}) => {
  const onOptionClick = (i) => (e) => {
    const specials = ScriptParser.getSpecials(options[i].answer);
    if (specials?.input)
      selectOption(i, { [specials.input]: prompt("입력해주세요") });
    else selectOption(i);
  };

  return (
    <RightMessage>
      <OptionList>
        {options.map((option, i) => (
          <OptionItem
            key={i}
            onClick={onOptionClick(i)}
            dangerouslySetInnerHTML={{
              __html: ScriptParser.getText(option.answer),
            }}
          ></OptionItem>
        ))}
      </OptionList>
    </RightMessage>
  );
};

export default OptionMessage;
