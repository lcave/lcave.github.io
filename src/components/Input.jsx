import React from "react";
import styled from "styled-components";

const InputElement = styled.input`
  caret-color: black;
  opacity: 0;
  position: absolute;
`;

export default function Input({
  inputValue,
  changeInputValueCallback,
  executeCommandCallback,
  arrowKeyPressCallback,
}) {
  const handleKeyPress = (e) => {
    changeInputValueCallback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommandCallback(e.target.querySelector("input").value);
  };

  const handleKeyDown = (e) => {
    if (!e.key.includes("Arrow")) return;
    arrowKeyPressCallback(e.key.replace("Arrow", "").toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputElement
        autoFocus
        value={inputValue}
        onBlur={(e) => e.currentTarget.focus()}
        onChange={handleKeyPress}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}
