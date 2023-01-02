import React from "react";
import MarkdownRenderer from "./cat/MarkdownParser";

export default function Cat({ content }) {
  return <MarkdownRenderer content={content} />;
}
