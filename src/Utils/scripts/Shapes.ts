import { clearCanvas, drawLine, setLineSmoothness } from "../Utils";
import consts from "../Consts.json";

export const DrawFibonachiSpiral = (
  ctxRef: CanvasRenderingContext2D,
//   x1: number,
//   y1: number,
  width: number,
  height: number,
  lineWidth: number
) => {
  clearCanvas(ctxRef, width, height);
  setLineSmoothness(ctxRef, lineWidth);

  var i = 0,
    j = 0,
    k = 1;
  var x = 200,
    y = 200;
  var dir = 0; //starts north. North=0, West=1, South=2, East=3
  var ZOOM = 3;
  while (k < 150) {
    if (dir == 0) {
      //North
      x = x - i * ZOOM;
      y = y - k * ZOOM;
      ctxRef.beginPath();
      ctxRef.arc(x, y + k * ZOOM, k * ZOOM, 0, Math.PI * 1.5, true);
      ctxRef.stroke();
    } else if (dir == 1) {
      //West
      x = x - k * ZOOM;
      //y = y;
      ctxRef.beginPath();
      ctxRef.arc(
        x + k * ZOOM,
        y + k * ZOOM,
        k * ZOOM,
        Math.PI * 1.5,
        Math.PI,
        true
      );
      ctxRef.stroke();
    } else if (dir == 2) {
      //South
      //x = x;
      y = y + j * ZOOM;
      ctxRef.beginPath();
      ctxRef.arc(x + k * ZOOM, y, k * ZOOM, Math.PI, Math.PI / 2, true);
      ctxRef.stroke();
    } else if (dir == 3) {
      //East
      x = x + j * ZOOM;
      y = y - i * ZOOM;
      ctxRef.beginPath();
      ctxRef.arc(x, y, k * ZOOM, Math.PI / 2, 0, true);
      ctxRef.stroke();
    }
    ctxRef.strokeRect(x, y, k * ZOOM, k * ZOOM);
    i = j;
    j = k;
    k = i + j;
    dir = (dir + 1) % 4;
  }
};
