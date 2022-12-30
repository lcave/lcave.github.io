import React, { useState } from "react";
import styled from "styled-components";
import CommandHistory from "./CommandHistory";
import CurrentInput from "./CurrentInput";
import Input from "./Input";

const CLBorder = styled.div`
  border: 3px dashed green;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

export default function CommandLine() {
  const [inputString, setInputString] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);

  const handleInputChange = (e) => {
    setInputString(e);
  };

  const executeCommand = (commandString) => {
    const newHistory = [...commandHistory, commandString];
    setCommandHistory(newHistory);
    setInputString("");
  };

  return (
    <CLBorder>
      <Input
        inputValue={inputString}
        changeInputValueCallback={handleInputChange}
        executeCommandCallback={executeCommand}
      />
      <CurrentInput inputString={inputString} />
      <CommandHistory commandHistory={commandHistory} />
    </CLBorder>
  );
}
