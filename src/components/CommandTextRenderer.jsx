import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Command = styled.div`
  font-family: monospace;
  font-size: 1.5rem;
  height: 1.8rem;
  color: green;
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

const Wrapper = styled.div`
  display: flex;
`;

export default function CommandTextRenderer({
  commandString,
  showCaret = false,
}) {
  return (
    <Wrapper>
      <Command>{commandString}</Command>
      {showCaret && <Caret />}
    </Wrapper>
  );
}
