import React, { createElement } from "react";
import { renderToString } from "react-dom/server";
import MarkdownRenderer from "./MarkdownRenderer";

const LINK_REGEX = /(\[(?!\()[^\)]+\]\([^\[]+\))/g;
const HREF_REGEX = /\(([^\[]+)\)/;
const LINK_TEXT_REGEX = /\[((?!\()[^\)]+)\]/;

const ITALICS_REGEX = /_([^_]*)_/g;

export default function MarkdownParser({ content }) {
  const contentArray = content.split("\n").filter((s) => s !== "");
  let buffer = "";

  contentArray.forEach((line, index) => {
    // parse links
    const links = Array.from(line.matchAll(LINK_REGEX));
    links.forEach((l) => {
      const regexMatch = l[0];
      line = line.replace(
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
    const italics = Array.from(line.matchAll(ITALICS_REGEX));
    italics.forEach((i) => {
      line = line.replace(i[0], renderToString(createElement("em", {}, i[1])));
    });

    // parse headings
    let startingHashes = /^#+/.exec(line);
    if (startingHashes) {
      const hType = startingHashes[0].length;
      const lineWithoutHashes = line.replace(/^#+/, "");
      line = renderToString(
        createElement(
          `h${hType}`,
          {},
          <>
            {lineWithoutHashes}
            <br />
            {"-".repeat(lineWithoutHashes.length)}
          </>
        )
      );
    }
    buffer += line + (startingHashes ? "" : "<br>");
  });

  return <MarkdownRenderer content={buffer} />;
}
