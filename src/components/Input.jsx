import React from "react";
import styled from "styled-components";
import CommandTextRenderer from "./CommandTextRenderer";

const InputElement = styled.input`
  font-size: 1.3rem;
  color: ${(props) => props.theme.mainTextColor};
  caret-color: ${(props) => props.theme.mainTextColor};
  font-family: ${(props) => props.theme.font || "monospace"};
  background: none;
  border: none;
  outline: none;
`;

export default function Input({
  inputValue,
  changeInputValueCallback,
  executeCommandCallback,
  arrowKeyPressCallback,
  tabKeyPressCallback,
}) {
  const handleKeyPress = (e) => {
    changeInputValueCallback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommandCallback(e.target.querySelector("input").value);
  };

  const handleKeyDown = (e) => {
    if (e.key.includes("Arrow")) {
      arrowKeyPressCallback(e.key.replace("Arrow", "").toLowerCase());
    } else if (e.key === "Tab") {
      e.preventDefault();
      tabKeyPressCallback();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CommandTextRenderer>
        <InputElement
          autoFocus
          value={inputValue}
          onBlur={(e) => e.currentTarget.focus()}
          onChange={handleKeyPress}
          onKeyDown={handleKeyDown}
        />
      </CommandTextRenderer>
    </form>
  );
}
