import React, { useEffect, useRef } from "react";
import print from "print-js";
import "./Canvas.css";

import Controls from "../Controls/Controls";

//print is usually 300 dpi
//A4 page size - 3508 x 2480 px (297 x 210 mm)
//A5 page size - 2480 x 1748 px (210 x 148 mm)
//A6 page size - 1748 x 1240 px (148 x 105 mm)
//1 cm ~ 11.8px

const Canvas = (props: any) => {
  //starting with A4 size
  const scaleDown = 5;
  const width = 2480 / scaleDown;
  const height = 3508 / scaleDown;
  const mm = 111.8 / scaleDown;
  const lineWidth = mm; //default line width
  const lineheight = mm * 4; //default line height

  //canvas
  //TODO: consider a second canvas for the printing output, and leave the current one for preview
  const displayCanvasElement = useRef<HTMLCanvasElement>(null);

  let ctxRef;

  /*
    Given Its a right triangle eventually where the corner of the page is 90 degrees.
    So basic trigononetry will give me hypotenuse length given the angle and the opposite
    Angle is in degrees only.
  */
  //TODO: make the line smooth
  const drawCopperplateGrid = (
    x1: number,
    y1: number,
    angle: number,
    drawHorizontal: boolean = false,
    ctxRef?: any
  ) => {
    if (!displayCanvasElement.current) return;
    if (!ctxRef) ctxRef = displayCanvasElement.current.getContext("2d");
    clearCanvas(ctxRef);
    drawCopperplateVerticalLines(
      x1,
      y1,
      angle,
      height,
      width,
      scaleDown,
      ctxRef
    );
    if (drawHorizontal) drawCopperplateHorizontalLines(x1, y1);
  };

  const clearCanvas = (ctxRef: any) => {
    ctxRef?.fillRect(0, 0, width, height);
    ctxRef?.clearRect(0, 0, width, height);
    //clear bg / fill etc
  };

  const drawCopperplateVerticalLines = (
    x1: number,
    y1: number,
    angle: number,
    height: number,
    width: number,
    scaleDown: number,
    ctxRef: any
  ) => {
    let x2: number, y2: number;

    ctxRef.lineCap = "round";
    ctxRef.lineJoin = "round";
    ctxRef.lineWidth = 1;
    //ctxRef.translate(0.5, 0.5);

    //start drawing from the Y axis
    while (y1 < height) {
      x2 = x1 + Math.cos((Math.PI * 90) / angle) * (width + y1);
      y2 = y1 + Math.sin((Math.PI * 90) / angle) * (width + y1);

      ctxRef.beginPath();
      ctxRef.moveTo(x2, y2);
      ctxRef.lineTo(x1, y1);
      ctxRef.stroke();

      y1 += 8 * scaleDown;
    }
    /*
    There might be a smaller gap here, if so need to add the diff between y1 and height to the next iteration
    */

    //then continue on the X axis
    while (x1 < width) {
      x2 = x1 + Math.cos((Math.PI * 90) / angle) * (height + y1);
      y2 = y1 + Math.sin((Math.PI * 90) / angle) * (height + y1);

      ctxRef.beginPath();
      ctxRef.moveTo(x2, y2);
      ctxRef.lineTo(x1, y1);
      ctxRef.stroke();

      x1 += 4 * scaleDown;
    }
  };

  const drawCopperplateHorizontalLines = (x1: number, y1: number) => {};

  //upscaling a large canvas, drawing and passing on for prinring
  //TODO: requires some size adjustments 
  const prepareForPrinting = () => {
    const printableCanvasElement = document.createElement("canvas");
    printableCanvasElement.width = width * scaleDown;
    printableCanvasElement.height = height * scaleDown;
    printableCanvasElement.id = "printable-canvas";

    const pctx = printableCanvasElement.getContext("2d");
    drawCopperplateGrid(0, mm, 55, false, pctx);
    return printableCanvasElement; 
  };



  //printing directly: https://printjs.crabbly.com/
  //to be depricated
  const Print = () => {
    const canvasId = prepareForPrinting();
    //print('', "html");
  };

  const PrintCanvas = () =>{
    const printableCanvasElement = prepareForPrinting();
    print(printableCanvasElement.toDataURL(), 'image')
  }

  useEffect(() => {
    drawCopperplateGrid(0, mm, 55, true, null);
  }, [drawCopperplateGrid]);

  return (
    <div className="canvas-container">
      <canvas
        id="canvas"
        width={width}
        height={height}
        ref={displayCanvasElement}
      ></canvas>
      <Controls/>
    </div>
  );
};

export default Canvas;
