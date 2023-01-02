import React, { createElement } from "react";
import { renderToString } from "react-dom/server";
import MarkdownRenderer from "./MarkdownRenderer";

const LINK_REGEX = /(\[(?!\()[^\)]+\]\([^\[]+\))/g;
const HREF_REGEX = /\(([^\[]+)\)/;
const LINK_TEXT_REGEX = /\[((?!\()[^\)]+)\]/;

const ITALICS_REGEX = /_([^_]*)_/g;

const HEADING_REGEX = /#+([^\n]*)/g;

export default function MarkdownParser({ content }) {
  let buffer = content;

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

  // parse headings
  const headings = Array.from(buffer.matchAll(HEADING_REGEX));
  headings.forEach((h) => {
    const startingHashes = /^#+/.exec(h[0]);
    buffer = buffer.replace(
      h[0],
      renderToString(createElement(`h${startingHashes[0].length}`, {}, h[1]))
    );
  });

  return <MarkdownRenderer content={buffer} />;
}
