import React from "react";
import styled from "styled-components";
import ExecutedCommand from "./ExecutedCommand";

const List = styled.ul`
  color: green;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default function CommandHistory({ commandHistory }) {
  return (
    <List>
      {commandHistory.map((c, index) => (
        <ExecutedCommand
          key={index}
          commandString={c.commandString}
          result={c.result}
        />
      ))}
    </List>
  );
}
