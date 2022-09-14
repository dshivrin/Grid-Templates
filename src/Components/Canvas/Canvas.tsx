import { useEffect, useRef, useState } from "react";
import { CovnertToPDF, PrintCanvas } from "../../Utils/Utils";
import "./Canvas.css";
import { drawCopperplateGrid } from "../../Utils/Copperplate";
import consts from "../../Utils/Consts.json";

/*
  TODO:
  1.add form validation for all inputs
  3.Add landscape / portrait modes
*/

//https://www.instantprint.co.uk/printspiration/print-design-tips/size-guide
//print is usually 300 dpi
//A4 page size - 3508 x 2480 px (297 x 210 mm)
//A5 page size - 2480 x 1748 px (210 x 148 mm)
//A6 page size - 1748 x 1240 px (148 x 105 mm)
//1 cm ~ 11.8px

const Canvas = (props: any) => {
  //starting with A4 size
  const scaleDown = 5;
  const width = 2480 / scaleDown;
  const height = 3508 / scaleDown;
  const mm = 111.8 / scaleDown;
  //const lineWidth = mm; //default line width
  //const lineheight = mm * 4; //default line height

  const pageSizes = consts.pageSizes;

  const [includeVerticalLines, setincludeVerticalLines] = useState(true);
  const [verticalAngle, setVerticalAngle] = useState(55);
  const [verticalSpacing, setVerticalSpacing] = useState(5); //default is 5 cm
  const [horizontalSpacing, setHorizontalSpacing] = useState(5); //default is 5 cm
  const [lineWidth, setLineWidth] = useState(1); //default is 1 px
  const [includeHorizontalLines, setIncludeHorizontalLines] = useState(true);
  const [canvasWidth, setCanvasWidth] = useState(0); 
  const [canvasHeight, setCanvasHeight] = useState(0); 

  //canvas
  const displayCanvasElement = useRef<HTMLCanvasElement>(null);

  const onPageSizeChanged = (size: string) => {
    const page = pageSizes.find((p) => p.size === size);
    if(!page) return;

    setCanvasWidth(page.width);
    setCanvasHeight(page.height);
    
  };

  useEffect(() => {
    const ctxRef = displayCanvasElement.current!.getContext("2d"); // forced (!) due to some strange useRef behaviour with useEffect ¯\_(ツ)_/¯
    drawCopperplateGrid(
      ctxRef,
      0,
      mm,
      verticalAngle,
      width,
      height,
      lineWidth,
      scaleDown,
      includeHorizontalLines,
      includeVerticalLines
    );
  }, [
    width,
    height,
    lineWidth,
    verticalAngle,
    verticalSpacing,
    includeHorizontalLines,
    includeVerticalLines,
  ]);

  return (
    <div className="main-container ">
      <div className="section canvas-container">
        <canvas
          id="canvas"
          width={width}
          height={height}
          ref={displayCanvasElement}
        ></canvas>
      </div>
      <div className="controls-container">
        <div className="inner-container">
          <label>Page</label>
          <div className="section page-size-selector">
            <div>
              <label>Page Size: </label>
              <select
                onChange={(event) => {
                  onPageSizeChanged(event.target.value);
                }}
              >
                {pageSizes.map((p) => {
                  return (
                    <option key={`optionKey:${p.size}`} value={p.size}>
                      {p.size}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label>Line Width: </label>
              <input
                type="number"
                min="1"
                max="5"
                value={lineWidth}
                onChange={(event) => {
                  setLineWidth(+event.target.value);
                }}
              />{" "}
              px
            </div>
          </div>
          <label>Vertical</label>
          <div className="section vertical-controls">
            <div>
              <label>Include Vertical lines? </label>
              <input
                type="checkbox"
                id="incluideVertical"
                checked={includeVerticalLines}
                onChange={() => {
                  setincludeVerticalLines(!includeVerticalLines);
                }}
              />
            </div>
            <div>
              <label>Vertical spacing:</label>
              <input
                type="number"
                id="vertical-spacing"
                min="1"
                max="10"
                value={verticalSpacing}
                onChange={(event) => {
                  setVerticalSpacing(+event.target.value);
                }}
                disabled={!includeVerticalLines}
              />{" "}
              cm
            </div>
            <div>
              <label>Vertical angle: </label>
              <input
                type="number"
                id="angle"
                min="50"
                max="60"
                value={verticalAngle}
                onChange={(event) => {
                  setVerticalAngle(+event.target.value);
                }}
                disabled={!includeVerticalLines}
              />{" "}
              °
            </div>
          </div>
          <label>Horizontal</label>
          <div className="section horizontal-controls">
            <div>
              <div>
                <label>Include Horizontal lines? </label>
                <input
                  type="checkbox"
                  id="incluideHorizontal"
                  checked={includeHorizontalLines}
                  onChange={() =>
                    setIncludeHorizontalLines(!includeHorizontalLines)
                  }
                />
              </div>
              <div>
                <label>Horizontal spacing: </label>
                <input
                  type="number"
                  id="horizontal-spacing"
                  min="1"
                  max="10"
                  value={horizontalSpacing}
                  disabled={!includeHorizontalLines}
                  onChange={(event) => {
                    setHorizontalSpacing(+event.target.value);
                  }}
                />{" "}
                cm
              </div>
            </div>
          </div>
          <div className="footer">
            <button
              type="button"
              className="button-46 print"
              onClick={() => {
                PrintCanvas(
                  "A4",
                  lineWidth,
                  includeHorizontalLines,
                  includeVerticalLines
                );
              }}
            >
              Print
            </button>
            <button
              type="button"
              className="button-46 download"
              onClick={() => {
                CovnertToPDF(
                  "A4",
                  lineWidth,
                  includeHorizontalLines,
                  includeVerticalLines
                );
              }}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
