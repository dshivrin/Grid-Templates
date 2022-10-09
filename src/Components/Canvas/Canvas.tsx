import { useEffect, useRef } from "react";
import { drawCopperplateGrid } from "Utils/Copperplate";
import consts from "Utils/Consts.json";
import Controls from "../Controls/Controls";
import { drawBlackletterGrid } from "Utils/Blackletter";
import { useAppSelector } from "state/hooks";
import "./Canvas.css";

/*
  TODO:
  1. Add form validation for all inputs
  2. Printing and exporting PDF in landscape mode 
  7. Proper CSS, consider adding bootstrap before any changes
  8. In copperPlate add punctuated lines in between to distinguish the main line and asc+desc, 
    divide the page to sections of 5  
*/

//print is usually 300 dpi
//A4 page size - 3508 x 2480 px (297 x 210 mm)
//A5 page size - 2480 x 1748 px (210 x 148 mm)
//A6 page size - 1748 x 1240 px (148 x 105 mm)
//1 cm = 37.7952755906

const Canvas = () => {
  const scaleDown = consts.scaleDown;
  const mm = consts.mm;

  //page:
  const height = useAppSelector((state) => state.canvas.height);
  const width = useAppSelector((state) => state.canvas.width);
  const pageSize = useAppSelector((state) => state.canvas.pageSize);
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  const templateType = useAppSelector((state) => state.canvas.template);
  const pageOrientation = useAppSelector(
    (state) => state.canvas.pageOrientation
  );

  //copperplate
  const includeVerticalLines = useAppSelector(
    (state) => state.copperplate.drawVertical
  );
  const includeHorizontalLines = useAppSelector(
    (state) => state.copperplate.drawHorizontal
  );
  const verticalAngle = useAppSelector((state) => state.copperplate.angle);
  const verticalInterval = useAppSelector(
    (state) => state.copperplate.verticaleInterval
  );
  const horizontalInterval = useAppSelector(
    (state) => state.copperplate.horizontalInterval
  );

  //BlackLetter:
  const nibSize = useAppSelector((state) => state.blackLetter.nibSize);

  //local
  const displayCanvasElement = useRef<HTMLCanvasElement>(null);
  let ctxRef = null;

  useEffect(() => {
    ctxRef = displayCanvasElement.current!.getContext("2d"); // forced (!) due to some strange useRef behaviour with useEffect ¯\_(ツ)_/¯
    if (!ctxRef) return;

    init(ctxRef);
  }, [
    templateType,
    pageOrientation,
    pageSize,
    lineWidth,
    includeVerticalLines,
    includeHorizontalLines,
    verticalInterval,
    horizontalInterval,
    nibSize,
  ]);

  const init = (ctxRef: CanvasRenderingContext2D) => {
    console.log(templateType);
    switch (templateType) {
      case "BlackLetter":
        drawBlackLetterTemplate(ctxRef);
        break;
      case "CopperPlate":
        drawCopperPlateTemplate(ctxRef);
        break;
    }
  };

  const drawCopperPlateTemplate = (ctxRef: CanvasRenderingContext2D) => {
    let scale: number;
    let horizontal, vertical: number;
    if (height > width) {
      scale = height / width;
    } else {
      scale = width / height;
    }

    horizontal = mm * horizontalInterval * scale;
    vertical = mm * verticalInterval * scale;

    drawCopperplateGrid(
      ctxRef,
      0,
      mm / scaleDown,
      verticalAngle,
      width / scaleDown,
      height / scaleDown,
      lineWidth / scaleDown,
      horizontal,
      vertical,
      includeHorizontalLines,
      includeVerticalLines
    );
  };

  const drawBlackLetterTemplate = (ctxRef: CanvasRenderingContext2D) => {
    drawBlackletterGrid(
      ctxRef,
      nibSize,
      width,
      height,
      nibSize * 10,
      lineWidth
    );
  };

  return (
    <div className="main-container">
      <div className="section canvas-container">
        <canvas
          id="canvas"
          width={width / scaleDown}
          height={height / scaleDown}
          ref={displayCanvasElement}
        ></canvas>
      </div>
      <Controls />
    </div>
  );
};

export default Canvas;
