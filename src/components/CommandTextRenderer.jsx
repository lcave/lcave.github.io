import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { pwd } from "../cli/navigator";

const Command = styled.div`
  height: 1.8rem;
`;

export default function CommandTextRenderer({ commandString }) {
  const context = pwd();
  return (
    <Command>
      {context}
      &nbsp;
      <FontAwesomeIcon icon={faChevronRight} fontSize="80%" />
      &nbsp;
      {commandString}
    </Command>
  );
}
