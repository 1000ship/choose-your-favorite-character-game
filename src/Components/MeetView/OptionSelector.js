import React from "react";
import styled from "styled-components";

const Container = styled.div`
`;
const OptionList = styled.ul`
`;
const OptionItem = styled.li`
  font-size: 2.2vw;
  cursor: pointer;
  font-weight: 400;
  margin-bottom: 0.5vw;
  &:hover {
    font-weight: 600;
  }
`;

const OptionSelector = ({ options }) => {
  return (
    <Container>
      <OptionList>
        {options.map(({ answer, reaction, nextId }, i) => (
          <OptionItem key={i}>{answer}</OptionItem>
        ))}
      </OptionList>
    </Container>
  );
};

export default OptionSelector;
