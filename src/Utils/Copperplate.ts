import { clearCanvas, drawLine, setLineSmoothness } from "./Utils";

export const drawCopperplateGrid = (
  ctxRef: any,
  x1: number,
  y1: number,
  angle: number,
  width: number,
  height: number,
  scaleDown: number,
  drawHorizontal: boolean = false
) => {
  //   if (!displayCanvasElement.current) return;
  //   if (!ctxRef) ctxRef = displayCanvasElement.current.getContext("2d");
  clearCanvas(ctxRef, width, height);
  drawCopperplateVerticalLines(x1, y1, angle, height, width, scaleDown, ctxRef);
  if (drawHorizontal)
    drawCopperplateHorizontalLines(x1, y1, height, width, scaleDown, ctxRef);
};

/*
    Given Its a right triangle eventually, where the corner of the page is 90 degrees.
    So basic trigononetry will give me hypotenuse length given the angle and the opposite.
    Angle is in degrees only.
*/
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

  setLineSmoothness(ctxRef);

  //start drawing from the Y axis
  while (y1 < height) {
    x2 = x1 + Math.cos((Math.PI * 90) / angle) * (width + y1);
    y2 = y1 + Math.sin((Math.PI * 90) / angle) * (width + y1);

    drawLine(ctxRef, x1, x2, y1, y2);

    y1 += 8 * scaleDown;
  }

  //then continue on the X axis
  while (x1 < width) {
    x2 = x1 + Math.cos((Math.PI * 90) / angle) * (height + y1);
    y2 = y1 + Math.sin((Math.PI * 90) / angle) * (height + y1);

    drawLine(ctxRef, x1, x2, y1, y2);

    x1 += 4 * scaleDown;
  }
};

const drawCopperplateHorizontalLines = (
  x1: number,
  y1: number,
  height: number,
  width: number,
  scaleDown: number,
  ctxRef: any
) => {};
