import React from "react";
import styled from "styled-components";
import PointerImage from "../Resources/Images/pointer.png";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
`;

const LogoImage = styled.img`
  width: 30%;
  height: 30%;
  object-fit: contain;
`;

const OpeningPage = ({ history }) => {
  const onClick = (e) => {
    history.push("/choice");
  };
  return (
    <Container onClick={onClick}>
      <LogoImage src={PointerImage}></LogoImage>
    </Container>
  );
};

export default withRouter(OpeningPage);
