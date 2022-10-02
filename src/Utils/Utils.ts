import { jsPDF } from "jspdf";
import printJS from "print-js";
import { drawCopperplateGrid } from "./Copperplate";
import consts from "../Utils/Consts.json";

const mm = consts.mm;
const scaleDown = consts.scaleDown;
export const setLineSmoothness = (ctxRef: CanvasRenderingContext2D, lineWidth: number) => {
  ctxRef.lineCap = "round";
  ctxRef.lineJoin = "round";
  ctxRef.lineWidth = lineWidth;
  //ctxRef.translate(0.5, 0.5);
};

export const drawLine = (
  ctxRef: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lineWidth: number
) => {
  ctxRef.lineWidth = lineWidth;
  ctxRef.beginPath();
  ctxRef.moveTo(x1, y1);
  ctxRef.lineTo(x2, y2);
  ctxRef.stroke();
};

export const clearCanvas = (ctxRef: CanvasRenderingContext2D, width: number, height: number) => {
  ctxRef?.fillRect(0, 0, width, height);
  ctxRef?.clearRect(0, 0, width, height);
  //clear bg / fill etc
};

//See docs https://printjs.crabbly.com/
export const PrintCanvas = (
  pageSize: string,
  lineWidth: number,
  horizontaleInterval: number,
  verticaleInterval: number,
  drawHorizontal: boolean,
  drawVertical: boolean
) => {
  const page = consts.pageSizes.find((p) => p.size === pageSize);
  if (!page) return;
  const printableCanvas = prepareForPrinting(
    page.width,
    page.height,
    lineWidth,
    horizontaleInterval,
    verticaleInterval,
    drawHorizontal,
    drawVertical
  );

  //TODO: add the size in the top (e.g. 5mm) and try removing all the garbage that this library adds
  printJS(printableCanvas!.toDataURL(), "image");
};

//todo: pass the grid method as well
const prepareForPrinting = (
  width: number,
  height: number,
  lineWidth: number,
  horizontaleInterval: number,
  verticaleInterval: number,
  drawHorizontal: boolean,
  drawVertical: boolean
) => {
  const printableCanvas = document.createElement("canvas");
  printableCanvas.width = width;
  printableCanvas.height = height;
  printableCanvas.id = "printable-canvas";

  const pctx = printableCanvas.getContext("2d");
  if(!pctx) return;
  const scale = height / width * scaleDown;
  debugger;
  drawCopperplateGrid(
    pctx,
    0,
    mm,
    55,
    width ,
    height,
    lineWidth,
    (mm * horizontaleInterval * scale),
    (mm * verticaleInterval * scale),
    drawHorizontal,
    drawVertical
  );
  return printableCanvas;
};

export const CovnertToPDF = (
  pageSize: string,
  lineWidth: number,
  horizontaleInterval: number,
  verticaleInterval: number,
  drawHorizontal: boolean,
  drawVertical: boolean
) => {
  const page = consts.pageSizes.find((p) => p.size === pageSize);
  if (!page) return;
  let pdf: jsPDF;
  //set the orientation
  if (page.width > page.height) {
    pdf = new jsPDF("l", "px", [page.width, page.height]); //landscape
  } else {
    pdf = new jsPDF("p", "px", [page.height, page.width]); //portrait
  }
  //then we get the dimensions from the 'pdf' file itself
  const printableCanvas = prepareForPrinting(
    page.width,
    page.height,
    lineWidth,
    horizontaleInterval,
    verticaleInterval,
    drawHorizontal,
    drawVertical
  );
  const cw = pdf.internal.pageSize.getWidth();
  const ch = pdf.internal.pageSize.getHeight();
  pdf.addImage(printableCanvas!.toDataURL(), "PNG", 0, 0, cw, ch);
  pdf.save("download.pdf");
};
