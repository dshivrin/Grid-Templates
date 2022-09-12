import { jsPDF } from "jspdf";

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
