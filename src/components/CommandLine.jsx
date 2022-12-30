import React, { useState } from "react";
import styled from "styled-components";
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

  const handleInputChange = (e) => {
    setInputString(e);
  };

  return (
    <CLBorder>
      <Input changeInputValueCallback={handleInputChange} />
      <CurrentInput inputString={inputString} />
    </CLBorder>
  );
}
