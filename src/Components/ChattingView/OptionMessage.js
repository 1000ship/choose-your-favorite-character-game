import React from "react";
import styled from "styled-components";
import ScriptParser from "../../Utils/ScriptParser";
import MemoryData from "../../Utils/MemoryData";

const RightMessage = styled.span`
  align-self: flex-end;
  margin: 15px;
  padding: 12px;
  border: 3px solid #a21ccb;
  border-radius: 15px 15px 3px 15px;
  border-image-slice: 1;
  color: #662d91;
  @media (min-width: 768px){
    font-size: 2em;
  }

  animation-duration: 2s;
  animation-name: slide-left;
  @keyframes slide-left {
    from {
      transform: translate(150%, 0);
    }
    50% {
      transform: translate(150%, 0);
    }
    to {
      transform: translate(0, 0);
    }
  }
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
    {
      let inputData = prompt("입력해주세요")
      if (!inputData || inputData?.length === 0) {
        return
      }
      MemoryData.setData(specials.input, inputData)
      selectOption(i, { [specials.input]: inputData });
    }
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
