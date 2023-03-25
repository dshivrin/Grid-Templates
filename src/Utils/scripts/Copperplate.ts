import {
  clearCanvas,
  degreesToRadians,
  drawLine,
  setLineSmoothness,
} from "../Utils";
import consts from "../Consts.json";

const mm = consts.mm;
const scaleDown = consts.scaleDown;

export const drawCopperplateGrid = (
  ctxRef: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  angle: number,
  width: number,
  height: number,
  lineWidth: number,
  horizontalInterval: number,
  verticalInterval: number,
  drawHorizontal: boolean = false,
  drawVertical: boolean = true
) => {
  clearCanvas(ctxRef, width, height);
  setLineSmoothness(ctxRef, lineWidth);
  if (drawVertical) {
    drawCopperplateVerticalLines(
      ctxRef,
      x1,
      y1,
      angle,
      height,
      width,
      lineWidth,
      verticalInterval
    );
  }

  if (drawHorizontal) {
    drawCopperplateHorizontalLines(
      ctxRef,
      x1,
      y1,
      height,
      width,
      lineWidth,
      horizontalInterval
    );
  }
};

/*
    Given Its a right triangle eventually, where the corner of the page is 90 degrees.
    So basic trigononetry will give me hypotenuse length given the angle and the opposite.
    In a circle x = x1 + radius * Math.cos(theta) and y = y1 + radius * Math.sin(theta)
    I multiply by 2 because I want the diameter, so the entire canvas will be covered
*/
const drawCopperplateVerticalLines = (
  ctxRef: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  angle: number,
  height: number,
  width: number,
  lineWidth: number,
  verticalInterval: number
) => {
  setLineSmoothness(ctxRef, lineWidth);
  const theta = degreesToRadians(360 - angle);

  let x2: number, y2: number;
  x2 = x1 + width * 2 * Math.cos(theta);
  const scale = width > height ? width / height : height / width;
  let vertical = verticalInterval;

  //start drawing from the Y axis
  while (y1 < height) {
    x2 = x1 + width * 2 * Math.cos(theta);
    y2 = y1 + (width * 2 * Math.sin(theta)) / scale;

    drawLine(ctxRef, x1, y1, x2, y2, lineWidth);

    y1 += vertical;
  }

  //then continue on the X axis
  while (x1 < width) {
    x2 = x1 + height * 2 * Math.cos(theta) * scale;
    y2 = y1 + height * 2 * Math.sin(theta);

    drawLine(ctxRef, x1, y1, x2, y2, lineWidth);

    x1 += vertical;
  }
};

const drawCopperplateHorizontalLines = (
  ctxRef: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  height: number,
  width: number,
  lineWidth: number,
  horizontalInterval: number
) => {
  setLineSmoothness(ctxRef, lineWidth);

  while (y1 < height) {
    drawLine(ctxRef, x1, y1, width, y1, lineWidth);
    y1 += horizontalInterval;
  }
};

export const prepareCopperPlateForPrinting = (
  width: number,
  height: number,
  lineWidth: number,
  angle: number,
  horizontalInterval: number,
  verticalInterval: number,
  drawHorizontal: boolean,
  drawVertical: boolean
) => {
  const printableCanvas = document.createElement("canvas");
  printableCanvas.width = width;
  printableCanvas.height = height;
  printableCanvas.id = "printable-canvas";

  const pctx = printableCanvas.getContext("2d");
  if (!pctx) return;

  let hscale: number;
  let vscale: number;
  let horizontal, vertical: number;
  if (height > width) {
    hscale = width / height;
    vscale = height / width;
  } else {
    hscale = height / width;
    vscale = 1;
  }

  horizontal = mm * horizontalInterval * hscale * scaleDown;
  vertical = mm * verticalInterval / vscale * scaleDown;

  drawCopperplateGrid(
    pctx,
    0,
    mm,
    angle,
    width,
    height,
    lineWidth,
    horizontal,
    vertical,
    drawHorizontal,
    drawVertical
  );
  return printableCanvas;
};
