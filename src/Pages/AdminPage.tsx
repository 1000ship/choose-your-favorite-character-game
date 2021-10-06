import React from 'react';
import styled from 'styled-components';

import { endingCounter } from '../Utils/api';

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
const ResetButton = styled.button``;

const AdminPage = () => {
  const endingObject = endingCounter.getEndingCounter();
  const endingList = [];
  for (const ending in endingObject) {
    endingList.push([ending, parseInt(endingObject[ending])]);
  }
  endingList.sort((left, right) =>
    left[0] > right[0] ? 1 : left[0] < right[0] ? -1 : 0,
  );

  const onResetClick = (e: React.MouseEvent) => {
    if (!window.confirm('정말로 기록들을 삭제하겠습니까?')) return;
    endingCounter.resetEndingCounter();
    alert('삭제했습니다.');
    window.location.reload();
  };

  return (
    <Container>
      <Title>Ending Counter</Title>
      <EndingList>
        {endingList.map(([ending, count], i) => (
          <EndingItem key={i}>
            {ending}
            {' -> '}
            {count}번
          </EndingItem>
        ))}
      </EndingList>
      <ResetButton onClick={onResetClick}>Reset</ResetButton>
    </Container>
  );
};

export default AdminPage;
