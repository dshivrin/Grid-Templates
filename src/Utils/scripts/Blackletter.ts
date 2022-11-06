import { clearCanvas, drawLine, setLineSmoothness } from "../Utils";
import consts from "../Consts.json";

const scaleDown = consts.scaleDown;


export const drawBlackletterGrid = (
  ctxRef: CanvasRenderingContext2D,
  nibSize: number,
  canvasWidth: number,
  canvasHeight: number,
  marginTop: number,
  bodySize: number,
  trailingSize: number, //ascender + descender
  lineWidth: number,
  lineSpacing: number,
  drawAccender: boolean,
  drawDescender: boolean
) => {
  clearCanvas(ctxRef, canvasWidth, canvasHeight);
  setLineSmoothness(ctxRef, lineWidth);
  let x1 = 0;
  let y1 = marginTop * scaleDown;
  /**
   * line height = asc + desc + main
   * //
   * (canvasHeight - marginTop) / (asc + main + desc + spacing)
   */
  while (y1 + lineWidth + lineSpacing < canvasHeight) {
    let rowHeight = drawBlackletterRow(
      ctxRef,
      x1,
      y1,
      canvasWidth,
      nibSize,
      bodySize,
      trailingSize,
      lineWidth,
      drawAccender,
      drawDescender
    );
    y1 = rowHeight + lineSpacing * scaleDown;
  }
};

export const prepareBlackLetterForPrinting = (
  width: number,
  height: number,
  lineWidth: number,
  nibSize: number,
  marginTop: number,
  bodySize: number,
  trailingSize: number,
  lineSpacing: number,
  drawAccender: boolean,
  drawDescender: boolean
) => {
  const printableCanvas = document.createElement("canvas");
  printableCanvas.width = width;
  printableCanvas.height = height;
  printableCanvas.id = "printable-canvas";

  const pctx = printableCanvas.getContext("2d");
  if (!pctx) return;

  nibSize = nibSize * scaleDown * 2.5;

  drawBlackletterGrid(
    pctx,
    nibSize,
    width,
    height,
    marginTop,
    bodySize,
    trailingSize,
    lineWidth,
    lineSpacing,
    drawAccender,
    drawDescender
  );

  return printableCanvas;
};

/**
 * Draws ascender, body and descender
 */
const drawBlackletterRow = (
  ctxRef: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  canvasWidth: number,
  nibSize: number,
  bodySize: number,
  trailingSize: number, //ascender + descender
  lineWidth: number,
  drawAccender: boolean,
  drawDescender: boolean
) => {
  if (drawAccender) {
    drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
    y1 = y1 + nibSize * trailingSize;
  }
  //body
  drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
  y1 = y1 + nibSize * bodySize;
  drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
  y1 = y1 + nibSize * trailingSize;
  if (drawDescender) {
    drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
  }

  return y1;
};
