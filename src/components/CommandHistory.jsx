import React from "react";
import styled from "styled-components";

const List = styled.ul`
  color: green;
  list-style: none;
`;

export default function CommandHistory({ commandHistory }) {
  return (
    <List>
      {commandHistory.map((c) => (
        <li>{c}</li>
      ))}
    </List>
  );
}
