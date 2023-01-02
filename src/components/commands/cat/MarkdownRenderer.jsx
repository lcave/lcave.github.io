import React from "react";

export default function MarkdownRenderer({ content }) {
  return <p dangerouslySetInnerHTML={{ __html: content }}></p>;
}
