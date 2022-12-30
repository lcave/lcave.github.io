import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { executeCommand, getCommandHistory } from "../cli/commandInterpreter";
import CommandHistory from "./CommandHistory";
import Input from "./Input";
import CommandInput from "./CommandInput";

const CLBorder = styled.div`
  border: 3px dashed green;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  padding: 5px 5px;
  overflow-y: scroll;
`;

const MachineName = styled.div`
  top: -0.9rem;
  left: 1.5rem;
  position: relative;
  max-height: 0;
  overflow: visible;
  span {
    padding: 0 5px;
    background-color: black;
  }
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
    executeCommand(commandString).then((history) => setCommandHistory(history));
    setInputString("");
  };

  return (
    <>
      <MachineName>
        <span>portfolio@Luca-Cave</span>
      </MachineName>
      <CLBorder>
        <Input
          inputValue={inputString}
          changeInputValueCallback={handleInputChange}
          executeCommandCallback={handleCommandExecution}
        />
        <CommandInput commandString={inputString} />
        <CommandHistory commandHistory={commandHistory} />
      </CLBorder>
    </>
  );
}
