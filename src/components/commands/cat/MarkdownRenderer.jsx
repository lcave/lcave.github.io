import React from "react";

export default function MarkdownRenderer({ content }) {
  return <span dangerouslySetInnerHTML={{ __html: content }} />;
}
