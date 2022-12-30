import React from "react";
import CommandTextRenderer from "./CommandTextRenderer";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Caret = styled.div`
  width: 0.75rem;
  height: auto;
  background: green;
  display: inline;
  &.invisible {
    opacity: 0;
  }
`;

export default function CommandInput({ commandString }) {
  return (
    <Wrapper>
      <CommandTextRenderer commandString={commandString} />
      <Caret />
    </Wrapper>
  );
}
