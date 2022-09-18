import { clearCanvas, drawLine, setLineSmoothness } from "./Utils";
import consts from "./Consts.json";

const mm = consts.mm;

export const drawCopperplateGrid = (
  ctxRef: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  angle: number,
  width: number,
  height: number,
  lineWidth: number,
  horizontalInterval: number,
  verticaleInterval: number,
  drawHorizontal: boolean = false,
  drawVertical: boolean = true
) => {
  clearCanvas(ctxRef, width, height);
  if (drawVertical)
    drawCopperplateVerticalLines(
      x1,
      y1,
      angle,
      lineWidth,
      height,
      width,
      verticaleInterval,
      ctxRef
    );

  if (drawHorizontal)
    drawCopperplateHorizontalLines(
      ctxRef,
      x1,
      y1,
      height,
      width,
      lineWidth,
      horizontalInterval
    );
};

/*
    Given Its a right triangle eventually, where the corner of the page is 90 degrees.
    So basic trigononetry will give me hypotenuse length given the angle and the opposite.
    In a circle x = x1 + radius * Math.cos(theta) and y = y1 + radius * Math.sin(theta)
    I multiply by 2 because I want the diameter, so the entire canvas will be covered
*/
//todo: make standard 6mm, 5mm etc to work.
const drawCopperplateVerticalLines = (
  x1: number,
  y1: number,
  angle: number,
  lineWidth: number,
  height: number,
  width: number,
  verticalInterval: number,
  ctxRef: any
) => {
  let x2: number, y2: number;

  setLineSmoothness(ctxRef, lineWidth);
  const theta = degreesToRadians(360 - angle);
  //start drawing from the Y axis
  while (y1 < height) {
    x2 = x1 + width * 2 * Math.cos(theta);
    y2 = y1 + width * 2 * Math.sin(theta);

    drawLine(ctxRef, x1, x2, y1, y2, lineWidth);

    y1 += verticalInterval; // improve this!
  }
  //then continue on the X axis

  const divider = height / width;
  while (x1 < width) {
    x2 = x1 + height * 2 * Math.cos(theta);
    y2 = y1 + height * 2 * Math.sin(theta);

    drawLine(ctxRef, x1, x2, y1, y2, lineWidth);

    x1 += verticalInterval / divider; // <= divider = ~1.41 
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

  console.log("horizontalInterval: ", horizontalInterval);

  while (y1 < height) {
    drawLine(ctxRef, x1, width, y1, y1, lineWidth);
    y1 += horizontalInterval;
  }
};

const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};
