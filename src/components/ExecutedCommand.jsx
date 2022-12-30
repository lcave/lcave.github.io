import React, { useEffect, useRef } from "react";

export default function ExecutedCommand({ commandString, result }) {
  const liRef = useRef(null);

  useEffect(() => {
    liRef.current.querySelector(".result").innerHTML = result;
  }, []);

  return (
    <li ref={liRef}>
      <div>{commandString}</div>
      <div className="result"></div>
    </li>
  );
}
