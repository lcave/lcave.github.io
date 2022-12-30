import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function FileNodeList({ nodes }) {
  return (
    <Wrapper>
      {nodes.map((n, i) => (
        <span
          key={i}
          style={{ fontWeight: n.type === "directory" ? "bold" : "normal" }}
        >
          {n.name}
          &nbsp; &nbsp;
        </span>
      ))}
    </Wrapper>
  );
}
