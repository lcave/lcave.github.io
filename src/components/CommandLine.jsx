import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  executeCommand,
  getCommandHistory,
} from "../interpreter/commandInterpreter";
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

  useEffect(() => {
    setCommandHistory(getCommandHistory());
  }, []);

  const handleInputChange = (e) => {
    setInputString(e);
  };

  const handleCommandExecution = (commandString) => {
    setCommandHistory(executeCommand(commandString));
    setInputString("");
  };

  return (
    <CLBorder>
      <Input
        inputValue={inputString}
        changeInputValueCallback={handleInputChange}
        executeCommandCallback={handleCommandExecution}
      />
      <CurrentInput inputString={inputString} />
      <CommandHistory commandHistory={commandHistory} />
    </CLBorder>
  );
}
