import React from "react";
import styled from "styled-components";
import { endingCounter } from "../Utils/api";

const Container = styled.div`
  padding: 10px;
`;
const Title = styled.h1`
  font-size: 2em;
  font-weight: 600;
`;
const EndingList = styled.ul`
  padding: 10px;
`;
const EndingItem = styled.li``;

const AdminPage = (props) => {
  const endingObject = endingCounter.getEndingCounter();
  const endingList = [];
  for (let ending in endingObject) {
    endingList.push([ending, parseInt(endingObject[ending])]);
  }
  endingList.sort((left, right) =>
    left[0] > right[0] ? 1 : left[0] < right[0] ? -1 : 0
  );
  console.log(endingList);
  return (
    <Container>
      <Title>Ending Counter</Title>
      <EndingList>
        {endingList.map(([ending, count], i) => (
          <EndingItem key={i}>
            {ending} -> {count}번
          </EndingItem>
        ))}
      </EndingList>
    </Container>
  );
};

export default AdminPage;
