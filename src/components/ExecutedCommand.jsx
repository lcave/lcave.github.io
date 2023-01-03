import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CommandTextRenderer from "./CommandTextRenderer";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Result = styled.div`
  padding-left: 10px;
  & .markdown-file {
    & h2,
    h3,
    h4,
    h5,
    h5,
    h6 {
      margin-bottom: 0rem;
    }
    a {
      color: ${(props) => props.theme.linkTextColor};
    }
    & h1 {
      border-bottom: 3px solid ${(props) => props.theme.borderColor};
      margin-bottom: 0rem;
      display: inline-block;
    }
    & .secondary-text {
      color: ${(props) => props.theme.secondaryTextColor};
    }
    & .block-quote {
      display: block;
      margin-left: 1.5rem;
      padding-left: 1rem;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      border-left: 3px solid ${(props) => props.theme.borderColor};
    }
  }
`;

export default function ExecutedCommand({ commandString, result }) {
  const liRef = useRef(null);
  useEffect(() => {
    liRef.current.querySelector(".result").innerHTML = result;
  }, [result]);

  return (
    <li ref={liRef}>
      <CommandTextRenderer>{commandString}</CommandTextRenderer>

      <Result className="result" />
      <FontAwesomeIcon icon={faCaretRight} fontSize="80%" />
    </li>
  );
}
