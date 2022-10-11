import { jsPDF } from "jspdf";
import printJS from "print-js";

export const setLineSmoothness = (
  ctxRef: CanvasRenderingContext2D,
  lineWidth: number
) => {
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

export const clearCanvas = (
  ctxRef: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctxRef?.fillRect(0, 0, width, height);
  ctxRef?.clearRect(0, 0, width, height);
  //clear bg / fill etc
};

export const SaveAsPDF = (canvas: HTMLCanvasElement) => {
  const width = canvas.width;
  const height = canvas.height;
  let pdf: jsPDF;

  if (width > height) {
    pdf = new jsPDF("l", "px", [width, height]); //landscape
  } else {
    pdf = new jsPDF("p", "px", [height, width]); //portrait
  }
  const cw = pdf.internal.pageSize.getWidth();
  const ch = pdf.internal.pageSize.getHeight();
  pdf.addImage(canvas.toDataURL(), "PNG", 0, 0, cw, ch);
  pdf.save("download.pdf");
};

//See docs https://printjs.crabbly.com/
//todo: consider replacing as they do not support landscape mode print
export const PrintCanvas = (canvas: HTMLCanvasElement) => {
  printJS(canvas.toDataURL(), "image");
};


