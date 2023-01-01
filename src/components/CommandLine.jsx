import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { executeCommand, getCommandHistory } from "../cli/commandInterpreter";
import CommandHistory from "./CommandHistory";
import Input from "./Input";
import CommandTextRenderer from "./CommandTextRenderer";
import { autocomplete, getLastCommand } from "../cli/qolHelper";
import AutocompleteOptions from "./AutocompleteOptions";

const CLBorder = styled.div`
  border: 3px dashed green;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  padding: 5px 5px;
  overflow-y: scroll;
  overflow-x: hidden;
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
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  useEffect(() => {
    setCommandHistory(getCommandHistory());
  }, []);

  const handleInputChange = (e) => {
    setInputString(e);
  };

  const handleCommandExecution = (commandString) => {
    executeCommand(commandString).then((history) => setCommandHistory(history));
    setInputString("");
    setAutocompleteOptions([]);
  };

  const handleArrowKeyPress = (direction) => {
    if (["up", "down"].includes(direction)) {
      const command = getLastCommand(direction, inputString, commandHistory);
      setInputString(command);
    }
  };

  const handleRequestToAutocomplete = () => {
    autocomplete(
      inputString,
      autocompleteOptions,
      setInputString,
      setAutocompleteOptions
    );
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
          arrowKeyPressCallback={handleArrowKeyPress}
          tabKeyPressCallback={handleRequestToAutocomplete}
        />
        <AutocompleteOptions options={autocompleteOptions} />
        <CommandTextRenderer commandString={inputString} showCaret />
        <CommandHistory commandHistory={commandHistory} />
      </CLBorder>
    </>
  );
}
