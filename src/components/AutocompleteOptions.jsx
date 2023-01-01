import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function AutocompleteOptions({ options }) {
  if (options.length > 0) {
    return (
      <Wrapper>
        {options.map((o, i) => (
          <span key={i} style={{ marginRight: "1rem" }}>
            {o}
          </span>
        ))}
      </Wrapper>
    );
  }
  return <></>;
}
