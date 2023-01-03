import React from "react";
import styled from "styled-components";

const Background = styled.div`
  background: ${(props) => props.theme.backgroundColor};
  height: 100vh;
  padding: 5% 5%;
  font-size: 1.3rem;
  color: ${(props) => props.theme.mainTextColor};
  font-family: ${(props) => props.theme.font || "monospace"};
`;

export default function Backdrop({ children }) {
  return <Background>{children}</Background>;
}
