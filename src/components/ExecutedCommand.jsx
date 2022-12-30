import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CommandCanvas from "./CommandCanvas";

const Result = styled.div`
  padding-left: 10px;
`;

export default function ExecutedCommand({ commandString, result }) {
  const liRef = useRef(null);

  useEffect(() => {
    liRef.current.querySelector(".result").innerHTML = result;
  }, []);

  return (
    <li ref={liRef}>
      <CommandCanvas commandString={commandString} />
      <Result className="result" />
    </li>
  );
}
