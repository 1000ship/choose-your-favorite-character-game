import React from "react";
import styled from 'styled-components';
import PointerImage from '../Resources/Images/pointer.png'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient();
`;
const LogoImage = styled.img`
  width: 30%;
`;

const OpeningPage = () => {

  return <Container>
    <LogoImage src={PointerImage}></LogoImage>
  </Container>
};

export default OpeningPage;
