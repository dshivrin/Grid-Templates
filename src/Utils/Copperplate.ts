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
  const theta = degrees_to_radians(360 - angle);
  //start drawing from the Y axis
  while (y1 < height) {
    //in a circle x:
    // x = x1 + radius * Math.cos(theta)
    //y = y1 + radius * Math.sin(theta)
    //I multiply by 2 because I want the diameter, so the entire canvas will be covered

    x2 = x1 + width * 2 * Math.cos(theta);
    y2 = y1 + width * 2 * Math.sin(theta);

    drawLine(ctxRef, x1, x2, y1, y2, lineWidth);

    y1 += 8 * scaleDown; // improve this!
  }

  //then continue on the X axis
  while (x1 < width) {
    x2 = x1 + height * 2 * Math.cos(theta);
    y2 = y1 + height * 2 * Math.sin(theta);

    drawLine(ctxRef, x1, x2, y1, y2, lineWidth);

    x1 += 5.5 * scaleDown; //improve this!
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

const degrees_to_radians = (degrees: number) => {
  var pi = Math.PI;
  return degrees * (pi / 180);
};
