import React from "react";
import styled from "styled-components";
import ScriptParser from "../../Utils/ScriptParser";
import MemoryData from "../../Utils/MemoryData";
import { SceneOption } from "../../Constant/types";

const Container = styled.div``;
const OptionList = styled.ul``;
const OptionItem = styled.li`
  font-size: 36px;
  cursor: pointer;
  font-weight: 400;
  margin: 8px 0px;
  &:hover {
    font-weight: 600;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export interface OptionSelectorProps {
  options: SceneOption[];
  selectOption: Function;
}
const OptionSelector: React.FC<OptionSelectorProps> = ({ options, selectOption }) => {
  const onOptionClicked = (i: number) => (e: React.MouseEvent) => {
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
            dangerouslySetInnerHTML={{ __html: ScriptParser.getText(answer ?? "") }}
          ></OptionItem>
        ))}
      </OptionList>
    </Container>
  );
};

export default OptionSelector;
