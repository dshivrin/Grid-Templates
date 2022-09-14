import { clearCanvas, drawLine, setLineSmoothness } from "./Utils";
const cm = 11.18;

export const drawCopperplateGrid = (
  ctxRef: any,
  x1: number,
  y1: number,
  angle: number,
  width: number,
  height: number,
  lineWidth: number,
  scaleDown: number,
  drawHorizontal: boolean = false
) => {

  clearCanvas(ctxRef, width, height);
  drawCopperplateVerticalLines(
    x1,
    y1,
    angle,
    lineWidth,
    height,
    width,
    scaleDown,
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
      scaleDown,
      (cm * scaleDown) / 4
    );
};

/*
    Given Its a right triangle eventually, where the corner of the page is 90 degrees.
    So basic trigononetry will give me hypotenuse length given the angle and the opposite.
    Angle is in degrees only.
*/
//todo: make standard 6mm, 5mm etc to work.
const drawCopperplateVerticalLines = (
  x1: number,
  y1: number,
  angle: number,
  lineWidth: number,
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

    drawLine(ctxRef, x1, x2, y1, y2, lineWidth);

    y1 += 8 * scaleDown; // improve this!
  }

  //then continue on the X axis
  while (x1 < width) {
    x2 = x1 + Math.cos((Math.PI * 90) / angle) * (height + y1);
    y2 = y1 + Math.sin((Math.PI * 90) / angle) * (height + y1);

    drawLine(ctxRef, x1, x2, y1, y2, lineWidth);

    x1 += 4 * scaleDown; //improve this!
  }
};

const drawCopperplateHorizontalLines = (
  ctxRef: any,
  x1: number,
  y1: number,
  height: number,
  width: number,
  lineWidth: number,
  scaleDown: number,
  interval: number
) => {
  setLineSmoothness(ctxRef);

  //TODO: landscape, this is for portrait mode
  while (y1 < height) {
    drawLine(ctxRef, x1, width, y1, y1, lineWidth);
    y1 += interval;
  }
};
