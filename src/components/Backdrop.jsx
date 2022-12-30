import React from "react";
import styled from "styled-components";

const Background = styled.div`
  background-color: black;
  height: 100vh;
  padding: 5% 5%;
  font-size: 1.5rem;
  color: green;
  font-family: monospace;
`;

export default function Backdrop({ children }) {
  return <Background>{children}</Background>;
}
