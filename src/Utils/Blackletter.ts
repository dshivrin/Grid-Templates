import { clearCanvas, drawLine, setLineSmoothness } from "./Utils";
import consts from "./Consts.json";

const mm = consts.mm;
const scaleDown = consts.scaleDown;

/**
 * acs,desc = 2.5 x nibSize
 * body = 5 x nibSize
 */
export const drawBlackletterGrid = (
  ctxRef: CanvasRenderingContext2D,
  nibSize: number,
  canvasWidth: number,
  canvasHeight: number,
  marginTop: number,
  strokeWidth: number
) => {
  clearCanvas(ctxRef, canvasWidth, canvasHeight);

  setLineSmoothness(ctxRef, strokeWidth);
  const lineSpacing = nibSize * 10;
  const lineWidth = nibSize * 10;
  let x1 = 0;
  let y1 = marginTop;
  /**
   * line height = asc + desc + main
   * //
   * (canvasHeight - marginTop) / (asc + main + desc + spacing)
   */
  debugger;
  while (y1 + lineWidth + lineSpacing < canvasHeight) {
    drawBlackletterLine(ctxRef, x1, y1, canvasWidth, nibSize);
    y1 = y1 + lineWidth * 2;
  }
};

export const prepareBlackLetterForPrinting = (
  width: number,
  height: number,
  lineWidth: number,
  nibSize: number,
  marginTop: number
) => {
  const printableCanvas = document.createElement("canvas");
  printableCanvas.width = width;
  printableCanvas.height = height;
  printableCanvas.id = "printable-canvas";

  const pctx = printableCanvas.getContext("2d");
  if (!pctx) return;

  nibSize = nibSize * scaleDown * 2.5;

  drawBlackletterGrid(pctx, nibSize, width, height, marginTop, lineWidth);

  return printableCanvas;
};

/**
 * Draws ascender, body and descender
 */
const drawBlackletterLine = (
  ctxRef: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  canvasWidth: number,
  nibSize: number
) => {
  drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
  y1 = y1 + nibSize * 2.5;
  drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
  y1 = y1 + nibSize * 5;
  drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
  y1 = y1 + nibSize * 2.5;
  drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
};
