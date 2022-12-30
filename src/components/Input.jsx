import React from "react";
import styled from "styled-components";

const InputElement = styled.input`
  caret-color: black;
  opacity: 0;
  position: absolute;
`;

export default function Input({ changeInputValueCallback }) {
  const handleKeyPress = (e) => {
    changeInputValueCallback(e.target.value);
  };

  return (
    <InputElement
      autoFocus
      onBlur={(e) => e.currentTarget.focus()}
      onChange={handleKeyPress}
    />
  );
}
