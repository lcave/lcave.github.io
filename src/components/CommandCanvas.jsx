import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const InputCanvas = styled.canvas`
  width: 100%;
  background: none;
  padding: 10px 0;
`;

const canvasWidth = window.innerWidth * 2;
const caretWidth = canvasWidth / 50;
const canvasHeight = canvasWidth / 25;

export default function CommandCanvas({ commandString, showCaret = false }) {
  const canvas = useRef(null);
  const ctx = canvas.current?.getContext("2d");

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = "green";
      ctx.fillStyle = "green";
      ctx.font = `${canvasHeight}px monospace`;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillText(commandString, 10, (canvas.current.height / 2) * 1.5);

      if (showCaret) {
        ctx.beginPath();
        const textWidth = ctx.measureText(commandString).width;
        ctx.moveTo(textWidth, canvas.current.height);
        ctx.fillRect(textWidth + 12, 0, caretWidth, canvasHeight);
        ctx.stroke();
      }
    }
  }, [commandString, ctx, showCaret]);

  return (
    <InputCanvas
      ref={canvas}
      width={canvasWidth + "px"}
      height={canvasHeight + "px"}
    />
  );
}
