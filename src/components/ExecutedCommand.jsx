import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CommandTextRenderer from "./CommandTextRenderer";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Result = styled.div`
  padding-left: 10px;
`;

export default function ExecutedCommand({ commandString, result }) {
  const liRef = useRef(null);
  useEffect(() => {
    liRef.current.querySelector(".result").innerHTML = result;
  }, [result]);

  return (
    <li ref={liRef}>
      <CommandTextRenderer commandString={commandString} />

      <Result className="result" />
      <FontAwesomeIcon icon={faCaretRight} fontSize="80%" />
    </li>
  );
}
