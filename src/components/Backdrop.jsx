import React from "react";
import styled from "styled-components";

const Background = styled.div`
  background-color: black;
  height: 100vh;
  padding: 5% 5%;
`;

export default function Backdrop({ children }) {
  return <Background>{children}</Background>;
}
