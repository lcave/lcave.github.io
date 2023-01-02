import React, { createElement } from "react";
import { renderToString } from "react-dom/server";
import styled from "styled-components";
import MarkdownRenderer from "./MarkdownRenderer";

const MarkdownFile = styled.div`
  & h2,
  h3,
  h4,
  h5,
  h5,
  h6 {
    margin-bottom: 0rem;
  }
  & h1 {
    border-bottom: 3px solid green;
    margin-bottom: 0rem;
    display: inline-block;
  }
`;

const LINK_REGEX = /(\[(?!\()[^\)]+\]\([^\[]+\))/g;
const HREF_REGEX = /\(([^\[]+)\)/;
const LINK_TEXT_REGEX = /\[((?!\()[^\)]+)\]/;

const ITALICS_REGEX = /_([^_]*)_/g;
const BOLDS_REGEX = /\*\*([^\*]*)\*\*/g;
const HEADING_REGEX = /#+([^\n]*)/g;
const QUOTES_REGEX = />(.*)\n/g;

export default function MarkdownParser({ content }) {
  let buffer = content;

  //parse quotes
  const quotes = Array.from(buffer.matchAll(QUOTES_REGEX));
  let currentBlock = [];

  quotes.forEach((q, i) => {
    if (currentBlock.length === 0) {
      currentBlock.push(q);
    } else {
      const isInSameBlock =
        currentBlock.at(-1).index + currentBlock.at(-1)[0].length === q.index;
      if (isInSameBlock) {
        currentBlock.push(q);
      }
      if (i === quotes.length - 1 || !isInSameBlock) {
        buffer = buffer.replace(
          currentBlock.map((l) => l[0]).join(""),
          renderToString(
            createElement(
              "div",
              {
                className: "block-quote",
              },
              currentBlock.map((l) => l[1]).join("")
            )
          )
        );
        currentBlock = [];
      }
    }
  });

  // parse links
  const links = Array.from(buffer.matchAll(LINK_REGEX));
  links.forEach((l) => {
    const regexMatch = l[0];
    buffer = buffer.replace(
      regexMatch,
      renderToString(
        createElement(
          "a",
          {
            href: HREF_REGEX.exec(regexMatch)[1],
            rel: "noopener noreferrer",
          },
          LINK_TEXT_REGEX.exec(regexMatch)[1]
        )
      )
    );
  });

  // parse italics
  const italics = Array.from(buffer.matchAll(ITALICS_REGEX));
  italics.forEach((i) => {
    buffer = buffer.replace(
      i[0],
      renderToString(createElement("em", {}, i[1]))
    );
  });

  // parse bolds
  const bolds = Array.from(buffer.matchAll(BOLDS_REGEX));
  bolds.forEach((b) => {
    buffer = buffer.replace(
      b[0],
      renderToString(createElement("strong", {}, b[1]))
    );
  });

  // parse headings
  const headings = Array.from(buffer.matchAll(HEADING_REGEX));
  headings.forEach((h) => {
    const startingHashes = /^#+/.exec(h[0]);
    buffer = buffer.replace(
      h[0],
      renderToString(createElement(`h${startingHashes[0].length}`, {}, h[1]))
    );
  });

  // parse line breaks
  buffer = buffer.replaceAll("\n\n", "<br>");

  return (
    <MarkdownFile>
      <MarkdownRenderer content={buffer} />
    </MarkdownFile>
  );
}
