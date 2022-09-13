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
  const printableCanvasElement = prepareForPrinting(page.width, page.height, 1);
  print(printableCanvasElement.toDataURL(), "image");
};

//upscaling a large canvas, drawing and passing on for prinring
//TODO: requires some size adjustments
const prepareForPrinting = (
  width: number,
  height: number,
  scaleDown: number
) => {
  const printableCanvasElement = document.createElement("canvas");
  printableCanvasElement.width = width * scaleDown;
  printableCanvasElement.height = height * scaleDown;
  printableCanvasElement.id = "printable-canvas";

  const pctx = printableCanvasElement.getContext("2d");
  clearCanvas(pctx, width, height); //?
  //drawCopperplateGrid(0, 111.8, 55, false, pctx);// todo: move to copperplate methods file
  // drawCopperplateGrid(ctxRef, 0, mm, 55, width, height, scaleDown, true);
  drawCopperplateGrid(pctx, 0, 111.8, 55, width, height, scaleDown, true); // todo: move to copperplate methods file
  return printableCanvasElement;
};

//TODO: move to utils
export const CovnertToPDF = (width: number, height: number) => {
  let pdf: jsPDF;
  //set the orientation
  if (width > height) {
    pdf = new jsPDF("l", "px", [width, height]); //landscape
  } else {
    pdf = new jsPDF("p", "px", [height, width]); //portrait
  }
  //then we get the dimensions from the 'pdf' file itself
  const printableCanvasElement = prepareForPrinting(width, height, 1);
  const cw = pdf.internal.pageSize.getWidth();
  const ch = pdf.internal.pageSize.getHeight();
  pdf.addImage(printableCanvasElement.toDataURL(), "PNG", 0, 0, cw, ch);
  pdf.save("download.pdf");
};

export const Print = (args: any) => {};

export const SaveAsPDF = (args: any) => {};

//using parallax jsPDF. See https://parall.ax/products/jspdf and https://github.com/parallax/jsPDF
//todo: use prepareForPrinting() for converting the upscaled version
// const CovnertToPDF = () => {
//   let pdf: jsPDF;
//   //set the orientation
//   if (width > height) {
//     pdf = new jsPDF("l", "px", [width, height]); //landscape
//   } else {
//     pdf = new jsPDF("p", "px", [height, width]); //portrait
//   }
//   //then we get the dimensions from the 'pdf' file itself
//   const cw = pdf.internal.pageSize.getWidth();
//   const ch = pdf.internal.pageSize.getHeight();
//   pdf.addImage(displayCanvasElement.current, "PNG", 0, 0, cw, ch);
//   pdf.save("download.pdf");
// };

//printing directly: https://printjs.crabbly.com/
//to be depricated
// const Print = () => {
//   const canvasId = prepareForPrinting();
//   //print('', "html");
// };
//TODO: move to utils
