import { jsPDF } from "jspdf";
import print from "print-js";
import { drawCopperplateGrid } from "./Copperplate";
import consts from "../Utils/Consts.json";

export const setLineSmoothness = (ctxRef: any) => {
  ctxRef.lineCap = "round";
  ctxRef.lineJoin = "round";
  ctxRef.lineWidth = 1; // scalable? todo: use args
  //ctxRef.translate(0.5, 0.5);
};

export const drawLine = (
  ctxRef: any,
  x1: number,
  x2: number,
  y1: number,
  y2: number
) => {
  ctxRef.lineWidth = 1;//todo: param
  ctxRef.beginPath();
  ctxRef.moveTo(x2, y2);
  ctxRef.lineTo(x1, y1);
  ctxRef.stroke();
};

export const clearCanvas = (ctxRef: any, width: number, height: number) => {
  ctxRef?.fillRect(0, 0, width, height);
  ctxRef?.clearRect(0, 0, width, height);
  //clear bg / fill etc
};

export const PrintCanvas = (pageSize: string) => {
  const page = consts.pageSizes.find((p) => p.size === pageSize);
  if(!page) return;
  const printableCanvas = prepareForPrinting(page.width, page.height, 1);
  print(printableCanvas.toDataURL(), "image");
};

//todo: pass the grid method as well 
const prepareForPrinting = (
  width: number,
  height: number,
  scale: number
) => {
  const printableCanvas = document.createElement("canvas");
  printableCanvas.width = width * scale;
  printableCanvas.height = height * scale;
  printableCanvas.id = "printable-canvas";

  const pctx = printableCanvas.getContext("2d");
  //todo: calc the scale by dividing the display widht and heigth and printable
  drawCopperplateGrid(pctx, 0, 111.8, 55, width, height, 35, true);
  return printableCanvas;
};

export const CovnertToPDF = (pageSize: string) => {
  const page = consts.pageSizes.find((p) => p.size === pageSize);
  if(!page) return;
  let pdf: jsPDF;
  //set the orientation
  if (page.width > page.height) {
    pdf = new jsPDF("l", "px", [page.width, page.height]); //landscape
  } else {
    pdf = new jsPDF("p", "px", [page.height, page.width]); //portrait
  }
  //then we get the dimensions from the 'pdf' file itself
  const printableCanvas = prepareForPrinting(page.width, page.height, 1);
  const cw = pdf.internal.pageSize.getWidth();
  const ch = pdf.internal.pageSize.getHeight();
  pdf.addImage(printableCanvas.toDataURL(), "PNG", 0, 0, cw, ch);
  pdf.save("download.pdf");
};
