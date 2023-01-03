import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { pwd } from "../cli/navigator";

const Command = styled.div`
  white-space: break-spaces;
  overflow-wrap: break-word;
  width: 100%;
`;

const Context = styled.span`
  white-space: nowrap;
`;

export default function CommandTextRenderer({ children }) {
  const context = pwd();
  return (
    <Command>
      <Context>
        {context}
        &nbsp;
        <FontAwesomeIcon icon={faChevronRight} fontSize="80%" />
        &nbsp;
      </Context>
      {children}
    </Command>
  );
}
