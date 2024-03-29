import {
  clearCanvas,
  drawLine,
  drawRectangle,
  setLineSmoothness,
} from "../Utils";
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
  drawNibs: boolean,
  drawAccender: boolean,
  drawDescender: boolean
) => {
  clearCanvas(ctxRef, canvasWidth, canvasHeight);
  setLineSmoothness(ctxRef, lineWidth);
  let x1 = 0;
  let y1 = marginTop * scaleDown;
  
  while (y1 + lineWidth + lineSpacing < canvasHeight) {
    let rowHeight = drawBlackletterRow(
      ctxRef,
      x1,
      y1,
      canvasWidth,
      nibSize,
      bodySize,
      trailingSize,
      drawNibs,
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
  drawNibs: boolean,
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
    lineSpacing * 5,
    drawNibs,
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
  drawNibs: boolean,
  drawAccender: boolean,
  drawDescender: boolean
) => {
  let nibX = 0;
  let nibY = y1;

  //This is a fix for a behaviour that occurs when the accender is not drawn,
  //so one nib in the body is misplaced
  const setNibXValue = (part: string, iteration: number): number => {
    switch (part) {
      case "accender":
        return iteration % 2 > 0 ? 0 : nibSize;
      case "body":
      case "descender":
        if (drawAccender) return iteration % 2 === 0 ? 0 : nibSize;
        else return iteration % 2 !== 0 ? 0 : nibSize;
       default:
        return iteration % 2 > 0 ? 0 : nibSize;
    }
  };

  if (drawAccender) {
    drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
    if (drawNibs) {
      const test = Math.ceil(trailingSize);
      for (let i = 0; i < test; i++) {
        drawRectangle(ctxRef, nibSize, nibSize, nibX, nibY);
        nibY += nibSize;
        nibX = setNibXValue("accender", i);
      }
    }
    y1 = y1 + nibSize * trailingSize;
  }
  //body
  drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
  if (drawNibs) {
    for (let i = 0; i < Math.ceil(bodySize); i++) {
      drawRectangle(ctxRef, nibSize, nibSize, nibX, nibY);
      nibY += nibSize;
      nibX = setNibXValue("body", i);
    }
  }
  y1 = y1 + nibSize * bodySize;
  drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);

  y1 = y1 + nibSize * trailingSize;
  if (drawDescender) {
    drawLine(ctxRef, x1, y1, canvasWidth, y1, 1 / 3);
    //last one -1 iterations
    if (drawNibs) {
      for (let i = 1; i < Math.ceil(trailingSize); i++) {
        drawRectangle(ctxRef, nibSize, nibSize, nibX, nibY);
        nibY += nibSize;
        nibX = setNibXValue("descender", i);
      }
    }
  }

  return y1;
};
